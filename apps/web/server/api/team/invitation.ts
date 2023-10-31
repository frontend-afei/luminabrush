import { joinURL, withLeadingSlash } from 'ufo'
import { createApiCaller } from 'api'

const createResponse = (redirectPath: string) => {
	return {
		redirectPath: withLeadingSlash(redirectPath),
	}
}

export default defineEventHandler(async event => {
	const requestUrl = new URL(getRequestURL(event))
	const code = requestUrl.searchParams.get('code') || null
	if (!code) {
		return createResponse('/')
	}

	const apiCaller = await createApiCaller(event)

	const invitation = await apiCaller.team.invitationById({
		id: code,
	})
	if (!invitation) {
		return createResponse('/')
	}

	const user = await apiCaller.auth.user()
	if (!user) {
		return createResponse(`/auth/login?invitationCode=${invitation.id}&email=${invitation.email}`)
	}

	try {
		const team = await apiCaller.team.acceptInvitation({
			id: code,
		})
		if (!team) {
			return createResponse('/')
		}

		return createResponse(joinURL(team.slug, '/dashboard'))
	} catch (e) {
		console.error(e)
		return createResponse('/')
	}
})
