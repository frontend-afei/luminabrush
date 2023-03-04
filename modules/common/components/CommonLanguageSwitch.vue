<template>
  <CommonButton v-bind="(api.triggerProps as any)" intent="primary-outline" size="small">
    <Icon name="feather:globe" />
  </CommonButton>

  <div v-bind="api.positionerProps">
    <CommonMenu v-bind="api.contentProps">
      <CommonMenuItem
        v-for="option in languageOptions"
        :key="option.value"
        v-bind="api.getOptionItemProps({ name: 'locale', type: 'radio', value: option.value })"
      >
        {{ option.label }}
      </CommonMenuItem>
    </CommonMenu>
  </div>
</template>

<script setup lang="ts">
import * as menu from '@zag-js/menu'
import { normalizeProps, useMachine } from '@zag-js/vue'

const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const [state, send] = useMachine(menu.machine({
  id: 'language-switch',
  'aria-label': t('common.i18n.switchLabel'),
  value: { locale: locale.value },
  onValueChange: ({ value }) => {
    if (Array.isArray(value)) {
      value = value[0]
    }

    // Switch locale
    locale.value = value

    // Switch locale path
    const newPath = switchLocalePath(value)
    navigateTo(newPath, { replace: true })
  },
  loop: true
}))
const api = computed(() => menu.connect(state.value, send, normalizeProps))

const languageOptions = computed(() => {
  return locales.value.map((locale) => {
    if (typeof locale === 'string') {
      return {
        value: locale,
        label: locale
      }
    }
    return {
      value: locale.code,
      label: locale.name
    }
  })
})
</script>
