<template>
	<Button asChild variant="outline" type="button">
		<a :href="providerPath">
			<Icon v-if="providerData.icon" :name="providerData.icon" class="mr-2 h-4 w-4 opacity-70" />
			{{ t('auth.continueWithProvider', { provider: providerData.name }) }}
		</a>
	</Button>
</template>

<script setup lang="ts">
	import { joinURL } from 'ufo'

	const { t } = useTranslations()

	const providers = {
		google: {
			name: 'Google',
			icon: 'google' as const,
		},
		apple: {
			name: 'Apple',
			icon: 'apple' as const,
		},
		github: {
			name: 'Github',
			icon: 'github' as const,
		},
		twitter: {
			name: 'Twitter',
			icon: 'twitter' as const,
		},
	}

	const props = defineProps<{
		provider: string
	}>()

	const providerData = computed(() => {
		return providers[props.provider as keyof typeof providers]
	})

	const providerPath = computed(() => {
		return joinURL(`/api/oauth/${props.provider}`)
	})
</script>
