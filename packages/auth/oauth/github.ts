import { $fetch } from 'ofetch'
import { GitHub, OAuth2RequestError, generateState } from 'arctic'
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
import { lucia } from '../lib/lucia'

export const githubAuth = new GitHub(process.env.GITHUB_CLIENT_ID as string, process.env.GITHUB_CLIENT_SECRET as string)

type GitHubUser = {
	id: number
	email: string
	name: string
	login: string
	avatar_url: string
}

export async function githubRouteHandler(event: H3Event<EventHandlerRequest>) {
	const state = generateState()

	const url = await githubAuth.createAuthorizationURL(state, {
		scopes: ['email'],
	})

	setCookie(event, 'github_oauth_state', state, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		path: '/',
		maxAge: 60 * 60,
		sameSite: 'lax',
	})

	await sendRedirect(event, url.toString())
}

export async function githubCallbackRouteHandler(event: H3Event<EventHandlerRequest>) {
	const url = getRequestURL(event)
	const code = url.searchParams.get('code')
	const state = url.searchParams.get('state')
	const cookies = parseCookies(event)
	const storedState = cookies.github_oauth_state ?? null

	if (!code || !state || !storedState || state !== storedState) {
		setResponseStatus(event, 400)
		return null
	}

	try {
		const tokens = await githubAuth.validateAuthorizationCode(code)
		const githubUser = await $fetch<GitHubUser>('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
			},
		})
		const existingUser = await db.userOauthAccount.findFirst({
			where: {
				providerId: 'github',
				providerUserId: String(githubUser.id),
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
				email: githubUser.email,
				name: githubUser.name ?? githubUser.login,
				avatarUrl: githubUser.avatar_url,
				emailVerified: true,
			},
		})

		await db.userOauthAccount.create({
			data: {
				providerId: 'github',
				providerUserId: String(githubUser.id),
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
