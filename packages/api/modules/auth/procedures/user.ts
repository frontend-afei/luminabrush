import { TeamMembershipSchema, TeamSchema, UserSchema } from "database";
import { z } from "zod";
import { getSignedUrl } from "storage";
import { publicProcedure } from "../../trpc";

export const user = publicProcedure
  .output(
    UserSchema.pick({
      id: true,
      email: true,
      role: true,
      avatarUrl: true,
      name: true,
    })
      .extend({
        teamMemberships: z
          .array(
            TeamMembershipSchema.extend({
              team: TeamSchema,
            }),
          )
          .nullable(),
      })
      .nullable(),
  )
  .query(async ({ ctx: { user, teamMemberships } }) => {
    if (!user) {
      return null;
    }

    // if avatar url is only the path (e.g. /avatars/1234.png)
    // we need to create a signed url for accessing the storage
    let avatarUrl = user.avatarUrl ?? null;
    if (avatarUrl && !avatarUrl.startsWith("http"))
      avatarUrl = await getSignedUrl(avatarUrl, {
        bucket: "avatars",
        expiresIn: 360,
      });

    return {
      ...user,
      avatarUrl,
      teamMemberships,
    };
  });
