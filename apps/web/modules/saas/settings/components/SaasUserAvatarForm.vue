<script setup lang="ts">
  import { useFileDialog } from "@vueuse/core";
  import { v4 as uuid } from "uuid";

  const uploading = ref(false);
  const image = ref<File | null>(null);
  const cropDialogOpen = ref(false);
  const dropZoneRef = ref<HTMLDivElement>();
  const { reloadUser, user } = useUser();
  const { apiCaller } = useApiCaller();
  const { toast } = useToast();
  const { t } = useTranslations();

  const getSignedUploadUrlMutation =
    apiCaller.uploads.signedUploadUrl.useMutation();
  const updateUserMutation = apiCaller.auth.update.useMutation();

  const { open: openFileDialog, onChange: onFilesSelected } = useFileDialog({
    accept: "image/png,image/jpg,image/jpg",
    multiple: false,
  });

  onFilesSelected((files) => {
    if (files?.length) {
      image.value = files[0];
      cropDialogOpen.value = true;
    }
  });

  const onCrop = async (croppedImageData: Blob | null) => {
    if (!croppedImageData || !user.value) {
      return;
    }

    uploading.value = true;
    try {
      const path = `/${user.value.id}-${uuid()}.png`;
      const uploadUrl = await getSignedUploadUrlMutation.mutate({
        path,
        bucket: "avatars",
      });

      if (!uploadUrl) {
        throw new Error("Failed to get upload url");
      }

      await $fetch(uploadUrl, {
        method: "PUT",
        body: croppedImageData,
        headers: {
          "Content-Type": "image/png",
        },
      });

      await updateUserMutation.mutate({
        avatarUrl: path,
      });

      toast({
        variant: "success",
        title: t("settings.notifications.avatarUpdated"),
      });

      await reloadUser();
    } catch (e) {
      toast({
        variant: "error",
        title: t("settings.notifications.avatarNotUpdated"),
      });
    } finally {
      uploading.value = false;
    }
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

      <div
        ref="dropZoneRef"
        class="relative cursor-pointer rounded-full"
        @click="openFileDialog()"
      >
        <UserAvatar
          class="size-24 cursor-pointer text-xl"
          :avatarUrl="user?.avatarUrl"
          :name="user?.name ?? ''"
        />

        <div
          v-if="uploading"
          class="bg-card/90 absolute inset-0 z-20 flex items-center justify-center"
        >
          <Icon name="spinner" class="text-primary h-6 w-6 animate-spin" />
        </div>
      </div>
    </div>

    <SaasCropImageDialog
      :open="cropDialogOpen"
      :image="image"
      @open-change="(open: boolean) => (cropDialogOpen = open)"
      @save="
        (imageData: Blob | null) => (
          onCrop(imageData), (cropDialogOpen = false)
        )
      "
    />
  </SaasActionBlock>
</template>
