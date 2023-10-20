import type { ApiOutput } from 'api/modules/trpc/router'
// import type { TeamMemberRole } from 'database'

// @TODO
type TeamMemberRole = any

type User = ApiOutput['auth']['user']

const authBroadcastChannel = new BroadcastChannel('auth')
type AuthEvent = {
	type: 'loaded' | 'logout'
	user: User | null
}

export const useUser = ({ initialUser, teamRole }: { initialUser: User; teamRole?: TeamMemberRole }) => {
	const { apiCaller } = useApiCaller()
	const localePath = useLocalePath()

	const loaded = useState('useUser-loaded', () => !!initialUser)
	const user = useState('useUser-user', () => initialUser)

	const userQuery = computed(() => {
		if (!initialUser) return null
		return apiCaller.auth.user.useQuery()
	})

	onMounted(async () => {
		const userQueryRes = await userQuery.value

		watch(
			() => userQueryRes?.data,
			newVal => {
				user.value = newVal?.value || null
			}
		)

		watch(
			() => userQueryRes?.status,
			newVal => {
				if (newVal?.value === 'success') {
					loaded.value = true
				}
			}
		)
	})

	watchEffect(() => {
		if (user.value && loaded.value) {
			authBroadcastChannel.postMessage({
				type: 'loaded',
				user: user,
			})
		}
	})

	const handleAuthEvent = async (event: MessageEvent<AuthEvent>) => {
		if (JSON.stringify(event.data.user) !== JSON.stringify(user)) {
			if (event.data.type === 'logout') {
				user.value = null
				navigateTo(localePath('/'))
			} else {
				user.value = event.data.user
			}
		}
	}

	watch(user, () => {
		authBroadcastChannel.addEventListener('message', handleAuthEvent)
	})

	onUnmounted(() => {
		authBroadcastChannel.removeEventListener('message', handleAuthEvent)
	})

	const logoutMutation = apiCaller.auth.logout.mutate

	const reloadUser = async () => {
		await userQuery.value?.refresh()
	}

	const logout = async () => {
		await logoutMutation()
		user.value = null

		authBroadcastChannel.postMessage({
			type: 'logout',
			user: null,
		} satisfies AuthEvent)

		navigateTo(localePath('/'))
	}

	return {
		user,
		loaded,
		teamRole: computed(() => teamRole),
		logout,
		reloadUser,
	}
}
