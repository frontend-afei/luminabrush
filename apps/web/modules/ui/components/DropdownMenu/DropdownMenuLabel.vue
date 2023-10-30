<template>
	<DropdownMenuLabel
		v-bind="{
			...$attrs,
			...props,
			class: twMerge('px-3 py-2 text-sm font-semibold', inset ? 'pl-8' : '', props.class),
		}">
		<slot />
	</DropdownMenuLabel>
</template>

<script setup lang="ts">
	import { DropdownMenuLabel, type DropdownMenuLabelProps } from 'radix-vue'

	type Props = DropdownMenuLabelProps & {
		inset?: boolean
		class?: ClassProp
	}
	const props = defineProps<Props>()
</script>
