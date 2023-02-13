import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import formsPlugin from '@tailwindcss/forms'

export default <Partial<Config>>{
  plugins: [formsPlugin({
    strategy: 'base'
  })],

  theme: {
    extend: {
      fontFamily: {
        display: ['Manrope', ...defaultTheme.fontFamily.sans]
      }
    }
  }
}
