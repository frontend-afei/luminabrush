<script setup lang="ts">
  import { CheckIcon } from "lucide-vue-next";
  import {
    SelectItem,
    SelectItemIndicator,
    SelectItemText,
    type SelectItemProps,
  } from "radix-vue";

  type Props = SelectItemProps & {
    class?: ClassProp;
  };
  const props = defineProps<Props>();
</script>

<template>
  <SelectItem
    v-bind="{
      ...$attrs,
      ...props,
      class: cn(
        'focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class,
      ),
    }"
  >
    <span class="absolute right-2 flex size-3.5 items-center justify-center">
      <SelectItemIndicator>
        <CheckIcon class="size-4" />
      </SelectItemIndicator>
    </span>
    <SelectItemText><slot /></SelectItemText>
  </SelectItem>
</template>
