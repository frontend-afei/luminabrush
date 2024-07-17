<script setup lang="ts">
  import { z } from "zod";
  import { useToast } from "@/modules/ui/components/toast";

  const props = defineProps<{
    initialValue: string;
    teamId: string;
  }>();

  const { t } = useTranslations();
  const { apiCaller } = useApiCaller();
  const { toast } = useToast();
  const { reloadUser } = useUser();

  const formSchema = toTypedSchema(
    z.object({
      name: z.string().min(3),
    }),
  );

  const { handleSubmit, isSubmitting, meta } = useForm({
    validationSchema: formSchema,
    initialValues: {
      name: props.initialValue || "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await apiCaller.team.update.mutate({
        name: values.name,
        id: props.teamId,
      });

      toast({
        variant: "success",
        title: t("settings.notifications.teamNameUpdated"),
      });

      reloadUser();
    } catch (error) {
      toast({
        variant: "error",
        title: t("settings.notifications.teamNameNotUpdated"),
      });
    }
  });
</script>

<template>
  <SaasActionBlock
    @submit="onSubmit"
    :isSubmitting="isSubmitting"
    :isSubmitDisabled="!meta.valid || !meta.dirty"
  >
    <template #title>{{ $t("settings.team.changeName.title") }}</template>
    <div>
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <Input
            v-bind="componentField"
            type="text"
            :id="componentField.name"
            required
            autocomplete="name"
            class="max-w-sm"
          />
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
  </SaasActionBlock>
</template>
