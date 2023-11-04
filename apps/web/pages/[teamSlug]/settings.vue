<template>
	<div v-if="selectedTeamMembership" class="container max-w-6xl py-8">
		<div class="align-start flex flex-col gap-8 md:flex-row">
			<div class="w-full md:max-w-[200px]">
				<SaasSettingsMenu :menuItems="menuItems" />
			</div>

			<div class="flex-1">
				<Suspense>
					<template #fallback>
						<!-- Loading template -->
						<div class="flex items-center justify-center py-8">
							<Icon name="spinner" class="text-primary-400 h-4 w-4 animate-spin text-3xl" />
						</div>
					</template>

					<!-- Nested route -->
					<NuxtPage />
				</Suspense>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { SaasSettingsMenuItemGroup } from '@/modules/saas/settings/components/SaasSettingsMenuGroup.vue'

	const router = useRouter()
	const { selectedTeamMembership } = useUser()
	const { t } = useTranslations()

	const menuItems = computed<SaasSettingsMenuItemGroup[]>(() => {
		const activeTeam = selectedTeamMembership.value?.team
		if (!activeTeam) return []

		return [
			{
				title: t('settings.menu.team.title'),
				avatar: 'team',
				items: [
					{
						title: t('settings.menu.team.general'),
						to: router.resolve({
							name: 'teamSlug-settings-team-general___en',
							params: {
								teamSlug: activeTeam.slug,
							},
						}).path,
					},
					// @TODO missing:
					// members
					// billing
				],
			},
			{
				title: t('settings.menu.account.title'),
				avatar: 'user',
				items: [
					{
						title: t('settings.menu.account.general'),
						to: router.resolve({
							name: 'teamSlug-settings-account-general___en',
							params: {
								teamSlug: activeTeam.slug,
							},
						}).path,
					},
				],
			},
		]
	})
</script>
