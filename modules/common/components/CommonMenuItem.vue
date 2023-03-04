<template>
  <li
    class="flex cursor-pointer items-center justify-start gap-3 rounded-md px-4 py-1.5 not-italic data-[focus]:bg-zinc-100 data-[checked]:font-bold data-[checked]:text-zinc-900 dark:data-[focus]:bg-zinc-800 dark:data-[checked]:text-white"
  >
    <Icon v-if="props.icon" :name="props.icon" />
    <span><slot /></span>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon?: string
}>()
</script>
