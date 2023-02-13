import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish()
      })
    )
    .query(async ({ input, ctx }) => {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
        time: new Date(),
        users: (await ctx.prisma.user.findMany())
      }
    })
})

// export type definition of API
export type AppRouter = typeof appRouter
