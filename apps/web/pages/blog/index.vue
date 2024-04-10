<script setup lang="ts">
  import type { MarketingBlogPageFields } from "@/modules/marketing/blog/types";

  const { t } = useTranslations();

  definePageMeta({
    layout: "marketing",
  });

  useSeoMeta({
    title: t("blog.title"),
  });

  const { locale, defaultLocale } = useI18n();

  const { data: posts } = await useAsyncData(
    "blog",
    async () => {
      const localeExtensionPattern = /(\.[a-zA-Z\\-]{2,5})+\.md$/;
      const results = await queryContent<MarketingBlogPageFields>("blog")
        .where({
          $and: [
            { draft: { $not: true } },
            locale.value === defaultLocale
              ? { _file: { $not: { $match: localeExtensionPattern } } }
              : {
                  _file: { $match: localeExtensionPattern },
                },
          ],
        })
        .sort({ date: -1 })
        .find();

      return results.map((post) => ({
        ...post,
        _path: post._path?.replace(/(\.[a-zA-Z\\-]{2,5})$/, ""),
      }));
    },
    {
      watch: [locale],
    },
  );
</script>

<template>
  <div class="container max-w-6xl pb-24">
    <div class="mb-12 pt-8 text-center">
      <h1 class="mb-2 text-5xl font-bold">{{ $t("blog.title") }}</h1>
      <p class="text-lg opacity-50">{{ $t("blog.description") }}</p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <MarketingPostListItem
        v-for="post of posts"
        :key="post._id"
        :post="post"
      />
    </div>
  </div>
</template>
