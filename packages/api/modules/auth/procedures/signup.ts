import { TRPCError } from '@trpc/server'
import { generateOneTimePassword, generateVerificationToken, lucia } from 'auth'
import { hashPassword } from 'auth/lib/password'
import { UserRoleSchema, db } from 'database'
import { z } from 'zod'
import { publicProcedure } from '../../trpc'

export const signup = publicProcedure
	.input(
		z.object({
			email: z
				.string()
				.email()
				.min(1)
				.max(255)
				.transform(v => v.toLowerCase()),
			password: z.string().min(8).max(255),
			name: z.string().min(1).max(255),
			callbackUrl: z.string(),
		})
	)
	.mutation(async ({ input: { email, password, name, callbackUrl }, ctx: { event } }) => {
		try {
			const hashedPassword = await hashPassword(password)
			const user = await db.user.create({
				data: {
					email,
					name,
					role: UserRoleSchema.Values.USER,
					hashedPassword,
				},
			})

			const session = await lucia.createSession(user.id, {})

			const sessionCookie = lucia.createSessionCookie(session.id)
			if (event) {
				setCookie(event, sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
			}

			const token = await generateVerificationToken({
				userId: user.id,
			})
			const otp = await generateOneTimePassword({
				userId: user.id,
				type: 'SIGNUP',
				identifier: email,
			})

			const url = new URL(callbackUrl)
			url.searchParams.set('token', token)

			await sendEmail({
				templateId: 'newUser',
				to: email,
				context: {
					url: url.toString(),
					otp,
					name: user.name ?? user.email,
				},
			})
		} catch (e) {
			console.error(e)
			throw new TRPCError({
				code: 'INTERNAL_SERVER_ERROR',
				message: 'An unknown error occurred.',
			})
		}
	})
