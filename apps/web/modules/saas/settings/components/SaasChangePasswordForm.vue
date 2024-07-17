<script setup lang="ts">
  import { z } from "zod";
  import { useToast } from "@/modules/ui/components/toast";

  const { t } = useTranslations();
  const { apiCaller } = useApiCaller();
  const { toast } = useToast();

  const formSchema = toTypedSchema(
    z.object({
      password: z.string().min(8),
    }),
  );

  const { handleSubmit, isSubmitting, setFieldValue, meta } = useForm({
    validationSchema: formSchema,
    initialValues: {
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await apiCaller.auth.changePassword.mutate({
        password: values.password,
      });

      setFieldValue("password", "");

      toast({
        variant: "success",
        title: t("settings.notifications.passwordUpdated"),
      });
    } catch (error) {
      toast({
        variant: "error",
        title: t("settings.notifications.passwordNotUpdated"),
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
    <template #title>{{
      $t("settings.account.changePassword.title")
    }}</template>
    <div>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <SaasPasswordInput
            v-bind="componentField"
            type="password"
            :id="componentField.name"
            required
            autocomplete="new-password"
          />
        </FormItem>
      </FormField>
    </div>
  </SaasActionBlock>
</template>
