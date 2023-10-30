<template>
	<nav class="bg-muted w-full border-b">
		<div class="container max-w-6xl py-4">
			<div class="flex flex-wrap items-center justify-between gap-4">
				<div class="flex items-center gap-3">
					<NuxtLink :to="localePath('/')" class="block">
						<Logo :withLabel="false" />
					</NuxtLink>

					<span class="hidden opacity-30 lg:block">
						<Icon name="chevronRight" class="h-4 w-4" />
					</span>

					<TeamSelect />
				</div>

				<div class="ml-auto mr-0 flex items-center justify-end gap-4">
					<UserMenu />
				</div>
			</div>

			<ul
				class="no-scrollbar -mx-8 -mb-4 mt-6 flex list-none items-center justify-start gap-6 overflow-x-auto px-8 text-sm lg:text-base"></ul>
		</div>
	</nav>
</template>

<script setup lang="ts">
	const router = useRouter()
	const route = useRoute()
	const { locales } = useI18n()
	const { t } = useTranslations()
	const localePath = useLocalePath()
	const { user, loaded: userLoaded, routeTeamSlug } = useUser()

	type MenuItem = {
		label: string
		to: string
	}

	const menuItems = computed<MenuItem[]>(() => [
		{
			label: t('dashboard.menu.dashboard'),
			to: localePath(
				router.resolve({
					name: 'teamSlug-dashboard___en',
					params: {
						teamSlug: routeTeamSlug.value || '',
					},
				}).path
			),
		},
		// @todo missing menu items
	])

	const isActiveMenuItem = (href: string | null) => {
		return href && route.path.includes(href)
	}
</script>
