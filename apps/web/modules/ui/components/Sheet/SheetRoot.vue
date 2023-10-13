<template>
	<DialogRoot v-bind="{ ...$attrs, ...props }"><slot /></DialogRoot>
</template>

<script setup lang="ts">
	import { DialogRoot, type DialogRootProps } from 'radix-vue'
	const props = defineProps<DialogRootProps>()
</script>
