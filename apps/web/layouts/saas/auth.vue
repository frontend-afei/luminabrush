<template>
  <div
    class="flex min-h-screen flex-col items-center justify-between gap-8 bg-card py-8 text-foreground"
  >
    <div class="container">
      <div class="flex items-center justify-between">
        <NuxtLinkLocale to="/" class="block">
          <Logo />
        </NuxtLinkLocale>

        <div class="flex items-center justify-end gap-2">
          <LocaleSwitch />
          <ColorModeToggle />
        </div>
      </div>
    </div>

    <div class="w-full max-w-md">
      <slot />
    </div>

    <SaasFooter />
  </div>
</template>
