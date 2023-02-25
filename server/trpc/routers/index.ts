import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

// Import routers from modules
import { lemonsqueezyRouter } from '@/modules/lemonsqueezy/server/trpc/lemonsqueezyRouter'

export const appRouter = router({
  lemonsqueezy: lemonsqueezyRouter,

  // Example
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish()
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const users = await ctx.prisma.user.findMany()
        return {
          greeting: `hello ${input?.text ?? 'world'}`,
          time: new Date(),
          users
        }
      } catch (error) {
        console.error(error)
        return null
      }
    })
})

// export type definition of API
export type AppRouter = typeof appRouter
