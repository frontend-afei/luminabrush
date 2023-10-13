<template>
	<DropdownMenuRadioGroup v-bind="{ ...$attrs, ...props }"><slot /></DropdownMenuRadioGroup>
</template>

<script setup lang="ts">
	import { DropdownMenuRadioGroup, type DropdownMenuRadioGroupProps } from 'radix-vue'
	const props = defineProps<DropdownMenuRadioGroupProps>()
</script>
