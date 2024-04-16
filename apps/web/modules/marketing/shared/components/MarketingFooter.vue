<template>
  <footer class="bg-muted py-12 text-muted-foreground">
    <div class="container grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div>
        <Logo class="opacity-50 grayscale" />
        <p class="mt-3 text-sm opacity-70">
          © {{ new Date().getFullYear() }} supastarter. All rights reserved.
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <NuxtLinkLocale to="/blog" class="block"> Blog </NuxtLinkLocale>
        <a href="#" class="block"> Features </a>
        <a href="#" class="block"> Pricing </a>
      </div>

      <div class="flex flex-col gap-2">
        <NuxtLink to="/legal/privacy" class="block"> Privacy policy </NuxtLink>
        <NuxtLink href="/legal/terms" class="block">
          Terms and conditions
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
