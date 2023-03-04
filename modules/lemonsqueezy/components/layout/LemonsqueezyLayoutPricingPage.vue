<template>
  <div>
    <h1 class="mb-4">
      {{ $t('common.menu.pricing') }}
    </h1>
    <div v-if="products" class="flex gap-12">
      <LemonsqueezyPricing v-for="product of products" :key="product.data.id" :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { trpcClient } = useTrpcClient()
const { data: products } = await trpcClient.lemonsqueezy.retrieveProducts.useQuery()
</script>
