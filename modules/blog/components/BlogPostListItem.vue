<template>
  <div class="rounded-xl border p-6 dark:border-zinc-800">
    <BlogPostTagListDisplay :post="post" />

    <NuxtLink :to="localePath({ path: post._path })" class="text-xl font-semibold text-zinc-900 dark:text-white">
      <h2>{{ post.title }}</h2>
    </NuxtLink>

    <p v-if="post.excerpt" class="opacity-50">
      {{ post.excerpt }}
    </p>

    <div class="mt-4 flex items-center justify-between">
      <BlogPostAuthorDisplay :post="post" class="mb-2" />

      <div class="ml-auto mr-0">
        <p class="text-sm opacity-30">
          {{ formattedDate }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost } from '@/modules/blog/types'

const localePath = useLocalePath()
const { locale } = useI18n()
const props = defineProps<{
  post: BlogPost
}>()

const formattedDate = computed(() => new Date(props.post.createdAt).toLocaleDateString(locale.value))
</script>
