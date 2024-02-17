import { db } from 'database'
import { z } from 'zod'
import { protectedProcedure } from '../../trpc'

export const changeName = protectedProcedure
	.input(
		z.object({
			name: z.string().min(1).max(255),
		})
	)
	.mutation(async ({ ctx: { user }, input: { name } }) => {
		await db.user.update({
			where: {
				id: user.id,
			},
			data: {
				name,
			},
		})
	})
