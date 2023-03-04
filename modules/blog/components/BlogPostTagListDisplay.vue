<template>
  <div v-if="props.post.tags" class="flex flex-wrap gap-2">
    <span v-for="tag of props.post.tags" :key="tag" class="text-xs font-semibold uppercase tracking-wider text-primary-500">
      #{{ tag }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost } from '@/modules/blog/types'
const props = defineProps<{
  post: BlogPost
}>()
</script>
