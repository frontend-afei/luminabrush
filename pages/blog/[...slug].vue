<template>
  <BlogLayout>
    <div class="prose dark:prose-invert max-w-3xl mx-auto">
      <h1>{{ data?.title }}</h1>
      <ContentRenderer v-if="data" :value="data" />
    </div>
  </BlogLayout>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()
const localeRoute = useLocaleRoute()
const localePath = useLocalePath()

const { data } = await useAsyncData(
  route.path,
  () => {
    const localeRouteResolved = localeRoute({ name: 'blog-slug', params: { slug: route.params.slug } })

    // Remove language prefix from path since we do not have translated content.
    const path = localeRouteResolved?.path.replace(`/${locale.value}/`, '')
    if (!path) {
      return Promise.resolve(null)
    }

    return queryContent(path)
      .where({
        published: true
      })
      .findOne()
  }
)

if (!data.value) {
  navigateTo(localePath({ name: 'blog' }))
}
</script>
