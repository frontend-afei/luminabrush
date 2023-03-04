<template>
  <BlogLayout v-if="post">
    <div class="mb-8">
      <NuxtLink :to="localePath({ name: 'blog' })" class="inline-flex items-center gap-1">
        <Icon name="feather:arrow-left" />
        <span>{{ $t('blog.postBackLabel') }}</span>
      </NuxtLink>
    </div>

    <div class="mb-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
        {{ post.title }}
      </h1>

      <div class="mt-4 flex items-center justify-start gap-6">
        <BlogPostAuthorDisplay :post="(post as BlogPost)" />

        <p className="text-sm opacity-30">
          {{ formattedDate }}
        </p>

        <BlogPostTagListDisplay :post="(post as BlogPost)" />
      </div>
    </div>

    <ContentRenderer :value="post" class="prose prose-zinc dark:prose-invert" />
  </BlogLayout>
</template>

<script setup lang="ts">
import type { BlogPost } from '@/modules/blog/types'

const { locale } = useI18n()
const route = useRoute()
const localeRoute = useLocaleRoute()
const localePath = useLocalePath()

const { data: post } = await useAsyncData(
  route.path,
  () => {
    const localeRouteResolved = localeRoute({ name: 'blog-slug', params: { slug: route.params.slug } })

    // Remove language prefix from path since we do not have translated content.
    const path = localeRouteResolved?.path.replace(`/${locale.value}/`, '')
    if (!path) {
      return Promise.resolve(null)
    }

    return queryContent<BlogPost>(path)
      .where({
        published: true
      })
      .findOne()
  }
)

if (!post.value) {
  navigateTo(localePath({ name: 'blog' }))
}

const formattedDate = computed(() => new Date(post.value?.createdAt).toLocaleDateString(locale.value))

useServerSeoMeta({
  title: () => post.value?.title,
  description: () => post.value?.excerpt
})
</script>
