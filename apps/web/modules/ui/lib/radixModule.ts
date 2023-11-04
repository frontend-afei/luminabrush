import { addComponent, defineNuxtModule } from '@nuxt/kit'

/**
 * These components will be auto-imported directly from radix-vue.
 */
const componentList = [
	/* Dialog */
	'DialogRoot',
	'DialogPortal',
	'DialogTrigger',

	/** DropdownMenu */
	'DropdownMenuRoot',
	'DropdownMenuPortal',
	'DropdownMenuTrigger',
	'DropdownMenuGroup',
	'DropdownMenuRadioGroup',
	'DropdownMenuSub',

	/** Select */
	// TODO these 3 somehow don't work. others do. see `SaasInviteMemberForm.vue` for usage.
	'SelectRoot',
	'SelectGroup',
	'SelectValue',

	/** Tabs */
	'TabsRoot',

	/** Toast */
	'ToastProvider',
]

/**
 * This is an internal nuxt module that imports certain radix components.
 * If you want to define an override to them, add a new file (e.g. `DialogRoot`) to `modules/ui/components/Dialog`
 * and remove it from this list of auto imports.
 * @see https://github.com/radix-vue/radix-vue/blob/main/packages/plugins/src/nuxt/index.ts
 */
export default defineNuxtModule({
	setup() {
		for (const component of componentList) {
			addComponent({
				name: component,
				export: component,
				filePath: 'radix-vue',
			})
		}
	},
})
