<template>
  <ContentRenderer v-if="page" :value="page">
    <div class="container max-w-6xl pb-24">
      <div class="mx-auto max-w-2xl">
        <h1 class="text-4xl font-bold text-center">{{ page.title }}</h1>
      </div>

      <LegalPageContent :page="page" />
    </div>
  </ContentRenderer>
</template>

<script lang="ts" setup>
  import type { LegalPageFields } from "../../modules/marketing/legal/types";

  definePageMeta({
    layout: "marketing",
  });

  const route = useRoute("legal-slug");
  const { slug } = route.params;
  const { locale, defaultLocale } = useTranslations();

  const { data: page } = await useAsyncData(
    route.path,
    async () => {
      return (
        (await queryContent<LegalPageFields>(
          `legal/${locale.value}/${slug}`,
        ).findOne()) ??
        (await queryContent<LegalPageFields>(
          `legal/${defaultLocale}/${slug}`,
        ).findOne())
      );
    },
    {
      watch: [locale],
    },
  );

  if (!page.value) {
    throw createError({ statusCode: 404 });
  }

  // SEO
  useContentHead(page.value);
</script>
