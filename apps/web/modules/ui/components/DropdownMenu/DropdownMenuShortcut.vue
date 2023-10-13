<template>
	<span v-bind="{ ...props, ...$attrs, class: cn('ml-auto text-xs tracking-widest opacity-60', props.class) }" />
</template>

<script setup lang="ts">
	import { cn, type ClassValue } from '@/modules/ui/lib/utils'

	type Props = {
		class?: ClassValue
	}
	const props = defineProps<Props>()
</script>
