<script setup lang="ts">
  const props = defineProps<{
    class?: ClassProp;
  }>();
</script>

<template>
  <div :class="cn('p-6 pt-0', props.class)">
    <slot />
  </div>
</template>
