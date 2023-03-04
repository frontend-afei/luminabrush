<template>
  <NuxtLoadingIndicator :height="4" :color="color" />
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const color = computed(() => {
  switch (colorMode.value) {
    case 'dark': return '#fff'
    case 'light': return '#000'
  }
})
</script>
