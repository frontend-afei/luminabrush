<script setup lang="ts">
  import {
    LanguagesIcon,
    LogOutIcon,
    SettingsIcon,
    UserMinusIcon,
  } from "lucide-vue-next";
  import { useToast } from "@/modules/ui/components/toast";

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
  <DropdownMenu v-if="user">
    <DropdownMenuTrigger asChild>
      <button
        class="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
          <LanguagesIcon class="size-4" />

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
          <SettingsIcon class="mr-2 size-4" />
          {{ $t("dashboard.userMenu.accountSettings") }}
        </NuxtLinkLocale>
      </DropdownMenuItem>

      <DropdownMenuItem v-if="user.impersonatedBy" @click="unimpersonate()">
        <UserMinusIcon class="mr-2 size-4" />
        {{ $t("dashboard.userMenu.unimpersonate") }}
      </DropdownMenuItem>

      <DropdownMenuItem @click="logout">
        <LogOutIcon class="mr-2 size-4" />
        {{ $t("dashboard.userMenu.logout") }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
