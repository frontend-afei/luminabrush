<template>
  <tbody
    v-bind="{
      ...$attrs,
      class: cn('[&_tr:last-child]:border-0', props.class),
    }"
  >
    <slot />
  </tbody>
</template>

<script setup lang="ts">
  const props = defineProps<{
    class?: ClassProp;
  }>();
</script>
