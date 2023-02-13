<template>
  <div>
    <h1>{{ $t('welcome') }} to supastarter!</h1>
    <NuxtLink :to="localePath({ name: 'app-dashboard' })">
      <span>Visit Dashboard &rarr;</span>
    </NuxtLink>
    <br><br>

    <h2>tRPC Data:</h2>
    <pre>"{{ hello.data.value?.greeting }}" send at "{{ hello.data.value?.time.toLocaleDateString('en-EN') }}".</pre>
    <br>
    <pre>users (prisma): {{ hello.data.value?.users }}</pre>
  </div>
</template>

<script setup lang="ts">
const { $trpcClient } = useNuxtApp()
const localePath = useLocalePath()
const hello = await $trpcClient.hello.useQuery({ text: 'client' })
</script>
