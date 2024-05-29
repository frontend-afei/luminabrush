<script setup lang="ts">
  import { type HTMLAttributes, computed } from "vue";
  import { TabsList, type TabsListProps } from "radix-vue";
  import { cn } from "@/modules/ui/lib/utils";

  const props = defineProps<
    TabsListProps & { class?: HTMLAttributes["class"] }
  >();

  const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
  });
</script>

<template>
  <TabsList
    v-bind="delegatedProps"
    :class="
      cn(
        'text-card-foreground/80 border-b-2 inline-flex items-center justify-center text-sm',
        props.class,
      )
    "
  >
    <slot />
  </TabsList>
</template>
