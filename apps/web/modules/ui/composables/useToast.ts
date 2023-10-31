export type Toast = {
	id: string
	title?: string
	description?: string
	// TODO improve type, not possible because we cannot import from vue component here.
	variant: 'default' | 'loading' | 'error' | 'success'
	// TODO improve type, not possible because we cannot import from vue component here.
	icon?: string
	// TODO: missing `action`
}

export const useToast = () => {
	const toasts = useState<Toast[]>('toasts', () => [])

	const toast = (toast: Partial<Toast>) => {
		const body = {
			id: new Date().getTime().toString(),
			variant: toast.variant || 'default',
			...toast,
		}

		const index = toasts.value.findIndex((n: Toast) => n.id === body.id)
		if (index === -1) {
			toasts.value.push(body as Toast)
		}

		return body
	}

	const dismiss = (id: string) => {
		toasts.value = toasts.value.filter((n: Toast) => n.id !== id)
	}

	return {
		state: toasts,
		toast,
		dismiss,
	}
}
