import { OAuth2RequestError } from "arctic";
import { db } from "database";
import { lucia } from "./lucia";
import {
  EventHandlerRequest,
  H3Event,
  getRequestURL,
  parseCookies,
  sendRedirect,
  setCookie,
} from "h3";

export function createOauthRedirectHandler(
  providerId: string,
  createAuthorizationTokens: () => Promise<{
    state: string;
    codeVerifier?: string;
    url: URL;
  }>,
) {
  return async function (event: H3Event<EventHandlerRequest>) {
    const { url, state, codeVerifier } = await createAuthorizationTokens();

    setCookie(event, `${providerId}_oauth_state`, state, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      path: "/",
      maxAge: 60 * 60,
      sameSite: "lax",
    });

    if (codeVerifier) {
      // store code verifier as cookie
      setCookie(event, "code_verifier", codeVerifier, {
        secure: true, // set to false in localhost
        path: "/",
        httpOnly: true,
        maxAge: 60 * 10, // 10 min
      });
    }

    await sendRedirect(event, url.toString());
  };
}

export function createOauthCallbackHandler(
  providerId: string,
  validateAuthorizationCode: (
    code: string,
    codeVerifier?: string,
  ) => Promise<{
    email: string;
    name?: string;
    id: string;
    avatar?: string;
  }>,
) {
  return async function (event: H3Event<EventHandlerRequest>) {
    const url = getRequestURL(event);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const cookies = parseCookies(event);
    const storedState = cookies[`${providerId}_oauth_state`] ?? null;
    const storedCodeVerifier = cookies["code_verifier"] ?? null;

    if (!code || !state || !storedState || state !== storedState) {
      return new Response(null, {
        status: 400,
      });
    }

    try {
      const oauthUser = await validateAuthorizationCode(
        code,
        storedCodeVerifier ?? undefined,
      );

      const existingUser = await db.user.findFirst({
        where: {
          OR: [
            {
              oauthAccounts: {
                some: {
                  providerId,
                  providerUserId: oauthUser.id,
                },
              },
            },
            {
              email: oauthUser.email.toLowerCase(),
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
            (account) => account.providerId === providerId,
          )
        ) {
          await db.userOauthAccount.create({
            data: {
              providerId,
              providerUserId: oauthUser.id,
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
        return new Response(null, {
          status: 302,
          headers: {
            Location: "/app",
          },
        });
      }

      const newUser = await db.user.create({
        data: {
          email: oauthUser.email.toLowerCase(),
          emailVerified: true,
          name: oauthUser.name,
          avatarUrl: oauthUser.avatar,
        },
      });

      await db.userOauthAccount.create({
        data: {
          providerId,
          providerUserId: oauthUser.id,
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
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/app",
        },
      });
    } catch (e) {
      console.error(e);
      if (e instanceof OAuth2RequestError) {
        return new Response(null, {
          status: 400,
        });
      }

      return new Response(null, {
        status: 500,
      });
    }
  };
}
