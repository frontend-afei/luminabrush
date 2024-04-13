<script setup lang="ts">
  import { useToast } from "@/modules/ui/components/toast";

  const { toast } = useToast();
  const { t } = useTranslations();

  const onSuccess = () => {
    toast({
      variant: "success",
      title: t("settings.notifications.avatarUpdated"),
    });
  };

  const onError = () => {
    toast({
      variant: "error",
      title: t("settings.notifications.avatarNotUpdated"),
    });
  };
</script>

<template>
  <SaasActionBlock>
    <template #title>
      {{ $t("settings.account.avatar.title") }}
    </template>

    <div class="flex items-center gap-4">
      <div class="flex-1">
        <p>{{ $t("settings.account.avatar.description") }}</p>
      </div>

      <SaasUserAvatarUpload @success="onSuccess" @error="onError" />
    </div>
  </SaasActionBlock>
</template>
