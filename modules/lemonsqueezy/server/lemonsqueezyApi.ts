import type { RetrieveProductResult, RetrieveProductOptions } from 'lemonsqueezy.ts/types'
import { $fetch } from 'ofetch'
import { useRuntimeConfig } from '#imports'

const getApiKey = () => {
  const runtimeConfig = useRuntimeConfig()
  const apiKey: string | undefined = runtimeConfig?.lemonsqueezy?.apiKey || ''
  if (!apiKey) {
    console.warn('No `runtimeConfig.lemonsqueezy.apiKey` found.')
  }
  return apiKey
}

const fetchOptions = {
  baseURL: 'https://api.lemonsqueezy.com',
  headers: {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
    Authorization: `Bearer ${getApiKey()}`
  }
}

type ModifiedOptions<T> = Omit<T, 'apiVersion' | 'baseUrl' | 'include'> & { include?: string }

const retrieveProduct = (options: ModifiedOptions<RetrieveProductOptions>) => {
  return $fetch<RetrieveProductResult>(`/v1/products/${options.id}`, {
    ...fetchOptions,
    params: {
      include: options.include
    }
  })
}

export const lemonsqueezy = {
  retrieveProduct
}
