<template>
  <footer class="bg-muted py-12 text-muted-foreground">
    <div class="container grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <Logo class="opacity-50 grayscale" />
        <p class="mt-3 text-sm opacity-70">
          Copyright © {{ new Date().getFullYear() }} - All rights reserved.
        </p>
      </div>

      <!-- <div class="flex flex-col gap-2">
        <NuxtLinkLocale to="/blog" class="block"> Blog </NuxtLinkLocale>
        <a href="#" class="block"> Features </a>
        <a href="#" class="block"> Pricing </a>
      </div> -->

      <div class="flex flex-col gap-2">
        <NuxtLink to="/legal/privacy" class="block"> Privacy policy </NuxtLink>
        <NuxtLink to="/legal/terms" class="block">Terms and conditions</NuxtLink>
      </div>
    </div>
  </footer>
</template>
