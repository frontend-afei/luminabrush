import type { Config } from 'tailwindcss'
import formsPlugin from '@tailwindcss/forms'

export default <Partial<Config>>{
  plugins: [formsPlugin({
    strategy: 'base'
  })]
}
