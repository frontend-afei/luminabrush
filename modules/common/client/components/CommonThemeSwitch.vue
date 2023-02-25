<template>
  <select
    v-model="colorMode.preference"
    class="CommonThemeSwitch text-right bg-transparent font-bold cursor-pointer"
  >
    <option value="system">
      🖥️&nbsp;&nbsp;{{ $t('theme.system') }}
    </option>
    <option value="light">
      💡&nbsp;&nbsp;{{ $t('theme.light') }}
    </option>
    <option value="dark">
      🌙&nbsp;&nbsp;{{ $t('theme.dark') }}
    </option>
  </select>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
</script>
