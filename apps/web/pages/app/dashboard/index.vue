<script setup lang="ts">
  const { t } = useTranslations();
  const { user } = useUser();

  definePageMeta({
    layout: "saas-app",
  });
</script>

<template>
  <div class="container max-w-6xl py-8">
    <SaasPageHeader>
      <template #title>{{
        t("dashboard.welcome", { name: user?.name })
      }}</template>
      <template #subtitle>{{ $t("dashboard.subtitle") }}</template>
    </SaasPageHeader>

    <div class="mt-8 grid gap-4 md:grid-cols-3">
      <SaasStatsTile
        title="New clients"
        :value="344"
        valueFormat="number"
        :trend="0.12"
      />
      <SaasStatsTile
        title="Revenue"
        :value="5243"
        valueFormat="currency"
        :trend="0.6"
      />
      <SaasStatsTile
        title="Churn"
        :value="0.03"
        valueFormat="percentage"
        :trend="-0.3"
      />
    </div>

    <Card class="mt-8">
      <div
        class="flex h-64 items-center justify-center p-8 text-muted-foreground"
      >
        Place your content here...
      </div>
    </Card>
  </div>
</template>
