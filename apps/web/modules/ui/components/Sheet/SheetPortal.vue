<template>
	<DialogPortal v-bind="{ ...$attrs, ...props }"><slot /></DialogPortal>
</template>

<script setup lang="ts">
	import { DialogPortal, type DialogPortalProps } from 'radix-vue'
	const props = defineProps<DialogPortalProps>()
</script>
