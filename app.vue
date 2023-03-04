<template>
  <div>
    <ColorScheme :name="undefined" :props="colorSchemeProps" class="haha">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ColorScheme>
  </div>
</template>

<script lang="ts" setup>
/** Workaround for https://github.com/nuxt-modules/color-mode/issues/168 */
const colorSchemeProps = ref<any>(undefined)
</script>
