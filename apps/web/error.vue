<script setup lang="ts">
  import { UndoIcon } from "lucide-vue-next";
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <h1 class="text-5xl font-bold">404</h1>
    <p class="mt-2 text-2xl">Page not found</p>

    <Button asChild class="mt-4">
      <NuxtLink href="/">
        <UndoIcon class="mr-2 size-4" /> Go to homepage
      </NuxtLink>
    </Button>
  </div>
</template>
