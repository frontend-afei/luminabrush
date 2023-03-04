<template>
  <nav class="bg-white py-4 dark:bg-zinc-900 dark:text-white">
    <div class="container flex items-center justify-between">
      <CommonLogo />

      <div class="flex items-center justify-end gap-4">
        <NuxtLink :to="localePath({ name: 'index' })" class="block px-3 py-2">
          {{ $t('common.menu.home') }}
        </NuxtLink>
        <NuxtLink :to="localePath({ name: 'blog' })" class="block px-3 py-2">
          {{ $t('common.menu.blog') }}
        </NuxtLink>
        <NuxtLink :to="localePath({ name: 'pricing' })" class="block px-3 py-2">
          {{ $t('common.menu.pricing') }}
        </NuxtLink>
        <NuxtLink :to="localePath({ name: 'app-dashboard' })" class="block px-3 py-2">
          {{ $t('common.menu.dashboard') }}
        </NuxtLink>

        <div class="flex items-center justify-end gap-3">
          <CommonColorModeToggle />
          <CommonLanguageSwitch />
          <CommonButton :as="'link'" :to="localePath({ name: session ? 'app-dashboard' : 'auth-signin' })" intent="primary-ghost" size="small">
            {{ session ? $t('common.menu.dashboard') : $t('common.menu.signIn') }}
          </CommonButton>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { data: session } = useSession()
const localePath = useLocalePath()
</script>
