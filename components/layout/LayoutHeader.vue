<template>
  <header class="LayoutHeader">
    <div class="container mx-auto py-4 border-b theme-dark:border-gray-700 mb-12 flex justify-between items-center h-20">
      <NuxtLink :to="localePath({ name: 'index' })">
        <span class="font-bold text-lg">
          <span>🚀 supastarter&nbsp;</span>
          <span class="text-primary">Nuxt</span>
        </span>
      </NuxtLink>

      <div class="flex gap-8 items-center">
        <div class="flex gap-4 items-center">
          <CommonThemeSwitch />
          <CommonLanguageSwitch />
        </div>

        <ul class="flex gap-6 items-center">
          <li>
            <NuxtLink :to="localePath({ name: 'index' })">
              {{ $t('home') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath({ name: 'blog' })">
              {{ $t('blog') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath({ name: 'pricing' })">
              {{ $t('pricing') }}
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
