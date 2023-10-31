import type { ApiOutput } from 'api/modules/trpc/router'
import { useBroadcastChannel } from '@vueuse/core'

type User = ApiOutput['auth']['user']
type AuthEvent = {
	type: 'loaded' | 'logout'
	user: User | null
}

export const useUser = ({ initialUser }: { initialUser?: User } = {}) => {
	const route = useRoute()
	const { apiCaller } = useApiCaller()
	const localePath = useLocalePath()

	const authBroadcastChannel = useBroadcastChannel<AuthEvent, AuthEvent>({ name: 'auth' })
	const postChannelMessage = (message: AuthEvent) => {
		const cleanupMessage = JSON.parse(JSON.stringify(message)) as AuthEvent
		authBroadcastChannel.post(cleanupMessage)
	}

	const loaded = useState('useUser-loaded', () => !!initialUser)
	const user = useState('useUser-user', () => initialUser)

	const routeTeamSlug = computed(() => {
		return 'teamSlug' in route.params ? route.params.teamSlug : null
	})

	const teamMemberships = computed(() => {
		return user.value?.teamMemberships ?? []
	})

	const selectedTeamMembership = computed(() => {
		return teamMemberships.value?.find(membership => {
			return membership.team.slug === routeTeamSlug.value
		})
	})

	const currentTeamRole = computed(() => {
		return selectedTeamMembership.value?.role ?? null
	})

	const loadUser = async () => {
		const userRes = await apiCaller.auth.user.query()
		user.value = userRes
		loaded.value = !!userRes
	}

	onMounted(async () => {
		if (initialUser) return
		// Load user if there is no initial user set.
		await loadUser()
	})

	watchEffect(() => {
		if (user.value && loaded.value) {
			postChannelMessage({
				type: 'loaded',
				user: user.value,
			})
		}
	})

	// Handle auth event
	watch(authBroadcastChannel.data, data => {
		if (JSON.stringify(data.user) !== JSON.stringify(user.value)) {
			if (data.type === 'logout') {
				user.value = null
				navigateTo(localePath('/'))
			} else {
				user.value = data.user
			}
		}
	})

	const reloadUser = async () => {
		await loadUser()
	}

	const logout = async () => {
		await apiCaller.auth.logout.mutate()
		user.value = null

		postChannelMessage({
			type: 'logout',
			user: null,
		})

		navigateTo(localePath('/'))
	}

	return {
		user,
		loaded,
		teamMemberships,
		selectedTeamMembership,
		currentTeamRole,
		routeTeamSlug,
		logout,
		reloadUser,
	}
}
