<template>
  <nav class="bg-muted w-full border-b">
    <div class="container max-w-6xl py-4">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <NuxtLinkLocale to="/" class="block">
            <Logo :withLabel="false" />
          </NuxtLinkLocale>

          <span class="hidden opacity-30 lg:block">
            <Icon name="chevronRight" class="h-4 w-4" />
          </span>

          <SaasTeamSelect />
        </div>

        <div class="ml-auto mr-0 flex items-center justify-end gap-4">
          <UserMenu />
        </div>
      </div>

      <ul
        class="no-scrollbar -mx-8 -mb-4 mt-6 flex list-none items-center justify-start gap-6 overflow-x-auto px-8 text-sm lg:text-base"
      >
        <li v-for="menuItem of menuItems" :key="menuItem.to">
          <NuxtLinkLocale
            :to="menuItem.to"
            class="flex items-center gap-2 border-b-2 px-1 pb-3"
            :class="
              isActiveMenuItem(menuItem.to)
                ? 'border-primary font-bold'
                : 'border-transparent'
            "
          >
            <Icon
              :name="menuItem.icon"
              class="h-4 w-4 shrink-0"
              :class="isActiveMenuItem(menuItem.to) ? 'text-primary' : ''"
            />
            <span>{{ menuItem.label }}</span>
          </NuxtLinkLocale>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import type { IconName } from "@/modules/ui/components/Icon.vue";

  const route = useRoute();
  const { t } = useTranslations();

  const currentTeamId = useCurrentTeamIdCookie();

  type MenuItem = {
    label: string;
    to: string;
    icon: IconName;
  };

  const menuItems = computed<MenuItem[]>(() => {
    if (!currentTeamId.value) {
      return [];
    }
    return [
      {
        label: t("dashboard.menu.dashboard"),
        icon: "grid",
        to: "/app/dashboard",
      },
      {
        label: t("dashboard.menu.aiDemo"),
        icon: "magic",
        to: "/app/ai-demo",
      },
      {
        label: t("dashboard.menu.settings"),
        icon: "settings",
        to: "/app/settings",
      },
    ];
  });

  const isActiveMenuItem = (href: string | null) => {
    return href && route.path.includes(href);
  };
</script>
