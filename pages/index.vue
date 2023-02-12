<template>
  <div>
    <h1>Welcome to supastarter!</h1>
    <NuxtLink :to="localePath({ name: 'app-dashboard' })">
      <span>Visit Dashboard &rarr;</span>
    </NuxtLink>
    <br><br>
    <pre>tRPC Data: "{{ hello.data.value?.greeting }}" send at "{{ hello.data.value?.time.toLocaleDateString('en-EN') }}".</pre>
    <br><br>

    <p>{{ $t('welcome') }}</p>
  </div>
</template>

<script setup lang="ts">
const { $trpcClient } = useNuxtApp()
const localePath = useLocalePath()
const hello = await $trpcClient.hello.useQuery({ text: 'client' })
</script>
