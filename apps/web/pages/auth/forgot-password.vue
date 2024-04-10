<script setup lang="ts">
  const { t } = useTranslations();

  definePageMeta({
    layout: "saas-auth",
  });

  useSeoMeta({
    title: t("auth.forgotPassword.title"),
  });
</script>

<template>
  <SaasForgotPasswordForm />
</template>
