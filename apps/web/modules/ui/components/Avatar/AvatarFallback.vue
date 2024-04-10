<script setup lang="ts">
  import { AvatarFallback, type AvatarFallbackProps } from "radix-vue";

  type Props = AvatarFallbackProps & {
    class?: ClassProp;
  };
  const props = defineProps<Props>();
</script>

<template>
  <AvatarFallback
    v-bind="{
      ...$attrs,
      ...props,
      class: cn(
        'bg-muted flex h-full w-full items-center justify-center rounded-full text-xs font-bold',
        props.class,
      ),
    }"
  >
    <slot />
  </AvatarFallback>
</template>
