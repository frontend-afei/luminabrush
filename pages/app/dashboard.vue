<template>
  <div>
    <div>I'm protected! Session data: {{ data }}</div>
    <NuxtLink :to="localePath({ name: 'index' })">
      <span>&larr; Back Home</span>
    </NuxtLink>
    <button class="rounded-xl shadow-xl p-2 m-2" @click="signOut()">
      sign out
    </button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const localePath = useLocalePath()
const { data, signOut } = useSession()
</script>
