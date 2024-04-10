<script setup lang="ts">
  import {
    DropdownMenuSeparator,
    type DropdownMenuSeparatorProps,
  } from "radix-vue";

  type Props = DropdownMenuSeparatorProps & {
    class?: ClassProp;
  };
  const props = defineProps<Props>();
</script>

<template>
  <DropdownMenuSeparator
    v-bind="{
      ...$attrs,
      ...props,
      class: cn('bg-border -mx-1 my-1 h-px', props.class),
    }"
  >
    <slot />
  </DropdownMenuSeparator>
</template>
