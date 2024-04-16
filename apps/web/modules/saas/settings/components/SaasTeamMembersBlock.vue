<script setup lang="ts">
  import type { ApiOutput } from "api";

  const props = defineProps<{
    memberships: ApiOutput["team"]["memberships"];
    invitations: ApiOutput["team"]["invitations"];
  }>();

  const activeTab = ref<"members" | "invitations">("members");
</script>

<template>
  <SaasActionBlock>
    <template #title>
      {{ $t("settings.team.members.title") }}
    </template>
    <Tabs v-model="activeTab">
      <TabsList class="mb-4">
        <TabsTrigger value="members">
          {{ $t("settings.team.members.activeMembers") }}
        </TabsTrigger>
        <TabsTrigger value="invitations">
          {{ $t("settings.team.members.pendingInvitations") }}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="members">
        <SaasTeamMembersList :memberships="props.memberships" />
      </TabsContent>
      <TabsContent value="invitations">
        <SaasTeamInvitationsList :invitations="props.invitations" />
      </TabsContent>
    </Tabs>
  </SaasActionBlock>
</template>
