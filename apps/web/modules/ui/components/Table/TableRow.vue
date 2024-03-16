<template>
  <tr
    v-bind="{
      ...$attrs,
      class: cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        props.class,
      ),
    }"
  >
    <slot />
  </tr>
</template>

<script setup lang="ts">
  const props = defineProps<{
    class?: ClassProp;
  }>();
</script>
