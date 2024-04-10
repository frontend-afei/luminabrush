<script setup lang="ts">
  defineProps<{
    item: ContentStructureItem;
    activePath: string;
  }>();
</script>

<template>
  <NuxtLink
    v-if="item.isPage"
    class="block rounded-full px-4 py-1"
    :class="{ 'bg-primary/5 font-bold': item.path === activePath }"
    :to="`/docs/${item.path}`"
  >
    {{ item.label }}
  </NuxtLink>
  <span v-else class="block px-4 py-1">
    {{ item.label }}
  </span>

  <div v-if="item.children?.length" class="-mr-4 pl-4">
    <MarketingContentMenuItem
      v-for="subItem of item.children"
      :key="subItem.path"
      :item="subItem"
      :activePath="activePath"
    />
  </div>
</template>
