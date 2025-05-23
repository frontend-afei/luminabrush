<script lang="ts" setup>
  definePageMeta({
    layout: "marketing",
  });

  const route = useRoute("legal-path");
  const { path } = route.params;
  const { locale, defaultLocale } = useTranslations();

  const { data: page } = await useAsyncData(
    route.path,
    async () => {
      return (
        await queryContent<LegalPageFields>(`legal/`)
          .where({
            _file: {
              $regex: new RegExp(`${path}(\\.[a-zA-Z\-]{2,5}){0,1}\\.md$`),
            },
          })
          .find()
      )
        .sort((a, b) => {
          const localePattern = /\.([a-zA-Z\\-]{2,5})\.md$/;
          const aLocale = a._file?.match(localePattern)?.[1] ?? defaultLocale;
          const bLocale = b._file?.match(localePattern)?.[1] ?? defaultLocale;

          return aLocale === locale.value
            ? -1
            : bLocale === locale.value
            ? 1
            : 0;
        })
        .shift();
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

<template>
  <div v-if="page" class="container max-w-6xl pb-16">
    <div class="h-12"></div>

    <ContentRendererMarkdown
      :value="page"
      class="prose mx-auto mt-6 max-w-2xl dark:prose-invert"
    />
  </div>
</template>
