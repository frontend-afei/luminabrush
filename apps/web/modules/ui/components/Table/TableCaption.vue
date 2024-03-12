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

<script setup lang="ts">
  const props = defineProps<{
    class?: ClassProp;
  }>();
</script>
