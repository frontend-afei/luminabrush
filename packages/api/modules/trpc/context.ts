import { inferAsyncReturnType } from '@trpc/server'
import { type SessionUser, auth } from 'auth'
import { db } from 'database'
import { type H3Event } from 'h3'
import { defineAbilitiesFor } from '../auth'

export async function createContext(event: H3Event /** @TODO | { isAdmin?: boolean }*/) {
	const authRequest = auth.handleRequest(event)
	const session = await authRequest.validate() // or `authRequest.validateBearerToken()`
	const user: SessionUser | null = session?.user ?? null

	const teamMemberships = user
		? await db.teamMembership.findMany({
				where: {
					user_id: user.id,
				},
				include: {
					team: true,
				},
		  })
		: null

	const abilities = defineAbilitiesFor({
		user,
		teamMemberships,
	})

	return {
		user,
		teamMemberships,
		abilities,
		sessionId: session?.sessionId ?? null,
		responseHeaders: event && 'headers' in event ? event.headers : undefined,
		isAdmin: false /** @TODO params && 'isAdmin' in params ? params.isAdmin : false, */,
	}
}

export type Context = inferAsyncReturnType<typeof createContext>
