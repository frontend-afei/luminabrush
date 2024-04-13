<script setup lang="ts">
  import { toTypedSchema } from "@vee-validate/zod";
  import { useForm } from "vee-validate";
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

  const { defineInputBinds, handleSubmit, isSubmitting } = useForm({
    validationSchema: formSchema,
    initialValues: {
      name: props.initialValue || "",
    },
  });

  const name = defineInputBinds("name");

  const isSubmitDisabled = computed(() => {
    return (
      !name.value.value ||
      name.value.value.length < 3 ||
      name.value.value === props.initialValue
    );
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
    :isSubmitDisabled="isSubmitDisabled"
  >
    <template #title>{{ $t("settings.team.changeName.title") }}</template>
    <div>
      <Input
        v-bind="name"
        type="text"
        id="name"
        required
        autocomplete="name"
        class="max-w-sm"
      />
    </div>
  </SaasActionBlock>
</template>
