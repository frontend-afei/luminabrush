<script setup lang="ts">
  import { AlertTriangleIcon, SendIcon } from "lucide-vue-next";
  import { joinURL } from "ufo";
  import { z } from "zod";

  const { apiCaller } = useApiCaller();
  const runtimeConfig = useRuntimeConfig();
  const { t } = useTranslations();
  const localePath = useLocalePath();

  const formSchema = toTypedSchema(
    z.object({
      root: z.string().optional(),
      email: z.string().email(),
    }),
  );

  const { zodErrorMap, setApiErrorsToForm } = useApiFormErrors();

  z.setErrorMap(zodErrorMap);

  const form = useForm({
    validationSchema: formSchema,
    initialValues: {
      email: "",
    },
  });

  const { handleSubmit, isSubmitting, errors } = form;

  const onSubmit = handleSubmit(async (values) => {
    try {
      await apiCaller.auth.forgotPassword.mutate({
        email: values.email,
        callbackUrl: joinURL(runtimeConfig.public.siteUrl, "/auth/verify"),
      });

      const redirectSearchParams = new URLSearchParams();
      redirectSearchParams.set("type", "PASSWORD_RESET");
      if (values.email) {
        redirectSearchParams.set("identifier", values.email);
      }
      redirectSearchParams.set("redirectTo", "/app/settings/account/general");

      navigateTo(localePath(`/auth/otp?${redirectSearchParams.toString()}`), {
        replace: true,
      });
    } catch (e) {
      setApiErrorsToForm(e, form, {
        defaultError: t("auth.forgotPassword.hints.linkNotSent.message"),
      });
    }
  });
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold">{{ $t("auth.forgotPassword.title") }}</h1>
    <p class="mb-6 mt-2 text-muted-foreground">
      {{ $t("auth.forgotPassword.message") }}
      <NuxtLinkLocale to="/auth/login" class="text-gray-700">
        {{ $t("auth.forgotPassword.backToSignin") }} &rarr;
      </NuxtLinkLocale>
    </p>

    <form @submit.prevent="onSubmit" class="flex flex-col items-stretch gap-6">
      <Alert v-if="errors.root" variant="error">
        <AlertTriangleIcon class="size-6" />
        <AlertDescription>{{ errors.root }}</AlertDescription>
      </Alert>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel for="name" required>
            {{ $t("auth.forgotPassword.email") }}
          </FormLabel>
          <FormControl>
            <Input v-bind="componentField" autocomplete="email" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button :loading="isSubmitting" type="submit">
        <SendIcon class="mr-2 size-4" />
        {{ $t("auth.forgotPassword.submit") }} &rarr;
      </Button>
    </form>
  </div>
</template>
