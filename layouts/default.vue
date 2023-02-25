<template>
  <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir" :style="`color-scheme: ${colorModeValue}`">
    <Head>
      <template v-for="link in head.link" :key="link.id">
        <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
    <Body>
      <CommonLoadingIndicator />
      <CommonLayoutHeader />
      <div class="container mx-auto">
        <slot />
      </div>
    </Body>
  </Html>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()
const colorModeValue = computed(() => colorMode.value)

// i18n
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})
</script>
