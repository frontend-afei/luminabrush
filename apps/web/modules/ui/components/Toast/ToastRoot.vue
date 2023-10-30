<template>
	<ToastRoot
		v-bind="{ ...$attrs, ...props, class: twMerge(toastVariants({ variant: props.variant, class: props.class })) }">
		<slot />
	</ToastRoot>
</template>

<script setup lang="ts">
	import { ToastRoot, type ToastRootProps } from 'radix-vue'
	import { type ToastVariantProps, toastVariants } from './toastUtils'

	defineOptions({
		inheritAttrs: false,
	})

	export type ToastProps = ToastRootProps & ToastVariantProps

	const props = withDefaults(
		defineProps<{
			class?: ClassProp
			variant?: ToastProps['variant']
		}>(),
		{
			variant: 'default',
		}
	)
</script>
