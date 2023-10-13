<template>
	<DropdownMenuSeparator
		v-bind="{
			...$attrs,
			...props,
			class: cn('bg-border -mx-1 my-1 h-px', props.class),
		}">
		<slot />
	</DropdownMenuSeparator>
</template>

<script setup lang="ts">
	import { DropdownMenuSeparator, type DropdownMenuSeparatorProps } from 'radix-vue'
	import { cn, type ClassValue } from '@/modules/ui/lib/utils'

	type Props = DropdownMenuSeparatorProps & {
		class?: ClassValue
	}
	const props = defineProps<Props>()
</script>
