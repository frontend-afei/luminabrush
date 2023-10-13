<template>
	<DropdownMenuPortal>
		<DropdownMenuContent
			v-bind="{
				...$attrs,
				...props,
				class: cn(
					'bg-popover text-popover-foreground z-50 min-w-[8rem] overflow-hidden rounded-md p-1 shadow-lg',
					'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
					props.class
				),
			}">
			<slot />
		</DropdownMenuContent>
	</DropdownMenuPortal>
</template>

<script setup lang="ts">
	import { DropdownMenuContent, type DropdownMenuContentProps } from 'radix-vue'
	import { cn, type ClassValue } from '@/modules/ui/lib/utils'

	type Props = DropdownMenuContentProps & {
		class?: ClassValue
	}
	const props = withDefaults(defineProps<Props>(), {
		sideOffset: 4,
	})
</script>
