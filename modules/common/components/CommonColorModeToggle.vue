<template>
  <CommonButton v-bind="(api.triggerProps as any)" intent="primary-outline" size="small">
    <Icon :name="colorMode.value === 'dark' ? 'feather:moon' : 'feather:sun'" />
  </CommonButton>

  <div v-bind="api.positionerProps">
    <CommonMenu v-bind="api.contentProps">
      <CommonMenuItem
        v-for="option in colorModeOptions"
        :key="option.value"
        :icon="option.icon"
        v-bind="api.getOptionItemProps({ name: 'colorMode', type: 'radio', value: option.value })"
      >
        {{ option.label }}
      </CommonMenuItem>
    </CommonMenu>
  </div>
</template>

<script setup lang="ts">
import * as menu from '@zag-js/menu'
import { normalizeProps, useMachine } from '@zag-js/vue'

const { t } = useI18n()
const colorMode = useColorMode()

const [state, send] = useMachine(menu.machine({
  id: 'color-mode-toggle',
  'aria-label': t('common.colorMode.label'),
  value: { colorMode: colorMode.value },
  onValueChange: ({ value }) => {
    if (Array.isArray(value)) {
      value = value[0]
    }
    colorMode.preference = value
  },
  loop: true
}))
const api = computed(() => menu.connect(state.value, send, normalizeProps))

const colorModeOptions = computed(() => ([
  {
    value: 'system',
    label: t('common.colorMode.system'),
    icon: 'feather:hard-drive'
  },
  {
    value: 'light',
    label: t('common.colorMode.light'),
    icon: 'feather:sun'
  },
  {
    value: 'dark',
    label: t('common.colorMode.dark'),
    icon: 'feather:moon'
  }
]))
</script>
