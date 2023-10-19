<template>
	<div :class="cn('flex flex-col space-y-1.5 p-6', props.class)">
		<slot />

		<h3 v-if="$slots.title" class="text-xl font-semibold leading-none">
			<slot name="title" />
		</h3>
	</div>
</template>

<script setup lang="ts">
	import { cn, type ClassValue } from '@/modules/ui/lib/utils'

	const props = defineProps<{
		class?: ClassValue
	}>()
</script>
