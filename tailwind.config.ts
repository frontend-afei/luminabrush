import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import themerPlugin from 'tailwindcss-themer'

const colorsConfig = {
  colors: {
    primary: 'rgb(99 102 241)'
  }
}

export default <Partial<Config>>{
  plugins: [
    themerPlugin({
      defaultTheme: {
        extend: {
          colorsConfig
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
    })
  ],

  darkMode: 'class',

  safelist: ['theme-dark'],

  theme: {
    extend: {
      colorsConfig,
      fontFamily: {
        display: ['Manrope', ...defaultTheme.fontFamily.sans]
      }
    }
  }
}
