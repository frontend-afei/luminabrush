<script setup lang="ts">
  import type { ChangelogItem } from "@/modules/marketing/changelog/types";

  definePageMeta({
    layout: "marketing",
  });

  const changelogItems: ChangelogItem[] = [
    {
      date: "2024-03-01",
      changes: ["🚀 Improved performance"],
    },
    {
      date: "2024-02-01",
      changes: ["🎨 Updated design", "🐞 Fixed a bug"],
    },
    {
      date: "2024-01-01",
      changes: ["🎉 Added new feature", "🐞 Fixed a bug"],
    },
  ];
</script>

<template>
  <div class="pb-16 pt-32">
    <div class="container">
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold lg:text-5xl">
          {{ $t("changelog.title") }}
        </h1>
        <p class="mt-3 text-lg opacity-50">
          {{ $t("changelog.description") }}
        </p>
      </div>

      <div class="mx-auto max-w-2xl">
        <MarketingChangelogSection :items="changelogItems" />
      </div>
    </div>
  </div>
</template>
