import { TRPCError } from '@trpc/server'
import { TeamModel, db } from 'database'
import slugify from 'slugify'
import { z } from 'zod'
import { protectedProcedure } from '../../trpc'

const slugifyConfig = {
	lower: true,
	remove: /[*+~.()'"!:@]/g,
	replacement: '-',
	trim: true,
}

export const create = protectedProcedure
	.input(
		z.object({
			name: z.string(),
		})
	)
	.output(TeamModel)
	.mutation(async ({ input: { name }, ctx: { user } }) => {
		let slug = slugify(name, slugifyConfig)

		let isSlugAvailable = false
		let iteration = 0

		while (!isSlugAvailable) {
			if (iteration === 2)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Could not create team',
				})

			const existingTeam = await db.team.findUnique({
				where: {
					slug,
				},
			})

			if (!existingTeam) isSlugAvailable = true
			else {
				slug = slugify(`${name}-${(Math.random() + 1).toString(36).substring(2, 7)}`, slugifyConfig)
			}
		}

		const team = await db.team.create({
			data: {
				name,
				slug,
				memberships: {
					create: {
						user_id: user!.userId,
						role: 'OWNER',
						is_creator: true,
					},
				},
			},
		})

		return team
	})
