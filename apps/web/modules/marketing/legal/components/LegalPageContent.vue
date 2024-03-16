<template>
  <ContentRendererMarkdown
    :value="page"
    class="prose dark:prose-invert mx-auto mt-6 max-w-2xl"
  />
</template>

<script setup lang="ts">
  import type { LegalPageFields } from "../types";

  defineProps<{
    page: LegalPageFields;
  }>();
</script>
