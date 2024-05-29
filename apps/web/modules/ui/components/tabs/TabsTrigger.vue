<script setup lang="ts">
  import { type HTMLAttributes, computed } from "vue";
  import {
    TabsTrigger,
    type TabsTriggerProps,
    useForwardProps,
  } from "radix-vue";
  import { cn } from "@/modules/ui/lib/utils";

  const props = defineProps<
    TabsTriggerProps & { class?: HTMLAttributes["class"] }
  >();

  const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
  });

  const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TabsTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'ring-offset-background focus-visible:ring-ring border-b-2 -mb-0.5 border-transparent data-[state=active]:border-primary data-[state=active]:text-card-foreground data-[state=active]:font-semibold inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        props.class,
      )
    "
  >
    <slot />
  </TabsTrigger>
</template>
