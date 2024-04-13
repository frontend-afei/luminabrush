<script setup lang="ts">
  import type { TeamMemberRoleType } from "database";
  import type { ComponentFieldBindingObject } from "vee-validate";

  const props = defineProps<
    {
      disabled?: boolean;
    } & ComponentFieldBindingObject
  >();

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

<template>
  <Select
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
  </Select>
</template>
