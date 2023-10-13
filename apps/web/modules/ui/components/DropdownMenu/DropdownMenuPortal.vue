<template>
	<DropdownMenuPortal v-bind="{ ...$attrs, ...props }"><slot /></DropdownMenuPortal>
</template>

<script setup lang="ts">
	import { DropdownMenuPortal, type DropdownMenuPortalProps } from 'radix-vue'
	const props = defineProps<DropdownMenuPortalProps>()
</script>
