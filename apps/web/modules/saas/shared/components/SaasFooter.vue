<template>
  <footer className="text-muted-foreground container py-4 text-center text-sm">
    <span>
      © {{ new Date().getFullYear() }} supastarter. All rights reserved.
    </span>
    <span className="opacity-50"> | </span>
    <NuxtLink to="/legal/privacy-policy">Privacy policy</NuxtLink>
    <span className="opacity-50"> | </span>
    <NuxtLink to="/legal/terms">Terms and conditions</NuxtLink>
  </footer>
</template>
