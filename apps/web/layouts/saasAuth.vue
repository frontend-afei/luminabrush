<template>
	<div class="bg-muted text-foreground flex min-h-screen place-items-center">
		<div class="container">
			<div class="mx-auto grid w-full max-w-md gap-6">
				<div class="flex items-center justify-between">
					<NuxtLink :to="localePath('/')" class="block">
						<Logo />
					</NuxtLink>

					<div class="flex items-center justify-end gap-2">
						<LocaleSwitch />
						<ColorModeToggle />
					</div>
				</div>

				<Card class="p-8">
					<slot />
				</Card>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	const localePath = useLocalePath()
</script>
