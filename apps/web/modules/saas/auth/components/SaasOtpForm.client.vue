<script setup lang="ts">
  import type { UserOneTimePasswordTypeType } from "database";
  import { AlertTriangleIcon } from "lucide-vue-next";
  import { z } from "zod";

  const { apiCaller } = useApiCaller();
  const { t } = useTranslations();
  const localePath = useLocalePath();
  const { user, loaded } = useUser();
  const runtimeConfig = useRuntimeConfig();

  const formSchema = toTypedSchema(
    z.object({
      root: z.string().optional(),
      code: z.string().min(6).max(6),
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
  const { searchQuery: identifier } = useRouteSearchQuery({
    name: "identifier",
    replace: true,
  });
  const { searchQuery: typeParam } = useRouteSearchQuery({
    name: "type",
    replace: true,
  });

  const type = computed(() => {
    return typeParam.value as UserOneTimePasswordTypeType;
  });

  const redirectTo = computed(() => {
    const path = invitationCode.value
      ? `/team/invitation?code=${invitationCode.value}`
      : redirectToParam.value || runtimeConfig.public.auth.redirectPath;
    return localePath(path);
  });

  const handleRedirect = () => {
    if (!process.client || typeof window === "undefined") {
      return;
    }

    // Hard redirect to reset all states after signup
    window.location.href = localePath(redirectTo.value);
  };

  // Redirect if user is already logged in
  watchEffect(() => {
    if (user.value && loaded.value) {
      // Only redirect a user that already has a team.
      if (user.value.teamMemberships?.length) {
        handleRedirect();
      }
    }
  });

  const { zodErrorMap, setApiErrorsToForm } = useApiFormErrors();

  z.setErrorMap(zodErrorMap);

  const form = useForm({
    validationSchema: formSchema,
    initialValues: {
      code: "",
    },
  });

  const { handleSubmit, isSubmitting, errors } = form;

  const onSubmit = handleSubmit(async (values) => {
    try {
      await apiCaller.auth.verifyOtp.mutate({
        code: values.code,
        type: type.value,
        identifier: identifier.value,
      });

      handleRedirect();
    } catch (e) {
      setApiErrorsToForm(e, form, {
        defaultError: t("auth.verifyOtp.hints.verificationFailed"),
      });
    }
  });
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold">{{ $t("auth.verifyOtp.title") }}</h1>
    <p class="mb-6 mt-2 text-muted-foreground">
      {{ $t("auth.verifyOtp.message") }}
    </p>

    <SaasTeamInvitationInfo v-if="invitationCode" class="mb-6" />

    <form @submit.prevent="onSubmit" class="flex flex-col items-stretch gap-6">
      <Alert v-if="errors.root" variant="error">
        <AlertTriangleIcon class="size-6" />
        <AlertDescription>{{ errors.root }}</AlertDescription>
      </Alert>

      <FormField v-slot="{ componentField }" name="code">
        <FormItem>
          <FormLabel for="code" required>
            {{ $t("auth.verifyOtp.otp") }}
          </FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="text"
              autocomplete="one-time-code"
            />
          </FormControl>
        </FormItem>
      </FormField>

      <Button :loading="isSubmitting" type="submit">
        {{ $t("auth.verifyOtp.submit") }} &rarr;
      </Button>
    </form>
  </div>
</template>
