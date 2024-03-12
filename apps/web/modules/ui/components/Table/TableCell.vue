<template>
  <td
    v-bind="{
      ...$attrs,
      class: cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', props.class),
    }"
  >
    <slot />
  </td>
</template>

<script setup lang="ts">
  const props = defineProps<{
    class?: ClassProp;
  }>();
</script>
