import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import * as newsletterProcedures from '../newsletter/procedures'
import { router } from './trpc'

export const apiRouter = router({
	newsletter: router(newsletterProcedures),
	/**
	 * @TODO
	 */
	/*
	auth:
	billing:
	team:
	ai:
	*/
})

export type ApiRouter = typeof apiRouter
export type ApiInput = inferRouterInputs<ApiRouter>
export type ApiOutput = inferRouterOutputs<ApiRouter>
