<script setup lang="ts">
  import type { ApiOutput } from "api";

  const props = defineProps<{
    plans: ApiOutput["billing"]["plans"];
  }>();
</script>

<template>
  <PricingTable
    :plans="props.plans"
    :onSelectPlan="
      () => {
        navigateTo('/app/settings/team/billing');
      }
    "
  />
</template>
