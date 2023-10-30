import { joinURL, withLeadingSlash } from 'ufo'
import type { Team } from 'database'
import { createApiCaller } from 'api'
import { TEAM_SLUG_COOKIE_NAME } from '@/modules/saas/shared/constants'

const createResponse = (redirectPath: string) => {
	return {
		redirectPath: withLeadingSlash(redirectPath),
	}
}

export default defineEventHandler(async event => {
	const requestUrl = new URL(getRequestURL(event))
	const redirectTo = requestUrl.searchParams.get('redirectTo') || null

	const apiCaller = await createApiCaller(event)

	const getRedirectUrl = ({ teamSlug, path }: { teamSlug?: string; path: string }) => {
		let redirectPath = redirectTo ?? path
		if (teamSlug) redirectPath = joinURL(teamSlug, redirectPath)
		return redirectPath
	}

	try {
		const user = await apiCaller.auth.user()
		if (!user) {
			// TODO i18n
			let redirectUrl = '/auth/login'
			if (redirectTo) {
				redirectUrl = `${redirectUrl}?redirectTo=${redirectTo}}`
			}
			return createResponse(redirectUrl)
		}

		const { teamMemberships } = user

		if (!teamMemberships || !teamMemberships.length) {
			let team: Team | undefined = undefined
			let iteration = 0

			do {
				if (iteration === 10) {
					return createResponse('/')
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
			return createResponse(getRedirectUrl({ teamSlug: team.slug, path: '/dashboard' }))
		}

		const teamSlugCookie = getCookie(event, TEAM_SLUG_COOKIE_NAME)

		if (teamSlugCookie) {
			const teamMembership = teamMemberships.find(membership => membership.team.slug === teamSlugCookie)

			if (teamMembership) {
				// TODO i18n
				return createResponse(getRedirectUrl({ teamSlug: teamMembership.team.slug, path: '/dashboard' }))
			}
		}

		return createResponse(getRedirectUrl({ teamSlug: teamMemberships[0].team.slug, path: '/dashboard' }))
	} catch (e) {
		console.error(e)
		return createResponse('/')
	}
})
