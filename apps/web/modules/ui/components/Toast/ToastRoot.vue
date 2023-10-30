<template>
	<ToastRoot v-bind="{ ...$attrs, ...props, class: cn(toastVariants({ variant: props.variant, class: props.class })) }">
		<slot />
	</ToastRoot>
</template>

<script setup lang="ts">
	import { ToastRoot, type ToastRootProps } from 'radix-vue'
	import { cn, type ClassValue } from '@/modules/ui/lib/utils'
	import { type ToastVariantProps, toastVariants } from './toastUtils'

	defineOptions({
		inheritAttrs: false,
	})

	export type ToastProps = ToastRootProps & ToastVariantProps

	const props = withDefaults(
		defineProps<{
			class?: ClassValue
			variant?: ToastProps['variant']
		}>(),
		{
			variant: 'default',
		}
	)
</script>
