<script setup lang="ts">
  definePageMeta({
    layout: "saas-app",
  });
</script>

<template>
  <div class="container max-w-6xl py-8">
    <SaasPageHeader>
      <template #title>AI Demo</template>
      <template #subtitle
        >This demo shows an example integration of the OpenAI API</template
      >
    </SaasPageHeader>

    <div
      class="mx-auto max-w-3xl rounded-lg border bg-card p-8 text-foreground"
    >
      <div>
        <p class="mb-4">
          Enter a topic and we will generate some funny product names for you:
        </p>
        <SaasProductNameGenerator />
      </div>
    </div>
  </div>
</template>
