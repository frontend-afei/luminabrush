<template>
	<SaasLoadingWrapper />
</template>

<script setup lang="ts">
	const localePath = useLocalePath()

	const { data } = await useFetch('/api/team/redirect')
	const redirectPath = computed(() => {
		return localePath(data.value?.redirectPath ?? '/')
	})

	navigateTo(redirectPath.value)
</script>
