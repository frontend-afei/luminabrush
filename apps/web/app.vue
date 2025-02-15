<script setup lang="ts">
  import { ConfigProvider } from "radix-vue";
  import { configure } from "vee-validate";

  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: false,
    validateOnModelUpdate: false,
  });

  const useIdFunction = () => useId();

  const titleTemplateDefault = "LuminaBrush";
  const titleDivider = "|";

  const i18nHead = useLocaleHead({
    addSeoAttributes: true,
  });

  const { init } = useAnalytics();

  // You might want to display a consent banner before initializing analytics
  init();

  const route = useRoute();

  useHead({
    // general seo
    titleTemplate: (title: any) => {
      if (route.path === "/") {
        return title;
      }
      return `${title} ${titleDivider} ${titleTemplateDefault}`;
    },

    // i18n
    htmlAttrs: {
      lang: i18nHead.value.htmlAttrs!.lang,
    },
    link: [...(i18nHead.value.link || [])],
    meta: [...(i18nHead.value.meta || [])],
  });
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <GradientBackgroundWrapper>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <Toaster />
      <NuxtLoadingIndicator color="var(--colors-primary)" />
    </GradientBackgroundWrapper>
  </ConfigProvider>
</template>
