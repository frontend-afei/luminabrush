<template>
	<DropdownMenuRadioGroup v-model="$colorMode.preference">
		<DropdownMenuRadioItem v-for="option of colorModeOptions" :key="option.value" :value="option.value">
			<Icon :name="option.iconName" class="mr-2 h-4 w-4 opacity-50" /> {{ option.label }}
		</DropdownMenuRadioItem>
	</DropdownMenuRadioGroup>
</template>

<script lang="ts" setup>
	// @TODO improve icon name types
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
