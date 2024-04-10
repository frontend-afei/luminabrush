<script setup lang="ts">
  import { DialogDescription, type DialogDescriptionProps } from "radix-vue";

  type Props = DialogDescriptionProps & {
    class?: ClassProp;
  };
  const props = defineProps<Props>();
</script>

<template>
  <DialogDescription
    v-bind="{
      ...$attrs,
      ...props,
      class: cn('text-muted-foreground text-sm', props.class),
    }"
  >
    <slot />
  </DialogDescription>
</template>
