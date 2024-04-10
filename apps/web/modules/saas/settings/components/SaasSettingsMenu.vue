<script setup lang="ts">
  import type { SaasSettingsMenuItemGroup } from "./SaasSettingsMenuGroup.vue";

  const props = defineProps<{
    menuItems: SaasSettingsMenuItemGroup[];
  }>();

  const { user, teamMemberships } = useUser();

  const currentTeamId = useCurrentTeamIdCookie();

  const activeTeam = computed(() => {
    return teamMemberships.value.find((membership) => {
      return membership.team.id === currentTeamId.value;
    })?.team;
  });
</script>

<template>
  <div class="space-y-8" v-if="activeTeam && user">
    <SaasSettingsMenuGroup
      v-for="(item, key) of props.menuItems"
      :menuItemGroup="item"
      :key="key"
    >
      <template #avatar>
        <TeamAvatar
          v-if="item.avatar === 'team'"
          class="size-8"
          :name="activeTeam.name"
          :avatar-url="activeTeam.avatarUrl"
        />
        <UserAvatar
          v-else-if="item.avatar === 'user'"
          :name="user.name || ''"
          :avatarUrl="user.avatarUrl"
        />
      </template>
    </SaasSettingsMenuGroup>
  </div>
</template>
