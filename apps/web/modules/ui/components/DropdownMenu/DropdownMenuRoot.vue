<template>
	<DropdownMenuRoot v-bind="{ ...$attrs, ...props }"><slot /></DropdownMenuRoot>
</template>

<script setup lang="ts">
	import { DropdownMenuRoot, type DropdownMenuRootProps } from 'radix-vue'
	const props = defineProps<DropdownMenuRootProps>()
</script>
