<script setup lang="ts">
  definePageMeta({
    layout: "saas-auth",
  });

  const { apiCaller } = useApiCaller();
  const localePath = useLocalePath();

  const { data: user } = await apiCaller.auth.user.useQuery();

  if (!user.value) {
    await navigateTo(localePath("/auth/login"));
  }

  if (user.value!.onboardingComplete) {
    await navigateTo(localePath("/app/dashboard"));
  }
</script>

<template>
  <SaasOnboardingForm />
</template>
