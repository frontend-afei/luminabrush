<template>
  <footer class="container py-4 text-center text-sm text-muted-foreground">
    <span>
      © {{ new Date().getFullYear() }} supastarter. All rights reserved.
    </span>
    <span class="opacity-50"> | </span>
    <NuxtLink to="/legal/privacy-policy">Privacy policy</NuxtLink>
    <span class="opacity-50"> | </span>
    <NuxtLink to="/legal/terms">Terms and conditions</NuxtLink>
  </footer>
</template>
