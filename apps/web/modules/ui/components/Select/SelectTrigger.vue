<script setup lang="ts">
  import { ChevronsUpDownIcon } from "lucide-vue-next";
  import {
    SelectIcon,
    SelectTrigger,
    type SelectTriggerProps,
  } from "radix-vue";

  type Props = SelectTriggerProps & {
    class?: ClassProp;
  };
  const props = defineProps<Props>();
</script>

<template>
  <SelectTrigger
    v-bind="{
      ...$attrs,
      ...props,
      class: cn(
        'border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        props.class,
      ),
    }"
  >
    <slot />
    <SelectIcon asChild>
      <ChevronsUpDownIcon class="size-4 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
