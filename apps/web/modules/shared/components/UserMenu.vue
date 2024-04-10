<script setup lang="ts">
  const { user, logout } = useUser();
  const { t } = useTranslations();
  const { toast, dismiss: dismissToast } = useToast();
  const { apiCaller } = useApiCaller();

  const unimpersonateMutation = apiCaller.admin.unimpersonate.useMutation();

  const unimpersonate = async () => {
    const { id: toastId } = toast({
      variant: "loading",
      title: t("admin.users.impersonation.unimpersonating"),
    });
    await unimpersonateMutation.mutate();
    dismissToast(toastId);
    window.location.reload();
  };
</script>

<template>
  <DropdownMenuRoot v-if="user">
    <DropdownMenuTrigger asChild>
      <button
        class="focus-visible:ring-primary rounded-full outline-none focus-visible:ring-2"
      >
        <UserAvatar :name="user.name ?? ''" :avatarUrl="user.avatarUrl" />
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end">
      <DropdownMenuLabel>
        {{ user.name }}
        <span class="block text-xs font-normal opacity-70">{{
          user.email
        }}</span>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <!-- Color mode selection -->
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <ColorModeToggleIcon />
          <div class="ml-2">
            {{ $t("dashboard.userMenu.colorMode") }}
          </div>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent avoid-collisions>
            <ColorModeToggleRadioGroup />
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>

      <DropdownMenuSeparator />

      <!-- Locale selection -->
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <Icon name="language" class="h-4 w-4" />

          <div class="ml-2">
            {{ $t("dashboard.userMenu.language") }}
          </div>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent avoid-collisions>
            <LocaleSwitchRadioGroup />
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>

      <DropdownMenuSeparator />

      <DropdownMenuItem asChild>
        <NuxtLinkLocale to="/app/settings/account/general">
          <Icon name="settings" class="mr-2 h-4 w-4" />
          {{ $t("dashboard.userMenu.accountSettings") }}
        </NuxtLinkLocale>
      </DropdownMenuItem>

      <DropdownMenuItem v-if="user.impersonatedBy" @click="unimpersonate()">
        <Icon name="unimpersonate" class="mr-2 h-4 w-4" />
        {{ $t("dashboard.userMenu.unimpersonate") }}
      </DropdownMenuItem>

      <DropdownMenuItem @click="logout">
        <Icon name="logout" class="mr-2 h-4 w-4" />
        {{ $t("dashboard.userMenu.logout") }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>
