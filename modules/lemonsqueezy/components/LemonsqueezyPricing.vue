<template>
  <article class="flex-1 bg-gray-100 theme-dark:bg-gray-700 p-4">
    <h2 class="mb-1 text-center">
      {{ props.product.data.attributes.name }}
    </h2>
    <pre class="max-w-sm overflow-x-scroll">{{ props.product.data }}</pre>
  </article>
</template>

<script setup lang="ts">
import type { RetrieveProductResult } from 'lemonsqueezy.ts/types'

const props = defineProps<{
  product: RetrieveProductResult
}>()
</script>
