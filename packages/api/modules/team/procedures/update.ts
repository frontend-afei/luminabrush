import { TRPCError } from '@trpc/server'
import { TeamSchema, db } from 'database'
import { z } from 'zod'
import { protectedProcedure } from '../../trpc'

export const update = protectedProcedure
	.input(
		z.object({
			id: z.string(),
			name: z.string(),
		})
	)
	.output(TeamSchema)
	.mutation(async ({ input: { id, name }, ctx: { abilities } }) => {
		if (!abilities.isTeamOwner(id)) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'No permission to update this team.',
			})
		}

		const team = await db.team.update({
			where: {
				id,
			},
			data: {
				name,
			},
		})

		return team
	})
