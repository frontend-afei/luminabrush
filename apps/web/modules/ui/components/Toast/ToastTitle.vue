<template>
	<ToastTitle v-bind="{ ...$attrs, ...props, class: cn('text-sm font-semibold [&+div]:text-xs', props.class) }">
		<slot />
	</ToastTitle>
</template>

<script setup lang="ts">
	import { ToastTitle, type ToastTitleProps } from 'radix-vue'
	import { cn, type ClassValue } from '@/modules/ui/lib/utils'

	type Props = ToastTitleProps & {
		class?: ClassValue
	}
	const props = defineProps<Props>()
</script>
