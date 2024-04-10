<script setup lang="ts">
  defineProps<{
    items: ContentStructureItem[];
    activePath: string;
  }>();
</script>

<template>
  <ul class="-mx-4 list-none space-y-2 pr-4">
    <MarketingContentMenuItem
      v-for="item of items"
      :key="item.path"
      :item="item"
      :activePath="activePath"
    />
  </ul>
</template>
