<template>
	<DropdownMenuGroup v-bind="{ ...$attrs, ...props }"><slot /></DropdownMenuGroup>
</template>

<script setup lang="ts">
	import { DropdownMenuGroup, type DropdownMenuGroupProps } from 'radix-vue'
	const props = defineProps<DropdownMenuGroupProps>()
</script>
