<script lang="ts" setup>
  import { HardDriveIcon, MoonIcon, SunIcon } from "lucide-vue-next";

  const colorModeOptions: {
    value: string;
    label: string;
    icon: Component;
  }[] = [
    {
      value: "system",
      label: "System",
      icon: HardDriveIcon,
    },
    {
      value: "light",
      label: "Light",
      icon: SunIcon,
    },
    {
      value: "dark",
      label: "Dark",
      icon: MoonIcon,
    },
  ];
</script>

<template>
  <DropdownMenuRadioGroup v-model="$colorMode.preference">
    <DropdownMenuRadioItem
      v-for="option of colorModeOptions"
      :key="option.value"
      :value="option.value"
      :data-test="`color-mode-toggle-item-${option.value}`"
    >
      <component :is="option.icon" class="mr-2 size-4 opacity-50" />
      {{ option.label }}
    </DropdownMenuRadioItem>
  </DropdownMenuRadioGroup>
</template>
