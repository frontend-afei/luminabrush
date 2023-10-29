<template>
	<DialogTitle
		v-bind="{ ...$attrs, ...props, class: cn('text-lg font-semibold leading-none tracking-tight', props.class) }">
		<slot />
	</DialogTitle>
</template>

<script setup lang="ts">
	import { DialogTitle, type DialogTitleProps } from 'radix-vue'
	import { cn, type ClassValue } from '@/modules/ui/lib/utils'

	type Props = DialogTitleProps & {
		class?: ClassValue
	}
	const props = defineProps<Props>()
</script>
