<template>
	<div v-if="!pending" class="grid gap-6">
		<SaasChangeTeamNameForm v-if="team" :initialValue="team.name" :teamId="team.id" />
	</div>
	<SaasLoadingSpinner v-else />
</template>

<script setup lang="ts">
	definePageMeta({
		layout: 'saas-app',
	})

	const { t } = useTranslations()
	const localePath = useLocalePath()
	const { apiCaller } = useApiCaller()

	useSeoMeta({
		title: t('settings.team.title'),
	})

	const currentTeamId = useCurrentTeamIdCookie()

	if (!currentTeamId.value) {
		navigateTo(localePath('/auth/login'))
		throw new Error('Team not found')
	}

	const {
		data: team,
		pending,
		error,
	} = apiCaller.team.byId.useQuery({
		id: currentTeamId.value,
	})

	watchEffect(() => {
		if (!pending.value && (!team.value || error.value)) {
			navigateTo(localePath('/auth/login'))
		}
	})
</script>
