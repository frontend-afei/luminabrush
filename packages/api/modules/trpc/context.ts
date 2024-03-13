import type { inferAsyncReturnType } from "@trpc/server";
import { getSignedUrl } from "storage";
import { lucia, type SessionUser } from "auth";
import { db } from "database";
import { type H3Event, parseCookies } from "h3";
import { defineAbilitiesFor } from "../auth";

export async function createContext(event?: H3Event | { isAdmin?: boolean }) {
  let user: SessionUser | null = null;

  const sessionId =
    (event &&
      "node" in event &&
      parseCookies(event)?.[lucia.sessionCookieName]) ||
    null;

  if (sessionId) {
    const validatedSession = await lucia.validateSession(sessionId);

    if (validatedSession.user) {
      user = validatedSession.user;
    }
  }

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
                  bucket: "avatars",
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

  return {
    user,
    teamMemberships,
    abilities,
    sessionId: sessionId ?? null,
    isAdmin: event && "isAdmin" in event ? event.isAdmin : false,
    event: event && "node" in event ? event : undefined,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
