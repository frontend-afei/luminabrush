<script setup lang="ts">
  import { useWindowScroll } from "@vueuse/core";
  import { VisuallyHidden } from "radix-vue";

  const route = useRoute();
  const { t } = useTranslations();
  const { y: verticalScrollPosition } = useWindowScroll();
  const { user, loaded: userLoaded } = useUser();

  const isTop = computed(() => verticalScrollPosition.value < 10);

  const { public: runtimeConfig } = useRuntimeConfig();

  const hasUser = computed(() => {
    return userLoaded.value && user.value;
  });

  const mobileMenuOpen = ref(false);

  const isMenuItemActive = (to: string) => {
    return route.fullPath === to;
  };

  watch(
    () => route.fullPath,
    () => {
      mobileMenuOpen.value = false;
    },
  );

  type MenuItem = {
    label: string;
    to: string;
  };
  const menuItems = computed<MenuItem[]>(() => [
    {
      label: t("common.menu.pricing"),
      to: "/pricing",
    },
    {
      label: t("common.menu.blog"),
      to: "/blog",
    },
    {
      label: t("common.menu.faq"),
      to: "/faq",
    },
    {
      label: t("common.menu.changelog"),
      to: "/changelog",
    },
    {
      label: t("common.menu.docs"),
      to: "/docs",
    },
  ]);
</script>

<template>
  <nav
    class="bg-background/80 fixed left-0 top-0 z-20 w-full backdrop-blur-lg transition-[height] duration-200"
    :class="[isTop ? 'shadow-none' : 'shadow-sm']"
  >
    <MarketingBanner />

    <div class="container">
      <div
        class="flex items-center justify-stretch gap-6 transition-all duration-200"
        :class="[isTop ? 'py-8' : 'py-4']"
      >
        <div class="flex flex-1 justify-start">
          <NuxtLinkLocale
            to="/"
            class="block hover:no-underline active:no-underline"
          >
            <Logo />
          </NuxtLinkLocale>
        </div>

        <div class="hidden flex-1 items-center justify-center md:flex">
          <NuxtLinkLocale
            v-for="menuItem of menuItems"
            :key="menuItem.to"
            :to="menuItem.to"
            class="block px-3 py-2 text-lg"
            :class="[isMenuItemActive(menuItem.to) ? 'font-bold' : '']"
          >
            {{ menuItem.label }}
          </NuxtLinkLocale>
        </div>

        <div class="flex flex-1 items-center justify-end gap-3">
          <ColorModeToggle />
          <LocaleSwitch />

          <SheetRoot v-model:open="mobileMenuOpen">
            <SheetTrigger asChild>
              <Button class="md:hidden" size="icon" variant="outline">
                <Icon name="menu" />
              </Button>
            </SheetTrigger>
            <SheetContent class="w-[250px]" side="right">
              <VisuallyHidden>
                <DialogTitle> Menu </DialogTitle>
                <DialogDescription> Navigation Menu </DialogDescription>
              </VisuallyHidden>

              <div class="flex flex-col items-start justify-center">
                <NuxtLinkLocale
                  v-for="menuItem of menuItems"
                  :key="menuItem.to"
                  :to="menuItem.to"
                  class="block px-3 py-2 text-lg"
                >
                  {{ menuItem.label }}
                </NuxtLinkLocale>

                <NuxtLinkLocale
                  :to="
                    hasUser ? runtimeConfig.auth.redirectPath : '/auth/login'
                  "
                  :prefetch="!hasUser"
                  class="block px-3 py-2 text-lg"
                >
                  {{
                    hasUser
                      ? t("common.menu.dashboard")
                      : t("common.menu.login")
                  }}
                </NuxtLinkLocale>
              </div>
            </SheetContent>
          </SheetRoot>

          <Button class="hidden md:block" asChild variant="ghost">
            <NuxtLinkLocale
              :to="hasUser ? runtimeConfig.auth.redirectPath : '/auth/login'"
              :prefetch="!hasUser"
            >
              {{
                hasUser ? t("common.menu.dashboard") : t("common.menu.login")
              }}
            </NuxtLinkLocale>
          </Button>
        </div>
      </div>
    </div>
  </nav>
</template>
