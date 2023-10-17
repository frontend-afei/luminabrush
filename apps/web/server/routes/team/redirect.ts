import { joinURL } from 'ufo'
import type { Team } from 'database'
import { createApiCaller } from 'api'

export default defineEventHandler(async event => {
	const requestUrl = new URL(getRequestURL(event))
	const redirectTo = requestUrl.searchParams.get('redirectTo') || null

	const apiCaller = await createApiCaller()

	const getRedirectUrl = ({ teamSlug, path }: { teamSlug?: string; path: string }) => {
		let redirectPath = redirectTo ?? path
		if (teamSlug) redirectPath = joinURL(teamSlug, redirectPath)
		return new URL(redirectPath, requestUrl.origin).toString()
	}

	try {
		const user = await apiCaller.auth.user()
		if (!user) {
			// TODO i18n
			const redirectUrl = new URL('/auth/login', requestUrl.origin)
			if (redirectTo) redirectUrl.searchParams.set('redirectTo', redirectTo)
			return sendRedirect(event, redirectUrl.toString())
		}

		const { teamMemberships } = user

		if (!teamMemberships || !teamMemberships.length) {
			let team: Team | undefined = undefined
			let iteration = 0

			do {
				if (iteration === 10) {
					return sendRedirect(event, requestUrl.origin)
				}

				try {
					const name = user.name || user.email.split('@')[0]
					const slug = `${name}${iteration ? ` ${iteration + 1}` : ''}`

					team = await apiCaller.team.create({
						name: name,
						slug,
					})
				} catch (e) {
					console.error(e)
				}

				iteration++
			} while (!team)

			// TODO i18n
			return sendRedirect(event, getRedirectUrl({ teamSlug: team.slug, path: '/dashboard' }))
		}

		const teamSlugCookie = getCookie(event, 'team-slug')

		if (teamSlugCookie) {
			const teamMembership = teamMemberships.find(membership => membership.team.slug === teamSlugCookie)

			if (teamMembership) {
				// TODO i18n
				return sendRedirect(event, getRedirectUrl({ teamSlug: teamMembership.team.slug, path: '/dashboard' }))
			}
		}

		return sendRedirect(event, getRedirectUrl({ teamSlug: teamMemberships[0].team.slug, path: '/dashboard' }))
	} catch (e) {
		console.error(e)
		return sendRedirect(event, requestUrl.origin)
	}
})
