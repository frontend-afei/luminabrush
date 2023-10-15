import { sendEmail } from 'mail/util/send'
import { z } from 'zod'
import { publicProcedure } from '../../trpc/trpc'

export const signup = publicProcedure
	.input(
		z.object({
			email: z.string(),
		})
	)
	.mutation(async ({ input: { email } }) => {
		await sendEmail({
			to: email,
			templateId: 'newsletterSignup',
		})
	})
