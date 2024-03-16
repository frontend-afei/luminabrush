import { TRPCError } from "@trpc/server";
import { lucia } from "auth";
import { setCookie } from "h3";
import { protectedProcedure } from "../../trpc";

export const logout = protectedProcedure.mutation(
  async ({ ctx: { session, event } }) => {
    try {
      await lucia.invalidateSession(session.id);
      const sessionCookie = lucia.createBlankSessionCookie();

      if (event) {
        setCookie(
          event,
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch (e) {
      console.error(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unknown error occurred.",
      });
    }
  },
);
