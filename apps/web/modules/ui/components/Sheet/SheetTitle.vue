<script setup lang="ts">
  import { DialogTitle, type DialogTitleProps } from "radix-vue";

  type Props = DialogTitleProps & {
    class?: ClassProp;
  };
  const props = defineProps<Props>();
</script>

<template>
  <DialogTitle
    v-bind="{
      ...$attrs,
      ...props,
      class: cn('text-foreground text-lg font-semibold', props.class),
    }"
  >
    <slot />
  </DialogTitle>
</template>
