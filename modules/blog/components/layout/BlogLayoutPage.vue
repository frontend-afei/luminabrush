<template>
  <BlogLayout>
    <div className="mb-12 pt-8 text-center">
      <h1 className="mb-2 text-5xl font-bold">
        {{ $t('blog.pageTitle') }}
      </h1>
      <p className="text-lg opacity-50">
        {{ $t('blog.pageDescription') }}
      </p>
    </div>

    <div className="grid gap-4">
      <BlogPostListItem
        v-for="post of posts"
        :key="post._id"
        :post="post"
      />
    </div>
  </BlogLayout>
</template>

<script setup lang="ts">
import type { BlogPost } from '@/modules/blog/types'

const { data: posts } = await useAsyncData('/blog', () => {
  return queryContent<BlogPost>('/blog')
    .where({
      published: true
    })
    .find()
})
</script>
