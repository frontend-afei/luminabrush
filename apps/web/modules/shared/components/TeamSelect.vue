<template>
	<div v-if="activeTeam">
		<DropdownMenuRoot>
			<DropdownMenuTrigger
				class="focus-visible:ring-ring focus-visible:border-primary -ml-2 flex w-full items-center justify-between rounded-md px-2 py-2 text-left outline-none focus-visible:ring-1">
				<div class="flex items-center justify-start gap-2 text-sm">
					<span class="hidden lg:block">
						<BoringAvatar :size="32" :name="activeTeam.name" variant="marble" />
					</span>
					<span class="block flex-1 truncate">{{ activeTeam.name }}</span>
					<Icon name="select" class="block h-4 w-4 opacity-50" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent class="w-full">
				<DropdownMenuRadioGroup v-model="activeTeamSlug">
					<DropdownMenuRadioItem
						v-for="teamMembership of teamMemberships"
						:key="teamMembership.team.slug"
						:value="teamMembership.team.slug">
						<div class="flex flex-1 items-center justify-start gap-2">
							<BoringAvatar :size="16" :name="teamMembership.team.name" variant="marble" />
							{{ teamMembership.team.name }}
						</div>
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuItem @click="() => (createTeamDialogOpen = true)">
						<Icon name="plus" class="mr-2 h-4 w-4" />
						{{ t('dashboard.sidebar.createTeam') }}
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenuRoot>

		<CreateTeamDialog @success="newSlug => switchTeam(newSlug, { refresh: true })" />
	</div>
</template>

<script setup lang="ts">
	const route = useRoute()
	const { t } = useTranslations()
	const { teamMemberships, selectedTeamMembership } = useUser()

	const { createTeamDialogOpen } = useDashboardState()

	const activeTeamSlug = computed({
		get: () => activeTeam.value?.slug,
		set: newValue => switchTeam(newValue),
	})

	const activeTeam = computed(() => {
		return selectedTeamMembership.value?.team
	})

	const teamSlugCookie = useCookie(TEAM_SLUG_COOKIE_NAME)

	const switchTeam = (slug: string | undefined, options: { refresh?: boolean } = {}) => {
		if (!activeTeam.value || !slug) return

		teamSlugCookie.value = slug
		navigateTo(route.path.replace(activeTeam.value.slug, slug), {
			external: !!options.refresh, // so that the page refreshes and user context is updated to include new team.
		})
	}
</script>
