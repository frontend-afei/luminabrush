import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import typographyPlugin from '@tailwindcss/typography'
import themerPlugin from 'tailwindcss-themer'

export const themeConfig = {
  defaultTheme: {
    extend: {
      colors: {
        primary: 'rgb(99 102 241)'
      }
    }
  },
  themes: [
    {
      name: 'theme-dark',
      extend: {
        colors: {
          primary: 'rgb(197 198 250)'
        }
      }
    }
  ]
}

export default <Partial<Config>>{
  plugins: [
    themerPlugin(themeConfig),
    typographyPlugin()
  ],

  darkMode: 'class',

  content: [
    './modules/**/*.vue'
  ],

  safelist: ['theme-dark'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif', ...defaultTheme.fontFamily.sans],
        serif: ['Manrope', 'serif', ...defaultTheme.fontFamily.sans],
      },
    }
  }
}
