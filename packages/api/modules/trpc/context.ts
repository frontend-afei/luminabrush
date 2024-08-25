import { config, type Locale } from "@config";
import type { inferAsyncReturnType } from "@trpc/server";
import { lucia } from "auth";
import { db } from "database";
import { parseCookies, type H3Event } from "h3";
import { getSignedUrl } from "storage";
import { defineAbilitiesFor } from "../auth";

export async function createContext(event?: H3Event | { isAdmin?: boolean }) {
  const sessionId =
    (event &&
      "node" in event &&
      parseCookies(event)?.[lucia.sessionCookieName]) ||
    null;
  const { user, session } = sessionId
    ? await lucia.validateSession(sessionId)
    : { user: null, session: null };

  const teamMemberships = user
    ? await Promise.all(
        (
          await db.teamMembership.findMany({
            where: {
              userId: user.id,
            },
            include: {
              team: true,
            },
          })
        ).map(async (membership) => ({
          ...membership,
          team: {
            ...membership.team,
            avatarUrl: membership.team.avatarUrl
              ? await getSignedUrl(membership.team.avatarUrl, {
                  bucket: process.env
                    .NUXT_PUBLIC_S3_AVATARS_BUCKET_NAME as string,
                  expiresIn: 360,
                })
              : null,
          },
        })),
      )
    : null;

  const abilities = defineAbilitiesFor({
    user,
    teamMemberships,
  });

  const locale =
    (event &&
      "node" in event &&
      parseCookies(event)?.[config.i18n.cookieName]) ||
    (config.i18n.defaultLocale as Locale);

  return {
    user,
    teamMemberships,
    abilities,
    session,
    locale,
    isAdmin: event && "isAdmin" in event ? event.isAdmin : false,
    event: event && "node" in event ? event : undefined,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
