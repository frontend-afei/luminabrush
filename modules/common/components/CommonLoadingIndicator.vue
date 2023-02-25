<template>
  <NuxtLoadingIndicator :height="4" :color="color" />
</template>

<script setup lang="ts">
const color = useThemeValue('colors.primary')
</script>
