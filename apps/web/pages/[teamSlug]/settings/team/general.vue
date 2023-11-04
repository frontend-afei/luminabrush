<template>
	<div v-if="team" class="grid gap-6">
		<SaasChangeTeamNameForm :initialValue="team.name" :teamId="team.id" />
	</div>
</template>

<script setup lang="ts">
	definePageMeta({
		layout: 'saas-app',
	})

	const route = useRoute('teamSlug-settings-team-general___en')
	const { t } = useTranslations()
	const localePath = useLocalePath()
	const { apiCaller } = useApiCaller()

	useSeoMeta({
		title: t('settings.team.title'),
	})

	const {
		data: team,
		pending,
		error,
	} = await apiCaller.team.bySlug.useQuery({
		slug: route.params.teamSlug,
	})

	watchEffect(() => {
		if (!pending.value && (!team.value || error.value)) {
			navigateTo(localePath('/auth/login'))
		}
	})
</script>
