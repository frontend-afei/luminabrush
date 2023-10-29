import { addComponent, defineNuxtModule } from '@nuxt/kit'

import type {} from '@nuxt/schema' // workaround for TS bug with "phantom" deps

export interface ModuleOptions {
	prefix: string
}

/**
 * These components will be auto-imported directly from radix-vue.
 */
const componentList = [
	/* Dialog */
	'DialogRoot',
	'DialogPortal',
	'DialogTrigger',
]

/**
 * This is an internal nuxt module that imports certain radix components.
 * If you want to define an override to them, add a new file (e.g. `DialogRoot`) to `modules/ui/components/Dialog`
 * and remove it from this list of auto imports.
 * @see https://github.com/radix-vue/radix-vue/blob/main/packages/plugins/src/nuxt/index.ts
 */
export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'radixModule',
		configKey: 'radixModule',
		compatibility: {
			nuxt: '^3.0.0',
		},
	},
	defaults: {
		prefix: '',
	},
	setup(options) {
		for (const component of componentList) {
			addComponent({
				name: `${options.prefix}${component}`,
				export: component,
				filePath: 'radix-vue',
			})
		}
	},
})
