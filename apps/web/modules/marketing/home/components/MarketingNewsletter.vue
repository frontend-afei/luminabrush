<script setup lang="ts">
  import { AlertCircleIcon, CheckCircleIcon, KeyIcon } from "lucide-vue-next";
  import { z } from "zod";

  const { apiCaller } = useApiCaller();
  const { t } = useTranslations();

  const formSchema = toTypedSchema(
    z.object({
      email: z.string().email(t("newsletter.hints.error.input")),
    }),
  );

  const isSubmitSuccessful = ref(false);

  const { handleSubmit, isSubmitting, errors, setFieldError, submitCount } =
    useForm({
      validationSchema: formSchema,
      initialValues: {
        email: "",
      },
    });

  const onSubmit = handleSubmit(
    async (values) => {
      try {
        const emailSent = await apiCaller.newsletter.signup.mutate({
          email: values.email,
        });
        if (!emailSent) {
          throw new Error("Email not sent");
        }

        isSubmitSuccessful.value = true;
      } catch (error) {
        isSubmitSuccessful.value = false;
        setFieldError("email", t("newsletter.hints.error.submission"));
      }
    },
    () => {
      isSubmitSuccessful.value = false;
    },
  );
</script>

<template>
  <section class="py-24">
    <div class="container">
      <div class="mb-12 text-center">
        <KeyIcon class="text-primary mx-auto mb-3 size-12" />
        <h1 class="text-3xl font-bold lg:text-4xl">
          {{ $t("newsletter.title") }}
        </h1>
        <p class="mt-3 text-lg opacity-70">{{ $t("newsletter.subtitle") }}</p>
      </div>

      <div class="mx-auto max-w-lg">
        <Alert v-if="isSubmitSuccessful === true" variant="success">
          <CheckCircleIcon class="size-6" />
          <AlertTitle>{{ $t("newsletter.hints.success.title") }}</AlertTitle>
          <AlertDescription>{{
            $t("newsletter.hints.success.message")
          }}</AlertDescription>
        </Alert>

        <template v-else>
          <form @submit.prevent="onSubmit">
            <div class="flex items-start">
              <FormField name="email" v-slot="{ componentField }">
                <Input
                  v-bind="componentField"
                  type="email"
                  required
                  :placeholder="t('newsletter.email')"
                />
              </FormField>
              <Button type="submit" class="ml-4" :loading="isSubmitting">
                {{ $t("newsletter.submit") }}
              </Button>
            </div>
          </form>

          <Alert
            v-if="errors.email && submitCount > 0"
            variant="error"
            class="mt-6 text-sm"
          >
            <AlertCircleIcon class="size-4" />
            <AlertTitle>{{ $t("newsletter.hints.error.title") }}</AlertTitle>
            <AlertDescription>{{ errors.email }}</AlertDescription>
          </Alert>
        </template>
      </div>
    </div>
  </section>
</template>
