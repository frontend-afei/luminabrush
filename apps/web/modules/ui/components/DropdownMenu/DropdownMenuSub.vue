<template>
	<DropdownMenuSub v-bind="{ ...$attrs, ...props }"><slot /></DropdownMenuSub>
</template>

<script setup lang="ts">
	import { DropdownMenuSub, type DropdownMenuSubProps } from 'radix-vue'
	const props = defineProps<DropdownMenuSubProps>()
</script>
