<script setup lang="ts">
  const props = defineProps<{
    class?: ClassProp;
  }>();
</script>

<template>
  <div
    :class="
      cn(
        'bg-card/90 text-card-foreground rounded-lg shadow-sm backdrop-blur-md',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
