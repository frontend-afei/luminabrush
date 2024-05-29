<script lang="ts" setup>
  const documentationContentDir = "documentation";

  definePageMeta({
    layout: "marketing",
  });

  const route = useRoute("docs-path");
  const { locale, defaultLocale } = useTranslations();

  const activePath = computed(() =>
    sanitizeContentPath(route.path ?? "", {
      dir: "docs",
      extension: "",
    }),
  );

  const { data } = await useAsyncData(
    activePath.value,
    async () => {
      const metaFiles = await queryContent<DocumentationPageFields>(
        documentationContentDir,
      )
        .where({
          _file: {
            $regex: /meta(\.[a-zA-Z\-]{2,5})*\.json$/,
          },
        })
        .only(["_file", "_path", "items"])
        .find();

      const documentationPages = await queryContent<DocumentationPageFields>(
        documentationContentDir,
      )
        .where({
          _extension: "md",
        })
        .only(["_file", "_path", "title", "subtitle", "description", "body"])
        .find();

      const contentStructure = getContentStructure({
        documents: documentationPages.map((doc) => ({
          path: sanitizeContentPath(doc._file, {
            dir: documentationContentDir,
            extension: "md",
          }),
          locale: getLocaleFromFilePath(doc._file, {
            extension: "md",
            defaultLocale,
          }),
          title: doc.title,
        })),
        meta: metaFiles.map((meta) => ({
          path: sanitizeContentPath(meta._file, {
            dir: documentationContentDir,
            extension: "json",
          }),
          locale: getLocaleFromFilePath(meta._file, {
            extension: "json",
            defaultLocale,
          }),
          data: meta.items,
        })),
        locale: locale.value,
      });

      const page = (
        await queryContent<DocumentationPageFields>(documentationContentDir)
          .where({
            _file: {
              $regex: new RegExp(
                `^${documentationContentDir}\\/${
                  activePath.value
                    ? `(${activePath.value}|${`${activePath.value}/index`})`
                    : "index"
                }(\\.[a-zA-Z\\-]{2,5}){0,1}\\.md$`,
              ),
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

      return {
        page,
        contentStructure,
      };
    },
    {
      watch: [locale, activePath],
    },
  );

  const page = computed(() => data.value?.page);
  const contentStructure = computed(() => data.value?.contentStructure);
  const toc = computed(() => page.value?.body?.toc?.links ?? []);

  if (!page.value) {
    throw createError({ statusCode: 404 });
  }

  // SEO
  useContentHead(page.value);
</script>

<template>
  <div class="pb-16 pt-32" v-if="page">
    <div class="container">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-[200px_auto]">
        <div>
          <MarketingContentMenu
            v-if="contentStructure"
            :items="contentStructure"
            :activePath="activePath"
          />
        </div>

        <div class="flex-1 pb-8">
          <h1 class="text-4xl font-bold">{{ page.title }}</h1>
          <p v-if="page.subtitle" class="mt-3 text-2xl text-foreground/60">
            {{ page.subtitle }}
          </p>

          <div class="mt-6 flex flex-col gap-6 lg:flex-row-reverse">
            <MarketingContentTableOfContents v-if="toc.length" :items="toc" />

            <div class="flex-1">
              <ContentRendererMarkdown
                :value="page"
                class="prose dark:prose-invert"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
