<template>
  <div class="rounded-xl border p-6 dark:border-zinc-800">
    <div v-if="post.tags" class="mb-2 flex flex-wrap gap-2">
      <span v-for="tag of post.tags" :key="tag" class="text-xs font-semibold uppercase tracking-wider text-primary-500">
        #{{ tag }}
      </span>
    </div>

    <NuxtLink :to="localePath({ path: post._path })" class="text-xl font-semibold text-zinc-900 dark:text-white">
      <h2>{{ post.title }}</h2>
    </NuxtLink>

    <p v-if="post.excerpt" class="opacity-50">
      {{ post.excerpt }}
    </p>

    <div class="mt-4 flex items-center justify-between">
      <div v-if="post.authorName" class="flex items-center">
        <div v-if="post.authorImage" class="relative mr-2 h-8 w-8 overflow-hidden rounded-full">
          <img :src="post.authorImage" class="h-full w-full object-cover object-center">
        </div>

        <div>
          <p class="text-sm font-semibold opacity-50">
            {{ post.authorName }}
          </p>
        </div>
      </div>

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
