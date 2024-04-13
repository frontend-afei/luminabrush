<script setup lang="ts">
  import { toTypedSchema } from "@vee-validate/zod";
  import { ArrowLeftIcon, ArrowRightIcon } from "lucide-vue-next";
  import { useForm } from "vee-validate";
  import { z } from "zod";

  const emit = defineEmits<{
    complete: [];
    back: [];
  }>();

  const { apiCaller } = useApiCaller();
  const { t } = useTranslations();

  const createTeamMutation = apiCaller.team.create.useMutation();

  const formSchema = toTypedSchema(
    z.object({
      teamName: z.string().min(1, "Name is required"),
    }),
  );

  const serverError = ref<null | string>(null);

  const { isSubmitting, handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {
      teamName: "",
    },
  });

  const onSubmit = handleSubmit(async ({ teamName }) => {
    serverError.value = null;

    try {
      await createTeamMutation.mutate({
        name: teamName,
      });

      emit("complete");
    } catch (e) {
      serverError.value = t("onboarding.notifications.teamSetupFailed");
    }
  });
</script>

<template>
  <form @submit="onSubmit" class="space-y-8">
    <div class="space-y-4">
      <h3 className="mb-4 text-xl font-bold">
        {{ $t("onboarding.team.title") }}
      </h3>

      <FormField v-slot="{ componentField }" name="teamName">
        <FormItem>
          <FormLabel for="teamName" required>
            {{ $t("onboarding.team.name") }}
          </FormLabel>
          <FormControl>
            <Input v-bind="componentField" autocomplete="company" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="flex gap-2">
      <Button
        type="button"
        variant="outline"
        @click="$emit('back')"
        class="flex-1"
      >
        <ArrowLeftIcon class="mr-2 size-4" />
        {{ $t("onboarding.back") }}
      </Button>

      <Button type="submit" :loading="isSubmitting" class="flex-1">
        {{ $t("onboarding.continue") }}
        <ArrowRightIcon class="ml-2 size-4" />
      </Button>
    </div>
  </form>
</template>
