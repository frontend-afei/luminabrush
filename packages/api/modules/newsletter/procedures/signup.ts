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
		// @TODO @temporary remove, see packages/mail/util/send.ts
		const template = await renderTemplate({
			templateId: 'newsletterSignup',
			props: {
				email,
			},
		})

		await sendEmail({
			to: email,
			template, // templateId: 'newsletterSignup',
		})
	})
