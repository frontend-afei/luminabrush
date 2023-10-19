<template>
	<div :class="cn('bg-card text-card-foreground rounded-lg shadow', props.class)">
		<slot />
	</div>
</template>

<script setup lang="ts">
	import { cn, type ClassValue } from '@/modules/ui/lib/utils'

	const props = defineProps<{
		class?: ClassValue
	}>()
</script>
