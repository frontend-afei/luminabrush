import { TRPCError, initTRPC } from '@trpc/server'
import superjson from 'superjson'
import type { Context } from './context'

const t = initTRPC.context<Context>().create({
	transformer: superjson,
})

const isAuthenticated = t.middleware(({ ctx, next }) => {
	/**
	 * @TODO missing `isAuthenticated` check, see `base.ts` in nextjs project
	 */
	if (1 === 1) throw new TRPCError({ code: 'UNAUTHORIZED' })
	return next()
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthenticated)
