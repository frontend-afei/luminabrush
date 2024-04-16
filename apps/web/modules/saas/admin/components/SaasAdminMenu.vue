<script setup lang="ts">
  defineProps<{
    items: { title: string; to: string }[];
  }>();

  const route = useRoute();
  const isActiveMenuItem = (href: string | null) => {
    return href && route.path.includes(href);
  };
</script>

<template>
  <ul class="list-none space-y-2">
    <li v-for="item of items" :key="item.to">
      <NuxtLinkLocale
        :to="item.to"
        class="block py-1.5 pl-10"
        :class="isActiveMenuItem(item.to) ? 'font-bold' : ''"
      >
        {{ item.title }}
      </NuxtLinkLocale>
    </li>
  </ul>
</template>
