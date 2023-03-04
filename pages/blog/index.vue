<template>
  <BlogLayout>
    <h1 class="text-center text-4xl font-bold mb-12">
      {{ $t('common.menu.blog') }}
    </h1>

    <section class="mx-auto max-w-3xl space-y-8">
      <NuxtLink
        v-for="item of data"
        :key="item._id"
        :to="localePath({ path: item._path })"
        class="bg-gray-100 dark:bg-gray-700 p-4 block"
      >
        <h2 class="text-xl mb-1 font-bold">
          {{ item.title }}
        </h2>
        <p>{{ item.excerpt }}</p>
      </NuxtLink>
    </section>
  </BlogLayout>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { data } = await useAsyncData('/blog', () => {
  return queryContent('/blog')
    .where({
      published: true
    })
    .find()
})
</script>
