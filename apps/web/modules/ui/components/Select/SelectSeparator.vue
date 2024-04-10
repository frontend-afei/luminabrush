<script setup lang="ts">
  import { SelectSeparator, type SelectSeparatorProps } from "radix-vue";

  type Props = SelectSeparatorProps & {
    class?: ClassProp;
  };
  const props = defineProps<Props>();
</script>

<template>
  <SelectSeparator
    v-bind="{
      ...$attrs,
      ...props,
      class: cn('bg-muted -mx-1 my-1 h-px', props.class),
    }"
  />
</template>
