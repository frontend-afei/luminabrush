<script setup lang="ts">
  const props = defineProps<{
    class?: ClassProp;
  }>();
</script>

<template>
  <caption
    v-bind="{
      ...$attrs,
      class: cn('text-muted-foreground mt-4 text-sm', props.class),
    }"
  >
    <slot />
  </caption>
</template>
