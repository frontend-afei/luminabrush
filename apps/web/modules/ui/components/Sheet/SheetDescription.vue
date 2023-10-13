<template>
	<DialogDescription v-bind="{ ...$attrs, ...props, class: cn('text-muted-foreground text-sm', props.class) }">
		<slot />
	</DialogDescription>
</template>

<script setup lang="ts">
	import { DialogDescription, type DialogDescriptionProps } from 'radix-vue'
	import { cn, type ClassValue } from '@/modules/ui/lib/utils'

	type Props = DialogDescriptionProps & {
		class?: ClassValue
	}
	const props = defineProps<Props>()
</script>
