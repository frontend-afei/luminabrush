import { createNuxtApiHandler } from 'trpc-nuxt'
import { apiRouter } from 'api/modules/trpc/router'
import { createContext } from 'api/modules/trpc/context'

export default createNuxtApiHandler({
	router: apiRouter,
	createContext,
})
