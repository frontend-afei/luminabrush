import { GitHub, OAuth2RequestError, generateState } from "arctic";
import { db } from "database";
import {
  getRequestURL,
  parseCookies,
  sendRedirect,
  setCookie,
  setResponseStatus,
  type EventHandlerRequest,
  type H3Event,
} from "h3";
import { $fetch } from "ofetch";
import { lucia } from "../lib/lucia";

export const githubAuth = new GitHub(
  process.env.GITHUB_CLIENT_ID as string,
  process.env.GITHUB_CLIENT_SECRET as string,
);

const GITHUB_PROIVDER_ID = "github";

type GitHubUser = {
  id: number;
  email: string;
  name: string;
  login: string;
  avatar_url: string;
};

type GithubUserEmails = Array<{
  email: string;
  primary?: boolean;
  verified?: boolean;
}>;

export async function githubRouteHandler(event: H3Event<EventHandlerRequest>) {
  const state = generateState();

  const url = await githubAuth.createAuthorizationURL(state, {
    scopes: ["user:email"],
  });

  setCookie(event, "github_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    path: "/",
    maxAge: 60 * 60,
    sameSite: "lax",
  });

  await sendRedirect(event, url.toString());
}

export async function githubCallbackRouteHandler(
  event: H3Event<EventHandlerRequest>,
) {
  const url = getRequestURL(event);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookies = parseCookies(event);
  const storedState = cookies.github_oauth_state ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    setResponseStatus(event, 400);
    return null;
  }

  try {
    const tokens = await githubAuth.validateAuthorizationCode(code);
    const githubUser = await $fetch<GitHubUser>("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    const emails = await $fetch<GithubUserEmails>(
      "https://api.github.com/user/emails",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );

    githubUser.email = (
      githubUser.email ?? emails.find((email) => email.primary)?.email
    ).toLowerCase();

    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          {
            oauthAccounts: {
              some: {
                providerId: GITHUB_PROIVDER_ID,
                providerUserId: String(githubUser.id),
              },
            },
          },
          {
            email: githubUser.email.toLowerCase(),
          },
        ],
      },
      select: {
        id: true,
        oauthAccounts: {
          select: {
            providerId: true,
          },
        },
      },
    });

    if (existingUser) {
      if (
        !existingUser.oauthAccounts.some(
          (account) => account.providerId === GITHUB_PROIVDER_ID,
        )
      ) {
        await db.userOauthAccount.create({
          data: {
            providerId: GITHUB_PROIVDER_ID,
            providerUserId: String(githubUser.id),
            userId: existingUser.id,
          },
        });
      }

      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      setCookie(
        event,
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return await sendRedirect(event, "/app/dashboard", 302);
    }

    const newUser = await db.user.create({
      data: {
        email: githubUser.email.toLowerCase(),
        name: githubUser.name ?? githubUser.login,
        avatarUrl: githubUser.avatar_url,
        emailVerified: true,
      },
    });

    await db.userOauthAccount.create({
      data: {
        providerId: "github",
        providerUserId: String(githubUser.id),
        userId: newUser.id,
      },
    });
    const session = await lucia.createSession(newUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    setCookie(
      event,
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return await sendRedirect(event, "/app/dashboard", 302);
  } catch (e) {
    console.error(e);
    if (e instanceof OAuth2RequestError) {
      setResponseStatus(event, 400);
      return null;
    }

    setResponseStatus(event, 500);
    return null;
  }
}
