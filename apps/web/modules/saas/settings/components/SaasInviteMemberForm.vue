<template>
	<Card v-if="currentTeamRole === 'OWNER'">
		<form @submit.prevent="onSubmit" class="@container">
			<CardHeader>
				<template #title>{{ t('settings.team.members.inviteMember.title') }}</template>
			</CardHeader>

			<CardContent>
				<div class="@md:flex-row flex flex-col gap-2">
					<div class="flex-1">
						<FormLabel for="email" required>
							{{ t('settings.team.members.inviteMember.email') }}
						</FormLabel>
						<Input v-bind="email" type="email" id="email" required />
					</div>

					<div>
						<FormLabel for="role" required>
							{{ t('settings.team.members.inviteMember.role') }}
						</FormLabel>
						<SelectRoot v-model="roleValue">
							<SelectTrigger class="w-[180px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem v-for="option of roleOptions" :key="option.value" :value="option.value">
									{{ option.label }}
								</SelectItem>
							</SelectContent>
						</SelectRoot>
					</div>
				</div>

				<div class="mt-6 flex justify-end border-t pt-3">
					<Button type="submit" :disabled="isSubmitDisabled" :loading="isSubmitting">
						{{ t('settings.team.members.inviteMember.submit') }}
					</Button>
				</div>
			</CardContent>
		</form>
	</Card>
</template>

<script setup lang="ts">
	const props = defineProps<{
		teamId: string
	}>()

	const emit = defineEmits<{
		success: []
	}>()

	const { t } = useTranslations()
	const { apiCaller } = useApiCaller()
	const { toast } = useToast()
	const { currentTeamRole } = useUser()

	const { z, toTypedSchema, useForm } = formUtils

	const roleValues = ['MEMBER', 'OWNER'] as const

	const formSchema = toTypedSchema(
		z.object({
			email: z.string().email(),
			role: z.enum(roleValues),
		})
	)

	const roleOptions = computed<{ label: string; value: (typeof roleValues)[number] }[]>(() => [
		{
			label: t('settings.team.members.roles.member'),
			value: 'MEMBER',
		},
		{
			label: t('settings.team.members.roles.owner'),
			value: 'OWNER',
		},
	])

	const { defineInputBinds, defineComponentBinds, handleSubmit, setValues, isSubmitting, useFieldModel, resetForm } =
		useForm({
			validationSchema: formSchema,
			initialValues: {
				email: '',
				role: 'MEMBER',
			},
		})

	const email = defineInputBinds('email')
	const roleValue = useFieldModel('role')

	const isSubmitDisabled = computed(() => {
		return !email.value
	})

	const onSubmit = handleSubmit(async values => {
		try {
			await apiCaller.team.inviteMember.mutate({
				...values,
				teamId: props.teamId,
			})

			resetForm()
			toast({
				title: t('settings.team.members.inviteMember.notifications.success.title'),
				description: t('settings.team.members.inviteMember.notifications.success.description'),
				variant: 'success',
			})
			emit('success')
		} catch (error) {
			toast({
				title: t('settings.team.members.inviteMember.notifications.error.title'),
				description: t('settings.team.members.inviteMember.notifications.error.description'),
				variant: 'error',
			})
		}
	})
</script>
