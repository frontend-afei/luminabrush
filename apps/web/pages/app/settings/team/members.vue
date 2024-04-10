<script setup lang="ts">
  definePageMeta({
    layout: "saas-app",
  });

  const { t } = useTranslations();
  const localePath = useLocalePath();
  const { apiCaller } = useApiCaller();
  const { currentTeam } = useUser();

  useSeoMeta({
    title: t("settings.team.title"),
  });

  const { data, error, pending, refresh } = useAsyncData(async () => {
    if (!currentTeam.value) {
      return;
    }

    const [memberships, invitations] = await Promise.all([
      apiCaller.team.memberships.query({
        teamId: currentTeam.value.id,
      }),
      apiCaller.team.invitations.query({
        teamId: currentTeam.value.id,
      }),
    ]);

    return {
      memberships,
      invitations,
    };
  });

  watchEffect(() => {
    if (!pending.value && (!currentTeam.value || error.value)) {
      navigateTo(localePath("/auth/login"));
    }
  });
</script>

<template>
  <div v-if="!pending && currentTeam" class="grid grid-cols-1 gap-6">
    <template v-if="data">
      <SaasInviteMemberForm :teamId="currentTeam.id" @success="refresh" />
      <SaasTeamMembersBlock
        :memberships="data.memberships"
        :invitations="data.invitations"
      />
    </template>
  </div>
  <SaasLoadingSpinner v-else />
</template>
