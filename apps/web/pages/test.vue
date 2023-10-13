<template>
	<div class="container">
		<h2 class="my-4 text-xl">i18n:</h2>
		<p>
			Locale: <strong>{{ locale }}</strong>
		</p>
		<p>{{ t('blog.title') }}</p>

		<br /><br />

		<h2 class="my-4 text-xl">color mode:</h2>
		<p>{{ colorMode.preference }}</p>
	</div>
</template>

<script setup lang="ts">
	const { t, locale } = useTranslations()
	const colorMode = useColorMode()
</script>
