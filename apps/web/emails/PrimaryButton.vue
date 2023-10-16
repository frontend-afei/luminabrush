<template>
	<ERow>
		<EButton
			:px="20"
			:py="12"
			:href="props.href"
			:style="{ backgroundColor: colors.primary, color: colors.primaryForeground, borderRadius: '10px' }"
			v-bind="$attrs">
			<slot />
		</EButton>
	</ERow>
</template>

<script setup lang="ts">
	const props = defineProps<{
		href: string
	}>()

	defineOptions({
		inheritAttrs: false,
	})

	const colors = {
		primary: '#5871bb',
		primaryForeground: '#ffffff',
	}
</script>
