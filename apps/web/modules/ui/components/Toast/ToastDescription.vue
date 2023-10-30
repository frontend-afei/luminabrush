<template>
	<ToastDescription v-bind="{ ...$attrs, ...props, class: cn('text-sm opacity-90', props.class) }">
		<slot />
	</ToastDescription>
</template>

<script setup lang="ts">
	import { ToastDescription, type ToastDescriptionProps } from 'radix-vue'
	import { cn, type ClassValue } from '@/modules/ui/lib/utils'

	type Props = ToastDescriptionProps & {
		class?: ClassValue
	}
	const props = defineProps<Props>()
</script>
