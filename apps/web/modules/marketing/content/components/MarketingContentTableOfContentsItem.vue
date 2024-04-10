<script setup lang="ts">
  defineProps<{
    item: TableOfContentsItem;
  }>();

  defineEmits<{
    selectItem: [string];
  }>();
</script>

<template>
  <a
    :key="item.id"
    :href="`#${item.id}`"
    class="block text-sm"
    :class="`ml-${Math.max(0, item.depth - 2) * 2}`"
    @click.prevent="$emit('selectItem', item.id)"
  >
    {{ item.text }}
  </a>

  <MarketingContentTableOfContentsItem
    v-for="child of item.children"
    :key="child.id"
    :item="child"
    @select-item="($event) => $emit('selectItem', $event)"
  />
</template>
