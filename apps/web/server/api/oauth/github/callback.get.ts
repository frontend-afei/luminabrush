import { auth, githubAuth, type Session } from 'auth'

export default defineEventHandler(async event => {
	const authRequest = auth.handleRequest(event)
	const session = (await authRequest.validate()) as Session | null
	if (session) {
		setResponseStatus(event, 302)
		return sendRedirect(event, '/')
	}

	const storedState = getCookie(event, 'github_oauth_state')
	const url = new URL(getRequestURL(event))
	const queryParams = getQuery(event)
	const state = String(queryParams.state)
	const code = String(queryParams.code)

	if (!storedState || !state || storedState !== state || !code) {
		setResponseStatus(event, 400)
		return null
	}

	try {
		const { getExistingUser, githubUser, createUser, createKey } = await githubAuth.validateCallback(code)
		// @TODO unfinished, and check why `validateCallback` returns `any` type.
	} catch (error) {}
})
