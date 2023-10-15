<template>
	<div class="container">
		<Button @click="() => handleTest()"> Send Test</Button>
	</div>
</template>

<script setup lang="ts">
	const { apiCaller } = useApiCaller()

	const handleTest = async () => {
		await apiCaller.newsletter.signup.mutate({
			email: 'hello@madebyfabian.com',
		})
	}

	definePageMeta({
		layout: 'marketing',
	})
</script>
