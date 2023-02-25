import { lemonsqueezy } from '../lemonsqueezyApi'
import { router, publicProcedure } from '@/server/trpc/trpc'

export const lemonsqueezyRouter = router({
  retrieveProducts: publicProcedure
    .query(async ({ ctx }) => {
      const productIds = ['48647', '48648', '48649']
      const productPromises = productIds.map(id => lemonsqueezy.retrieveProduct({ id, include: 'variants' }))

      const products = await Promise.all(productPromises)
      return products
    })
})
