export const useSwitchTeam = () => {
	const route = useRoute()
	const { selectedTeamMembership } = useUser()
	const { teamSlugCookie } = useTeamSlugCookie()

	const activeTeam = computed(() => {
		return selectedTeamMembership.value?.team
	})

	const switchTeam = (slug: string | undefined, options: { refresh?: boolean } = {}) => {
		if (!activeTeam.value || !slug) return

		teamSlugCookie.value = slug
		navigateTo(route.path.replace(activeTeam.value.slug, slug), {
			external: !!options.refresh, // so that the page refreshes and user context is updated to include new team.
		})
	}

	return {
		switchTeam,
	}
}
