<template>
	<DropdownMenuLabel
		v-bind="{
			...$attrs,
			...props,
			class: cn('px-3 py-2 text-sm font-semibold', inset ? 'pl-8' : '', props.class),
		}">
		<slot />
	</DropdownMenuLabel>
</template>

<script setup lang="ts">
	import { DropdownMenuLabel, type DropdownMenuLabelProps } from 'radix-vue'
	import { cn, type ClassValue } from '@/modules/ui/lib/utils'

	type Props = DropdownMenuLabelProps & {
		inset?: boolean
		class?: ClassValue
	}
	const props = defineProps<Props>()
</script>
