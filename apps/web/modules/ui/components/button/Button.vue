<script setup lang="ts">
  import type { HTMLAttributes } from "vue";
  import { Primitive, type PrimitiveProps } from "radix-vue";
  import { type ButtonVariants, buttonVariants } from ".";
  import { cn } from "@/modules/ui/lib/utils";
  import { LoaderIcon } from "lucide-vue-next";

  type Props = {
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    class?: HTMLAttributes["class"];
    disabled?: boolean;
    loading?: boolean;
  } & PrimitiveProps;

  const props = withDefaults(defineProps<Props>(), {
    as: "button",
  });
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="props.disabled || props.loading"
  >
    <LoaderIcon v-if="props.loading" class="mr-2 size-4 animate-spin" />
    <slot />
  </Primitive>
</template>
