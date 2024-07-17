<script setup lang="ts">
  import type { ApiOutput } from "api";
  import { z } from "zod";
  import { useToast } from "@/modules/ui/components/toast";

  const { apiCaller } = useApiCaller();
  const { t } = useTranslations();
  const { toast } = useToast();
  const { reloadUser } = useUser();

  const emit = defineEmits<{
    success: [newTeam: ApiOutput["team"]["create"]];
  }>();

  const props = defineProps<{
    defaultName?: string;
  }>();

  const formSchema = toTypedSchema(
    z.object({
      name: z.string().min(3).max(32),
    }),
  );

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: formSchema,
    initialValues: {
      name: props.defaultName,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const newTeam = await apiCaller.team.create.mutate({
        name: values.name,
      });

      toast({
        title: t("createTeam.notifications.success"),
      });

      await reloadUser();
      emit("success", newTeam);
    } catch (e) {
      toast({
        title: t("createTeam.notifications.error"),
        variant: "error",
      });
    }
  });
</script>

<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel for="name" required>
          {{ $t("createTeam.name") }}
        </FormLabel>
        <FormControl>
          <Input v-bind="componentField" autocomplete="company" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button class="mt-4 w-full" type="submit" :loading="isSubmitting">
      {{ $t("createTeam.submit") }}
    </Button>
  </form>
</template>
