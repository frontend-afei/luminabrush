<script setup lang="ts">
  import { ChevronRightIcon } from "lucide-vue-next";
  import {
    DropdownMenuSubTrigger,
    type DropdownMenuSubTriggerProps,
  } from "radix-vue";

  type Props = DropdownMenuSubTriggerProps & {
    inset?: boolean;
    class?: ClassProp;
  };
  const props = defineProps<Props>();
</script>

<template>
  <DropdownMenuSubTrigger
    v-bind="{
      ...$attrs,
      ...props,
      class: cn(
        'focus:bg-accent data-[state=open]:bg-accent flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm outline-none',
        props.inset ? 'pl-8' : '',
        props.class,
      ),
    }"
  >
    <slot />
    <ChevronRightIcon class="ml-auto size-4" />
  </DropdownMenuSubTrigger>
</template>
