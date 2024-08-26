<script setup lang="ts">
  import { config } from "@config";
  import BoringAvatar from "vue-boring-avatars";

  const props = defineProps<{
    name: string;
    avatarUrl?: string | null;
  }>();
</script>

<template>
  <Avatar>
    <AvatarImage v-if="props.avatarUrl" :src="props.avatarUrl" />
    <AvatarFallback class="bg-primary/10 text-primary">
      <BoringAvatar
        :size="96"
        variant="marble"
        :name="name"
        :colors="config.teams.avatarColors"
      />
    </AvatarFallback>
  </Avatar>
</template>
