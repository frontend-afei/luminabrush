<script setup lang="ts">
  definePageMeta({
    layout: "saas-app",
  });

  const { t } = useTranslations();
  const localePath = useLocalePath();
  const { currentTeam } = useUser();

  useSeoMeta({
    title: t("settings.team.title"),
  });

  const currentTeamId = useCurrentTeamIdCookie();

  if (!currentTeamId.value) {
    navigateTo(localePath("/auth/login"));
    throw new Error("Team not found");
  }
</script>

<template>
  <div v-if="currentTeam" class="grid gap-6">
    <SaasTeamAvatarForm />
    <SaasChangeTeamNameForm
      :initialValue="currentTeam.name"
      :teamId="currentTeam.id"
    />
    <SaasDeleteTeamForm />
  </div>
</template>
