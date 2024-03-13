<script setup lang="ts">
  const runtimeConfig = useRuntimeConfig();
  const localePath = useLocalePath();
  await navigateTo(localePath(runtimeConfig.public.auth.redirectPath));
</script>

<template>
  <div />
</template>
