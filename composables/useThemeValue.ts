import { themeConfig } from '@/tailwind.config'

const deepGet = (obj: Record<any, any>, path: string): string => {
  // @ts-ignore
  return path.split('.').reduce((p, c) => (p && p[c]) || null, obj)
}

export const useThemeValue = (path: string) => {
  const colorMode = useColorMode()

  return computed(() => {
    const value = deepGet(themeConfig.defaultTheme.extend, path)

    // Try to find the current theme's config
    const theme = themeConfig.themes.find(theme => theme.name === `theme-${colorMode.value}`)
    if (!theme?.extend) { return value }

    // Try to find the value in the current theme's config
    const themeValue = deepGet(theme.extend, path)

    return themeValue || value
  })
}
