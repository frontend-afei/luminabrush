<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
		<Toaster />
	</div>
</template>

<script setup lang="ts">
	const titleTemplateDefault = 'supastarter.nuxt - Application'
	const titleDivider = '|'

	const i18nHead = useLocaleHead({
		addSeoAttributes: true,
	})

	useHead({
		// general seo
		titleTemplate: title => (title ? `${title} ${titleDivider} ${titleTemplateDefault}` : titleTemplateDefault),

		// i18n
		htmlAttrs: {
			lang: i18nHead.value.htmlAttrs!.lang,
		},
		link: [...(i18nHead.value.link || [])],
		meta: [...(i18nHead.value.meta || [])],
	})
</script>
