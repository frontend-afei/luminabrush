<template>
  <header class="LayoutHeader">
    <div class="container mx-auto py-4 border-b mb-12 flex justify-between items-center h-20">
      <NuxtLink :to="localePath({ name: 'index' })">
        <span class="font-bold text-lg">🚀 supastarter Nuxt</span>
      </NuxtLink>

      <div class="flex gap-8 items-center">
        <div class="flex gap-6 items-center">
          <CommonLanguageSwitch />
        </div>

        <ul class="flex gap-6 items-center">
          <li>
            <NuxtLink :to="localePath({ name: 'index' })">
              {{ $t('home') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath({ name: 'app-dashboard' })">
              {{ $t('dashboard') }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
