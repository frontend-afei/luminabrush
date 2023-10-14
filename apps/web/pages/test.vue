<template>
	<div class="container">
		<pre>
			{{ res }}
		</pre
		>
	</div>
</template>

<script setup lang="ts">
	const { apiCaller } = useApiCaller()
	const res = await apiCaller.newsletter.signup.mutate({
		email: 'example@exampl.com',
	})

	definePageMeta({
		layout: 'marketing',
	})
</script>
