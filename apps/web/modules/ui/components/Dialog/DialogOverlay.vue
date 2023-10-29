<template>
	<DialogOverlay
		v-bind="{
			...$attrs,
			...props,
			class: cn(
				'bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 backdrop-blur-sm',
				props.class
			),
		}">
		<slot />
	</DialogOverlay>
</template>

<script setup lang="ts">
	import { DialogOverlay, type DialogOverlayProps } from 'radix-vue'
	import { cn, type ClassValue } from '@/modules/ui/lib/utils'

	type Props = DialogOverlayProps & {
		class?: ClassValue
	}
	const props = defineProps<Props>()
</script>
