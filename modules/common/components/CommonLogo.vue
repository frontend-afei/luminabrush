<template>
  <NuxtLink :to="props.link ?? localePath({ name: 'index' })" class="block text-2xl font-semibold leading-none text-black hover:no-underline focus:no-underline dark:text-white">
    supastarter.<span className="text-primary-500">nuxt</span>
  </NuxtLink>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const props = defineProps<{
  link?: string
}>()
</script>
