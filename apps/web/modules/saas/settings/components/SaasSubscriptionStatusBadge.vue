<script setup lang="ts">
  import type { SubscriptionStatusType } from "database";

  const props = defineProps<{
    status: SubscriptionStatusType;
  }>();

  const { t } = useTranslations();

  const badgeLabels = computed<Record<SubscriptionStatusType, string>>(() => ({
    ACTIVE: t("settings.billing.subscription.status.active"),
    CANCELED: t("settings.billing.subscription.status.canceled"),
    EXPIRED: t("settings.billing.subscription.status.expired"),
    INCOMPLETE: t("settings.billing.subscription.status.incomplete"),
    PAST_DUE: t("settings.billing.subscription.status.past_due"),
    PAUSED: t("settings.billing.subscription.status.paused"),
    TRIALING: t("settings.billing.subscription.status.trialing"),
    UNPAID: t("settings.billing.subscription.status.unpaid"),
  }));

  const badgeColors = computed<
    Record<SubscriptionStatusType, BadgeProps["variant"]>
  >(() => ({
    ACTIVE: "success",
    CANCELED: "error",
    EXPIRED: "error",
    INCOMPLETE: "warning",
    PAST_DUE: "warning",
    PAUSED: "warning",
    TRIALING: "info",
    UNPAID: "error",
  }));
</script>

<template>
  <Badge :variant="badgeColors[props.status]">{{
    badgeLabels[props.status]
  }}</Badge>
</template>
