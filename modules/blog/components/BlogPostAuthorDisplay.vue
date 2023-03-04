<template>
  <div v-if="props.post.authorName" class="flex items-center">
    <div v-if="props.post.authorImage" class="relative mr-2 h-8 w-8 overflow-hidden rounded-full">
      <img :src="props.post.authorImage" :alt="props.post.authorName" class="h-full w-full object-cover object-center">
    </div>

    <div>
      <p class="text-sm font-semibold opacity-50">
        {{ props.post.authorName }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost } from '@/modules/blog/types'
const props = defineProps<{
  post: BlogPost
}>()
</script>
