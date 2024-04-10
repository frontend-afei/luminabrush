<script setup lang="ts">
  const props = defineProps<{
    class?: ClassProp;
  }>();
</script>

<template>
  <thead v-bind="{ ...$attrs, class: cn('[&_tr]:border-b', props.class) }">
    <slot />
  </thead>
</template>
