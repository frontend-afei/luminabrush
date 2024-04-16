<script setup lang="ts">
  import { MoonIcon, SunIcon } from "lucide-vue-next";

  const { value: resolvedValue } = useColorMode();
</script>

<template>
  <component
    :is="resolvedValue === 'light' ? SunIcon : MoonIcon"
    class="size-4"
  />
</template>
