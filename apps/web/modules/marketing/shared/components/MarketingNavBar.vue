<template>
	<nav class="bg-background/80 fixed left-0 top-0 z-20 w-full backdrop-blur-lg">
		<MarketingBanner />

		<div class="container">
			<div class="flex items-center justify-stretch gap-6 py-8">
				<div class="flex flex-1 justify-start">
					<NuxtLink :to="localePath('/')" class="block hover:no-underline active:no-underline">
						<Logo />
					</NuxtLink>
				</div>

				<div class="hidden flex-1 items-center justify-center md:flex">
					<NuxtLink v-for="menuItem of menuItems" :key="menuItem.to" :to="menuItem.to" class="block px-3 py-2 text-lg">
						{{ menuItem.label }}
					</NuxtLink>
				</div>

				<div class="flex flex-1 items-center justify-end gap-3">
					<ColorModeToggle />
					<LocaleSwitch />

					<SheetRoot>
						<SheetTrigger asChild>
							<Button class="md:hidden" size="icon" variant="outline">
								<Icon name="menu" />
							</Button>
						</SheetTrigger>
						<SheetContent class="w-[250px]" side="right">
							<div class="flex flex-col items-start justify-center">
								<NuxtLink
									v-for="menuItem of menuItems"
									:key="menuItem.to"
									:to="menuItem.to"
									class="block px-3 py-2 text-lg">
									{{ menuItem.label }}
								</NuxtLink>

								<NuxtLink
									:to="localePath(hasUser ? '/team/redirect' : '/auth/login')"
									:prefetch="!hasUser"
									class="block px-3 py-2 text-lg">
									{{ hasUser ? t('common.menu.dashboard') : t('common.menu.login') }}
								</NuxtLink>
							</div>
						</SheetContent>
					</SheetRoot>

					<Button class="hidden md:block" asChild variant="ghost">
						<NuxtLink :to="localePath(hasUser ? '/team/redirect' : '/auth/login')" :prefetch="!hasUser">
							{{ hasUser ? t('common.menu.dashboard') : t('common.menu.login') }}
						</NuxtLink>
					</Button>
				</div>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
	const { t } = useTranslations()
	const localePath = useLocalePath()
	const { user, loaded: userLoaded } = useUser()

	const hasUser = computed(() => {
		return userLoaded.value && user.value
	})

	type MenuItem = {
		label: string
		to: string
	}
	const menuItems = computed<MenuItem[]>(() => [
		{
			label: t('common.menu.pricing'),
			to: localePath('/pricing'),
		},
		{
			label: t('common.menu.blog'),
			to: localePath('/blog'),
		},
	])
</script>
