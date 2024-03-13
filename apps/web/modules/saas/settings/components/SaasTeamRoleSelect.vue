<template>
  <SelectRoot
    :modelValue="props.modelValue"
    @update:modelValue="emit('update:modelValue', $event as TeamMemberRoleType)"
    :disabled="$props.disabled"
  >
    <SelectTrigger class="w-[180px]">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="option of roleOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </SelectItem>
    </SelectContent>
  </SelectRoot>
</template>

<script setup lang="ts">
  import type { TeamMemberRoleType } from "database";

  const props = defineProps<{
    modelValue: TeamMemberRoleType | undefined;
    disabled?: boolean;
  }>();

  const emit = defineEmits<{
    "update:modelValue": [value: TeamMemberRoleType];
  }>();

  const { t } = useTranslations();

  const roleOptions = computed<{ label: string; value: TeamMemberRoleType }[]>(
    () => [
      {
        label: t("settings.team.members.roles.member"),
        value: "MEMBER",
      },
      {
        label: t("settings.team.members.roles.owner"),
        value: "OWNER",
      },
    ],
  );
</script>
