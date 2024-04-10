<script setup lang="ts">
  import type { LocaleObject } from "@nuxtjs/i18n/dist/runtime/composables";

  const { locales, locale, setLocale } = useI18n();

  const localeModel = computed({
    get: () => locale.value,
    set: (locale) => setLocale(locale),
  });
</script>

<template>
  <DropdownMenuRadioGroup v-model="localeModel">
    <DropdownMenuRadioItem
      v-for="localeObj of locales"
      :key="(localeObj as LocaleObject).code"
      :value="(localeObj as LocaleObject).code"
    >
      {{ (localeObj as LocaleObject).name }}
    </DropdownMenuRadioItem>
  </DropdownMenuRadioGroup>
</template>
