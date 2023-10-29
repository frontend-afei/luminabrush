<template>
	<div :class="cn('flex flex-col space-y-1.5 text-center sm:text-left', props.class)">
		<slot />
	</div>
</template>

<script setup lang="ts">
	import { cn, type ClassValue } from '@/modules/ui/lib/utils'
	const props = defineProps<{
		class?: ClassValue
	}>()
</script>
