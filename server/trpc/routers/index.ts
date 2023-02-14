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
