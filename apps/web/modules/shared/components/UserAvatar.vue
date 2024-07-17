<script setup lang="ts">
  const props = defineProps<{
    name: string;
    avatarUrl?: string | null;
  }>();

  const initials = computed(() => {
    return props.name
      .split(" ")
      .map((n) => n[0])
      .join("");
  });
</script>

<template>
  <Avatar class="bg-background">
    <AvatarImage v-if="props.avatarUrl" :src="props.avatarUrl" />
    <AvatarFallback
      class="flex size-full items-center justify-center bg-primary/10 text-primary"
    >
      {{ initials }}
    </AvatarFallback>
  </Avatar>
</template>
