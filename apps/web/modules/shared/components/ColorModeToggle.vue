<template>
	<DropdownMenuRoot>
		<DropdownMenuTrigger asChild>
			<Button variant="ghost" size="icon">
				<Icon v-if="resolvedValue === 'light'" name="lightMode" class="h-4 w-4" />
				<Icon v-else name="darkMode" class="h-4 w-4" />
			</Button>
		</DropdownMenuTrigger>

		<DropdownMenuContent>
			<DropdownMenuRadioGroup v-model="$colorMode.preference">
				<DropdownMenuRadioItem v-for="option of colorModeOptions" :key="option.value" :value="option.value">
					<Icon :name="option.iconName" class="mr-2 h-4 w-4 opacity-50" /> {{ option.label }}
				</DropdownMenuRadioItem>
			</DropdownMenuRadioGroup>
		</DropdownMenuContent>
	</DropdownMenuRoot>
</template>

<script setup lang="ts">
	const { value: resolvedValue } = useColorMode()

	const colorModeOptions = [
		{
			value: 'system',
			label: 'System',
			iconName: 'system' as const,
		},
		{
			value: 'light',
			label: 'Light',
			iconName: 'lightMode' as const,
		},
		{
			value: 'dark',
			label: 'Dark',
			iconName: 'darkMode' as const,
		},
	]
</script>
