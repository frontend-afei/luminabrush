<template>
  <select class="CommonLanguageSwitch text-right bg-transparent uppercase font-bold cursor-pointer" :value="locale" @change="handleLanguageChange">
    <option
      v-for="availableLocale of availableLocales"
      :key="availableLocale"
      :value="availableLocale"
      :selected="locale === availableLocale"
    >
      {{ availableLocale }}
    </option>
  </select>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.map((locale) => {
    if (typeof locale === 'string') {
      return locale
    }
    return locale.code
  })
})

const handleLanguageChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  const newValue = target.value

  // Switch locale
  locale.value = newValue

  // Switch locale path
  const newPath = switchLocalePath(newValue)
  navigateTo(newPath, { replace: true })
}
</script>
