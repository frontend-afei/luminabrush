<template>
	<DropdownMenuRoot v-if="currentTeam">
		<DropdownMenuTrigger
			class="focus-visible:ring-ring focus-visible:border-primary -ml-2 flex w-full items-center justify-between rounded-md px-2 py-2 text-left outline-none focus-visible:ring-1">
			<div class="flex items-center justify-start gap-2 text-sm">
				<span class="hidden lg:block">
					<BoringAvatar :size="32" :name="currentTeam.name" variant="marble" />
				</span>
				<span class="block flex-1 truncate">{{ currentTeam.name }}</span>
				<Icon name="select" class="block h-4 w-4 opacity-50" />
			</div>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-full">
			<DropdownMenuRadioGroup v-model="activeTeamIdModel">
				<DropdownMenuRadioItem
					v-for="teamMembership of teamMemberships"
					:key="teamMembership.team.id"
					:value="teamMembership.team.id">
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

	<SaasCreateTeamDialog @success="newTeamId => switchTeam(newTeamId)" />
</template>

<script setup lang="ts">
	const { t } = useTranslations()
	const localePath = useLocalePath()
	const { teamMemberships, currentTeam } = useUser()
	const { switchTeam } = useSwitchTeam()
	const { createTeamDialogOpen } = useDashboardState()
	const runtimeConfig = useRuntimeConfig()

	const activeTeamIdModel = computed({
		get: () => currentTeam.value?.id,
		set: async newValue => {
			if (newValue) {
				switchTeam(newValue)
				await navigateTo(localePath(runtimeConfig.public.auth.redirectPath))
			}
		},
	})
</script>
