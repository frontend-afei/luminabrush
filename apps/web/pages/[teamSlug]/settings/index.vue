<template></template>

<script setup lang="ts">
	const router = useRouter()
	const localePath = useLocalePath()
	const { routeTeamSlug } = useUser()

	onMounted(() => {
		navigateTo(
			localePath(
				router.resolve({
					name: 'teamSlug-settings-team-general___en',
					params: {
						teamSlug: routeTeamSlug.value || '',
					},
				}).path
			)
		)
	})
</script>
