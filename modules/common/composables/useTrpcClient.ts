import superjson from 'superjson'
import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import type { AppRouter } from '@/server/trpc/routers'

const trpcClient = createTRPCNuxtClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: '/api/trpc'
    })
  ]
})

export const useTrpcClient = () => {
  return { trpcClient }
}
