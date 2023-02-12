<template>
  <div>
    <h1>Welcome to supastarter!</h1>
    <NuxtLink to="/protected">
      <span>Visit a Protected page &rarr;</span>
    </NuxtLink>
    <br><br>
    <pre>tRPC Data: "{{ hello.data.value?.greeting }}" send at "{{ hello.data.value?.time.toLocaleDateString('en-EN') }}".</pre>
  </div>
</template>

<script setup lang="ts">
const { $trpcClient } = useNuxtApp()
const hello = await $trpcClient.hello.useQuery({ text: 'client' })
</script>
