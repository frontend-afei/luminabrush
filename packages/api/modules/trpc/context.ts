import { inferAsyncReturnType } from '@trpc/server'

/**
 * @TODO auth context, see `context.ts` in nextjs project
 */
export const createContext = () => ({})

export type Context = inferAsyncReturnType<typeof createContext>
