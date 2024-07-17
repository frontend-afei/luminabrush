<script setup lang="ts">
  import type { TeamMemberRoleType } from "database";
  import { z } from "zod";
  import { useToast } from "@/modules/ui/components/toast";

  const props = defineProps<{
    teamId: string;
  }>();

  const emit = defineEmits<{
    success: [];
  }>();

  const { t } = useTranslations();
  const { apiCaller } = useApiCaller();
  const { toast } = useToast();
  const { teamRole } = useUser();

  const roleValues: [TeamMemberRoleType, TeamMemberRoleType] = [
    "MEMBER",
    "OWNER",
  ];

  const formSchema = toTypedSchema(
    z.object({
      email: z.string().email(),
      role: z.enum(roleValues),
    }),
  );

  const { handleSubmit, isSubmitting, meta, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: {
      email: "",
      role: "MEMBER",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await apiCaller.team.inviteMember.mutate({
        ...values,
        teamId: props.teamId,
      });

      resetForm();
      toast({
        title: t(
          "settings.team.members.inviteMember.notifications.success.title",
        ),
        description: t(
          "settings.team.members.inviteMember.notifications.success.description",
        ),
        variant: "success",
      });
      emit("success");
    } catch (error) {
      toast({
        title: t(
          "settings.team.members.inviteMember.notifications.error.title",
        ),
        description: t(
          "settings.team.members.inviteMember.notifications.error.description",
        ),
        variant: "error",
      });
    }
  });
</script>

<template>
  <Card v-if="teamRole === 'OWNER'">
    <form @submit="onSubmit" class="@container">
      <CardHeader>
        <CardTitle>
          {{ t("settings.team.members.inviteMember.title") }}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div class="flex flex-col gap-2 @md:flex-row">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel for="name" required>
                {{ $t("settings.team.members.inviteMember.email") }}
              </FormLabel>
              <FormControl>
                <Input v-bind="componentField" autocomplete="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="role">
            <FormItem>
              <FormLabel for="role" required>
                {{ $t("settings.team.members.inviteMember.role") }}
              </FormLabel>
              <SaasTeamRoleSelect v-bind="componentField" />
            </FormItem>
          </FormField>
        </div>

        <div class="mt-6 flex justify-end border-t pt-3">
          <Button
            type="submit"
            :disabled="!meta.dirty || !meta.valid"
            :loading="isSubmitting"
          >
            {{ $t("settings.team.members.inviteMember.submit") }}
          </Button>
        </div>
      </CardContent>
    </form>
  </Card>
</template>
