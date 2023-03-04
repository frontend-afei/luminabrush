import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'
import typographyPlugin from '@tailwindcss/typography'
import formsPlugin from '@tailwindcss/forms'

export default <Partial<Config>>{
  content: [
    './modules/**/*.vue'
  ],
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        md: '640px',
        lg: '1024px',
        xl: '1024px',
        '2xl': '1024px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif', ...defaultTheme.fontFamily.sans],
        serif: ['Manrope', 'serif', ...defaultTheme.fontFamily.serif]
      },
      colors: {
        primary: {
          ...colors.emerald
        }
      }
    }
  },

  plugins: [
    formsPlugin({
      strategy: 'base'
    }),
    typographyPlugin()
  ]

}
