<script lang="ts" setup>
  import type { MarketingBlogPageFields } from "@/modules/marketing/blog/types";
  import { joinURL } from "ufo";

  definePageMeta({
    layout: "marketing",
  });

  const route = useRoute("blog-path");
  const runtimeConfig = useRuntimeConfig();
  const { formatDate } = useLocaleDate();
  const { locale, defaultLocale } = useI18n();

  const { data: post } = await useAsyncData(
    route.path,
    async () => {
      const localeExtensionPattern = /(\.[a-zA-Z\\-]{2,5})+\.md$/;
      try {
        return await queryContent<MarketingBlogPageFields>(
          `blog/${route.params.path}`,
        )
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
          .findOne();
      } catch {
        await navigateTo("/blog");
        return null;
      }
    },
    {
      watch: [locale],
    },
  );
  if (!post.value) {
    await navigateTo("/blog");
    throw new Error("Post not found");
  }

  // SEO
  useContentHead(post.value);

  // Override the `ogImage` field. It is already set by `useContentHead` above, but without the base url.
  useSeoMeta({
    ogImage: post.value.image?.src
      ? joinURL(runtimeConfig.public.siteUrl, post.value.image.src)
      : undefined,
  });
</script>

<template>
  <ContentRenderer v-if="post" :value="post">
    <div class="container max-w-6xl pb-24">
      <div class="mx-auto max-w-2xl">
        <div class="mb-12">
          <NuxtLinkLocale to="/blog">
            &larr; {{ $t("blog.backLabel") }}
          </NuxtLinkLocale>
        </div>

        <h1 class="text-4xl font-bold">{{ post.title }}</h1>

        <div class="mt-4 flex items-center justify-start gap-6">
          <div v-if="post.authorName" class="flex items-center">
            <div
              v-if="post.authorImage"
              class="relative mr-2 size-8 overflow-hidden rounded-full"
            >
              <NuxtImg
                :src="post.authorImage"
                :alt="post.authorName"
                sizes="96px"
                class="object-cover object-center"
              />
            </div>
            <div>
              <p class="text-sm font-semibold opacity-50">
                {{ post.authorName }}
              </p>
            </div>
          </div>

          <div v-if="post.date" class="ml-auto mr-0">
            <p class="text-sm opacity-30">
              {{ formatDate({ date: new Date(post.date) }) }}
            </p>
          </div>

          <div v-if="post.tags?.length" class="flex flex-1 flex-wrap gap-2">
            <span
              v-for="tag of post.tags"
              :key="tag"
              class="text-xs font-semibold uppercase tracking-wider text-primary"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>

      <div
        v-if="post.image?.src"
        class="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl"
      >
        <NuxtImg
          :src="post.image.src"
          :alt="post.title"
          sizes="100vw md:50vw lg:1200px"
          width="1920"
          height="1080"
          class="size-full object-cover object-center"
        />
      </div>

      <ContentRendererMarkdown
        :value="post"
        class="prose mx-auto mt-6 max-w-2xl dark:prose-invert"
      />
    </div>
  </ContentRenderer>
</template>
