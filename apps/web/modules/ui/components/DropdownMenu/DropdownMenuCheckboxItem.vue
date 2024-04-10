<script setup lang="ts">
  import { CheckIcon } from "lucide-vue-next";
  import {
    DropdownMenuCheckboxItem,
    DropdownMenuItemIndicator,
    type DropdownMenuCheckboxItemProps,
  } from "radix-vue";

  type Props = DropdownMenuCheckboxItemProps & {
    class?: ClassProp;
  };
  const props = defineProps<Props>();
</script>

<template>
  <DropdownMenuCheckboxItem
    v-bind="{
      ...$attrs,
      ...props,
      class: cn(
        'focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-3 pl-8 pr-3 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class,
      ),
    }"
  >
    <span class="absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <CheckIcon class="size-4" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuCheckboxItem>
</template>
