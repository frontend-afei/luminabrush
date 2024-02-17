import { $fetch } from 'ofetch'
import { Google, OAuth2RequestError, generateCodeVerifier, generateState } from 'arctic'
import { db } from 'database'
import {
	getRequestURL,
	parseCookies,
	setCookie,
	type EventHandlerRequest,
	type H3Event,
	sendRedirect,
	setResponseStatus,
} from 'h3'
import { getBaseUrl } from 'utils'
import { lucia } from '../lib/lucia'

export const googleAuth = new Google(
	process.env.GOOGLE_CLIENT_ID as string,
	process.env.GOOGLE_CLIENT_SECRET as string,
	new URL('/api/oauth/google/callback', getBaseUrl()).toString()
)

type GoogleUser = {
	id: number
	email: string
	email_verified?: boolean
	picture?: string
	name: string
}

export async function googleRouteHandler(event: H3Event<EventHandlerRequest>) {
	const state = generateState()
	const codeVerifier = generateCodeVerifier()

	const url = await googleAuth.createAuthorizationURL(state, codeVerifier, {
		scopes: ['profile', 'email'],
	})

	setCookie(event, 'google_oauth_state', state, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		path: '/',
		maxAge: 60 * 60,
		sameSite: 'lax',
	})

	setCookie(event, 'code_verifier', codeVerifier, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		path: '/',
		maxAge: 60 * 60,
		sameSite: 'lax',
	})

	return await sendRedirect(event, url.toString())
}

export async function googleCallbackRouteHandler(event: H3Event<EventHandlerRequest>) {
	const url = getRequestURL(event)
	const code = url.searchParams.get('code')
	const state = url.searchParams.get('state')
	const cookies = parseCookies(event)
	const storedState = cookies.google_oauth_state ?? null
	const storedCodeVerifier = cookies.code_verifier ?? null

	if (!code || !state || !storedState || !storedCodeVerifier || state !== storedState) {
		setResponseStatus(event, 400)
		return null
	}

	try {
		const tokens = await googleAuth.validateAuthorizationCode(code, storedCodeVerifier)
		const googleUser = await $fetch<GoogleUser>('https://openidconnect.googleapis.com/v1/userinfo', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
			},
		})
		const existingUser = await db.userOauthAccount.findFirst({
			where: {
				providerId: 'google',
				providerUserId: String(googleUser.id),
			},
		})

		if (existingUser) {
			const session = await lucia.createSession(existingUser.userId, {})
			const sessionCookie = lucia.createSessionCookie(session.id)
			setCookie(event, sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
			return await sendRedirect(event, '/app/dashboard', 302)
		}

		const newUser = await db.user.create({
			data: {
				email: googleUser.email,
				emailVerified: !!googleUser,
				name: googleUser.name,
				avatarUrl: googleUser.picture,
			},
		})

		await db.userOauthAccount.create({
			data: {
				providerId: 'google',
				providerUserId: String(googleUser.id),
				userId: newUser.id,
			},
		})
		const session = await lucia.createSession(newUser.id, {})
		const sessionCookie = lucia.createSessionCookie(session.id)
		setCookie(event, sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
		return await sendRedirect(event, '/app/dashboard', 302)
	} catch (e) {
		console.error(e)
		if (e instanceof OAuth2RequestError) {
			setResponseStatus(event, 400)
			return null
		}

		setResponseStatus(event, 500)
		return null
	}
}
