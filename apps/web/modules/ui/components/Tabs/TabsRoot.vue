<template>
	<TabsRoot v-bind="{ ...$attrs, ...props }"><slot /></TabsRoot>
</template>

<script setup lang="ts">
	import { TabsRoot, type TabsRootProps } from 'radix-vue'
	const props = defineProps<TabsRootProps>()
</script>
