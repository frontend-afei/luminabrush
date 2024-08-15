<script setup lang="ts">
  import { AlertTriangleIcon } from "lucide-vue-next";
  import { joinURL } from "ufo";
  import { z } from "zod";
  import { oAuthProviders } from "./SaasSocialSigninButton.client.vue";

  const runtimeConfig = useRuntimeConfig();
  const { apiCaller } = useApiCaller();
  const { t } = useTranslations();
  const localePath = useLocalePath();
  const { user, loaded } = useUser({ initialUser: null });

  const formSchema = toTypedSchema(
    z.object({
      root: z.string().optional(),
      email: z.string().email(),
      password: z.optional(z.string()),
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

  const handleRedirect = () => {
    navigateTo(localePath(redirectTo.value));
  };

  // Redirect if user is already logged in
  watchEffect(() => {
    if (user.value && loaded.value) {
      handleRedirect();
    }
  });

  const { zodErrorMap, setApiErrorsToForm } = useApiFormErrors();

  z.setErrorMap(zodErrorMap);

  const form = useForm({
    validationSchema: formSchema,
    initialValues: {
      email: "",
    },
  });

  const {
    isSubmitting,
    values: formValues,
    resetForm,
    handleSubmit,
    setFieldValue,
    errors,
  } = form;

  const signinMode = ref<"password" | "magic-link">("magic-link");
  watch(signinMode, async () => {
    resetForm();
    await nextTick();
  });

  watchEffect(() => {
    if (emailParam.value) {
      setFieldValue("email", emailParam.value);
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (signinMode.value === "password") {
        await apiCaller.auth.loginWithPassword.mutate({
          email: values.email,
          password: values.password!,
        });

        handleRedirect();
      } else {
        await apiCaller.auth.loginWithEmail.mutate({
          email: values.email,
          callbackUrl: joinURL(runtimeConfig.public.siteUrl, "/auth/verify"),
        });

        const redirectSearchParams = new URLSearchParams();
        redirectSearchParams.set("type", "LOGIN");
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
      }
    } catch (e) {
      setApiErrorsToForm(e, form, {
        defaultError: t("auth.login.hints.invalidCredentials"),
      });
    }
  });
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold">{{ $t("auth.login.title") }}</h1>
    <p class="mb-6 mt-4 text-muted-foreground">
      {{ $t("auth.login.subtitle") }}
    </p>

    <SaasTeamInvitationInfo v-if="invitationCode" class="mb-6" />

    <div class="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
      <SaasSocialSigninButton
        v-for="providerId of Object.keys(oAuthProviders)"
        :key="providerId"
        :provider="providerId"
      />
    </div>

    <hr class="my-8" />

    <form @submit.prevent="onSubmit" class="flex flex-col items-stretch gap-6">
      <SaasSigninModeSwitch class="w-full" v-model="signinMode" />

      <Alert v-if="errors.root" variant="error">
        <AlertTriangleIcon class="size-6" />
        <AlertDescription>{{ errors.root }}</AlertDescription>
      </Alert>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel for="email" required>
            {{ $t("auth.login.email") }}
          </FormLabel>
          <Input
            v-bind="componentField"
            type="text"
            id="email"
            required
            autocomplete="email"
          />
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-if="signinMode === 'password'"
        v-slot="{ componentField }"
        name="password"
      >
        <FormItem>
          <FormLabel for="password" required>
            {{ $t("auth.login.password") }}
          </FormLabel>
          <SaasPasswordInput
            v-bind="componentField"
            id="password"
            autocomplete="current-password"
            required
          />
          <FormMessage />
          <FormDescription class="text-right">
            <NuxtLinkLocale to="/auth/forgot-password">
              {{ $t("auth.login.forgotPassword") }}
            </NuxtLinkLocale>
          </FormDescription>
        </FormItem>
      </FormField>

      <Button
        class="w-full"
        type="submit"
        variant="secondary"
        :loading="isSubmitting"
      >
        {{
          signinMode === "password"
            ? t("auth.login.submit")
            : t("auth.login.sendMagicLink")
        }}
      </Button>

      <div class="text-center text-sm">
        <span class="text-muted-foreground">
          {{ $t("auth.login.dontHaveAnAccount") }}&nbsp;</span
        >
        <NuxtLinkLocale
          :to="`/auth/signup${
            invitationCode
              ? `?invitationCode=${invitationCode}&email=${formValues.email}`
              : ''
          }`"
        >
          {{ $t("auth.login.createAnAccount") }} &rarr;
        </NuxtLinkLocale>
      </div>
    </form>
  </div>
</template>
