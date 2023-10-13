<template>
	<DropdownMenuRoot>
		<DropdownMenuTrigger asChild>
			<Button variant="ghost" size="icon">
				<Icon name="language" class="h-4 w-4" />
			</Button>
		</DropdownMenuTrigger>

		<DropdownMenuContent>
			<DropdownMenuRadioGroup v-model="value">
				<DropdownMenuRadioItem
					v-for="locale of props.locales"
					:key="(locale as LocaleObject).code"
					:value="(locale as LocaleObject).code">
					{{ (locale as LocaleObject).name }}
				</DropdownMenuRadioItem>
			</DropdownMenuRadioGroup>
		</DropdownMenuContent>
	</DropdownMenuRoot>
</template>

<script setup lang="ts">
	import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

	const props = defineProps<{
		locales: (LocaleObject | string)[]
	}>()

	const { locale } = useI18n()
	const switchLocalePath = useSwitchLocalePath()

	const value = ref(locale.value)
	watch(value, newLocale => {
		navigateTo(switchLocalePath(newLocale))
	})
</script>
