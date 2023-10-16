import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import * as newsletterProcedures from '../newsletter/procedures'
import * as authProcedures from '../auth/procedures'
import { router } from './trpc'

export const apiRouter = router({
	newsletter: router(newsletterProcedures),
	auth: router(authProcedures),
	/**
	 * @TODO
	 */
	/*
	billing:
	team:
	ai:
	*/
})

export type ApiRouter = typeof apiRouter
export type ApiInput = inferRouterInputs<ApiRouter>
export type ApiOutput = inferRouterOutputs<ApiRouter>
