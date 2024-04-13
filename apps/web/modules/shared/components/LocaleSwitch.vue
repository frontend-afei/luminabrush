<script setup lang="ts">
  import { LanguagesIcon } from "lucide-vue-next";
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon">
        <LanguagesIcon class="size-4" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <LocaleSwitchRadioGroup />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
