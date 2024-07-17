<script setup lang="ts">
  import { ArrowRightIcon } from "lucide-vue-next";
  import { z } from "zod";
  import { useToast } from "~/modules/ui/components/toast";

  const emit = defineEmits<{
    complete: [];
  }>();

  const { apiCaller } = useApiCaller();
  const { user } = useUser();
  const { t } = useTranslations();
  const { toast } = useToast();

  const updateUserMutation = apiCaller.auth.update.useMutation();

  const formSchema = toTypedSchema(
    z.object({
      name: z.string().min(1),
    }),
  );

  const serverError = ref<null | string>(null);

  const { isSubmitting, handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {
      name: user.value?.name || "",
    },
  });

  const onSubmit = handleSubmit(async ({ name }) => {
    serverError.value = null;

    try {
      await updateUserMutation.mutate({
        name,
      });

      emit("complete");
    } catch (e) {
      serverError.value = t("onboarding.notifications.accountSetupFailed");
    }
  });

  const onAvatarUploadError = () => {
    toast({
      variant: "error",
      title: t("settings.notifications.avatarNotUpdated"),
    });
  };
</script>

<template>
  <div>
    <form @submit="onSubmit" class="flex flex-col items-stretch gap-8">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel for="name" required>
            {{ $t("onboarding.account.name") }}
          </FormLabel>
          <FormControl>
            <Input v-bind="componentField" autocomplete="name" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="avatar">
        <FormItem class="flex items-center gap-4">
          <div>
            <FormLabel for="name" required>
              {{ $t("onboarding.account.avatar") }}
            </FormLabel>
            <FormDescription>
              {{ $t("onboarding.account.avatarDescription") }}
            </FormDescription>
          </div>
          <SaasUserAvatarUpload @error="onAvatarUploadError()" />
        </FormItem>
      </FormField>

      <Button type="submit" :loading="isSubmitting">
        {{ $t("onboarding.continue") }}
        <ArrowRightIcon class="ml-2 size-4" />
      </Button>
    </form>
  </div>
</template>
