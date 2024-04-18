<script lang="ts" setup>
  import type { ApiOutput } from "api";

  defineProps<{
    user: ApiOutput["admin"]["users"]["users"][number];
  }>();
</script>

<template>
  <div class="flex items-center gap-2">
    <UserAvatar :name="user.name ?? user.email" :avatarUrl="user.avatarUrl" />
    <div class="leading-tight">
      <strong class="block">{{ user.name ?? user.email }}</strong>
      <small class="text-muted-foreground">
        <span v-if="!!user.name">{{ user.email }}</span>
        <SaasAdminEmailVerified
          :verified="user.emailVerified"
          class="inline-block align-text-bottom"
        />
        {{ user.role === "ADMIN" ? " – Admin" : "" }} – Teams:

        <span v-for="(membership, i) in user.memberships" :key="membership.id">
          <span v-if="i > 0">, </span>
          {{ membership.team.name }}
        </span>
      </small>
    </div>
  </div>
</template>
