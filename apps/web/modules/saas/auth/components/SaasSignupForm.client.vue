<script setup lang="ts">
  import { toTypedSchema } from "@vee-validate/zod";
  import { AlertTriangleIcon } from "lucide-vue-next";
  import { joinURL } from "ufo";
  import { useForm } from "vee-validate";
  import { z } from "zod";

  const runtimeConfig = useRuntimeConfig();
  const { apiCaller } = useApiCaller();
  const { t } = useTranslations();
  const localePath = useLocalePath();

  const formSchema = toTypedSchema(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
  );

  const { searchQuery: invitationCode } = useRouteSearchQuery({
    name: "invitationCode",
    replace: true,
  });
  const { searchQuery: redirectToParam } = useRouteSearchQuery({
    name: "redirectTo",
    replace: true,
  });
  const { searchQuery: emailParam } = useRouteSearchQuery({
    name: "email",
    replace: true,
  });

  const redirectTo = computed(() => {
    return invitationCode.value
      ? `/team/invitation?code=${invitationCode.value}`
      : redirectToParam.value || runtimeConfig.public.auth.redirectPath;
  });

  type ServerErrorType = {
    title: string;
    message: string;
  };
  const serverError = ref<null | ServerErrorType>(null);

  const {
    handleSubmit,
    setFieldValue,
    isSubmitting,
    values: formValues,
  } = useForm({
    validationSchema: formSchema,
    initialValues: {
      email: "",
      password: "",
    },
  });

  watchEffect(() => {
    if (emailParam.value) {
      setFieldValue("email", emailParam.value);
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    serverError.value = null;

    try {
      await apiCaller.auth.signup.mutate({
        email: values.email,
        password: values.password,
        callbackUrl: joinURL(runtimeConfig.public.siteUrl, "/auth/verify"),
      });

      const redirectSearchParams = new URLSearchParams();
      redirectSearchParams.set("type", "SIGNUP");
      redirectSearchParams.set("redirectTo", redirectTo.value);
      if (invitationCode) {
        redirectSearchParams.set("invitationCode", invitationCode.value);
      }
      if (values.email) {
        redirectSearchParams.set("identifier", values.email);
      }

      navigateTo(localePath(`/auth/otp?${redirectSearchParams.toString()}`), {
        replace: true,
      });
    } catch (e) {
      serverError.value = {
        title: t("auth.signup.hints.signupFailed.title"),
        message: t("auth.signup.hints.signupFailed.message"),
      };
    }
  });
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold">{{ $t("auth.signup.title") }}</h1>
    <p class="mb-6 mt-2 text-muted-foreground">
      {{ $t("auth.signup.message") }}
    </p>

    <SaasTeamInvitationInfo v-if="invitationCode" class="mb-6" />

    <form @submit.prevent="onSubmit" class="flex flex-col items-stretch gap-6">
      <Alert v-if="serverError" variant="error">
        <AlertTriangleIcon class="size-4" />
        <AlertTitle>{{ serverError.title }}</AlertTitle>
        <AlertDescription>{{ serverError.message }}</AlertDescription>
      </Alert>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel for="name" required>
            {{ $t("auth.signup.email") }}
          </FormLabel>
          <FormControl>
            <Input v-bind="componentField" autocomplete="email" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel for="password" required>
            {{ $t("auth.signup.password") }}
          </FormLabel>
          <FormControl>
            <SaasPasswordInput
              v-bind="componentField"
              autocomplete="new-password"
              required
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button :loading="isSubmitting" type="submit">
        {{ $t("auth.signup.submit") }} &rarr;
      </Button>

      <p>
        <span class="text-muted-foreground">
          {{ $t("auth.signup.alreadyHaveAccount") }}&nbsp;</span
        >
        <NuxtLinkLocale
          :to="`/auth/login${invitationCode ? `?invitationCode=${invitationCode}&email=${formValues.email}` : ''}`"
        >
          {{ $t("auth.signup.signIn") }} &rarr;
        </NuxtLinkLocale>
      </p>
    </form>
  </div>
</template>
