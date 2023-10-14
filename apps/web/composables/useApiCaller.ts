import superjson from 'superjson'
import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import type { ApiRouter } from 'api/modules/trpc/router'

export const useApiCaller = () => {
	/**
	 * @TODO see `ApiClientProvider.tsx` in nextjs project, missing splitLink and unstable_httpBatchStreamLink for ai endpoints.
	 * @see https://github.com/wobsoriano/trpc-nuxt/blob/cda36f55d7e615b8ffc7149942cacaa4ef952797/src/client/links.ts#L73
	 */
	const apiCaller = createTRPCNuxtClient<ApiRouter>({
		links: [
			httpBatchLink({
				url: '/api',
			}),
		],
		transformer: superjson,
	})

	return { apiCaller }
}
