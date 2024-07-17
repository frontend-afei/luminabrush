<script setup lang="ts">
  import { z } from "zod";
  import { useToast } from "@/modules/ui/components/toast";

  const { t } = useTranslations();
  const { apiCaller } = useApiCaller();
  const { toast } = useToast();
  const { user, reloadUser } = useUser();

  const formSchema = toTypedSchema(
    z.object({
      name: z.string().min(3),
    }),
  );

  const { handleSubmit, isSubmitting, meta, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: {
      name: user.value?.name || "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await apiCaller.auth.update.mutate({
        name: values.name,
      });

      toast({
        variant: "success",
        title: t("settings.notifications.nameUpdated"),
      });

      await reloadUser();

      resetForm({
        values: {
          name: user.value?.name || "",
        },
      });
    } catch (error) {
      toast({
        variant: "error",
        title: t("settings.notifications.nameUpdateFailed"),
      });
    }
  });
</script>

<template>
  <SaasActionBlock
    @submit="onSubmit"
    :isSubmitting="isSubmitting"
    :isSubmitDisabled="!meta.dirty || !meta.valid"
  >
    <template #title>{{ $t("settings.account.changeName.title") }}</template>

    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormControl>
          <Input v-bind="componentField" autocomplete="name" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </SaasActionBlock>
</template>
