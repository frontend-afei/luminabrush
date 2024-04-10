<script setup lang="ts">
  definePageMeta({
    layout: "saas-app",
  });

  const { t } = useTranslations();
  const { apiCaller } = useApiCaller();
  const localePath = useLocalePath();

  useSeoMeta({
    title: t("settings.billing.title"),
  });

  const { data, pending } = useAsyncData(async () => {
    const currentTeamId = useCurrentTeamIdCookie();

    if (!currentTeamId.value) {
      navigateTo(localePath("/auth/login"));
      return null;
    }

    const team = await apiCaller.team.byId.query({
      id: currentTeamId.value,
    });

    const [plans, teamSubscription] = await Promise.all([
      apiCaller.billing.plans.query(),
      apiCaller.team.subscription.query({
        teamId: team.id,
      }),
    ]);

    return {
      team,
      plans,
      teamSubscription,
    };
  });

  watchEffect(() => {
    if (!pending.value && !data.value?.team) {
      navigateTo(localePath("/auth/login"));
    }
  });
</script>

<template>
  <div v-if="!pending" class="grid gap-6">
    <SaasSubscriptionOverview
      v-if="data?.plans"
      :plans="data.plans"
      :currentSubscription="data.teamSubscription"
    />

    <SaasUpgradePlan
      v-if="data?.plans"
      :plans="data.plans"
      :activePlanId="data.teamSubscription?.planId"
      :teamId="data.team.id"
    />
  </div>
  <SaasLoadingSpinner v-else />
</template>
