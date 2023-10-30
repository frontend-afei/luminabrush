<template>
	<div v-if="userLoaded" class="bg-muted min-h-screen">
		<SaasNavBar />

		<main>
			<slot />
		</main>
	</div>

	<SaasLoadingWrapper v-else />
</template>

<script setup lang="ts">
	const localePath = useLocalePath()
	const { user, loaded: userLoaded } = useUser()

	watchEffect(() => {
		if (userLoaded.value) {
			if (!user.value) {
				return navigateTo(localePath('/auth/login'))
			}
		}
	})
</script>
