<script lang="ts" setup>
  import type { ApiOutput } from "api";
  import {
    MoreVerticalIcon,
    Repeat1Icon,
    SquareUserIcon,
    TrashIcon,
  } from "lucide-vue-next";
  import { useToast } from "@/modules/ui/components/toast";

  const { user } = defineProps<{
    user: ApiOutput["admin"]["users"]["users"][number];
  }>();

  const { t } = useTranslations();
  const { apiCaller } = useApiCaller();
  const { toast, dismiss: dismissToast } = useToast();
  const impersonateMutation = apiCaller.admin.impersonate.useMutation();
  const deleteUserMutation = apiCaller.admin.deleteUser.useMutation();
  const resendVerificationMailMutation =
    apiCaller.admin.resendVerificationMail.useMutation();

  const impersonateUser = async () => {
    const { id: toastId } = toast({
      variant: "loading",
      title: t("admin.users.impersonation.impersonating", {
        name: user.name ?? "",
      }),
    });
    await impersonateMutation.mutate({
      userId: user.id,
    });
    dismissToast(toastId);
    window.location.href = new URL("/app", window.location.origin).toString();
  };

  const deleteUser = async () => {
    const deleteUserToast = toast({
      variant: "loading",
      title: t("admin.users.deleteUser.deleting"),
    });
    try {
      await deleteUserMutation.mutate({
        id: user.id,
      });
      deleteUserToast.update({
        id: deleteUserToast.id,
        variant: "success",
        title: t("admin.users.deleteUser.deleted"),
        duration: 5000,
      });
    } catch {
      deleteUserToast.update({
        id: deleteUserToast.id,
        variant: "error",
        title: t("admin.users.deleteUser.notDeleted"),
        duration: 5000,
      });
    }
  };

  const resendVerificationMail = async () => {
    const resendVerificationMailToast = toast({
      variant: "loading",
      title: t("admin.users.resendVerificationMail.deleting"),
    });
    try {
      await resendVerificationMailMutation.mutate({
        userId: user.id,
      });
      resendVerificationMailToast.update({
        id: resendVerificationMailToast.id,
        variant: "success",
        title: t("admin.users.resendVerificationMail.deleted"),
        duration: 5000,
      });
    } catch {
      resendVerificationMailToast.update({
        id: resendVerificationMailToast.id,
        variant: "error",
        title: t("admin.users.resendVerificationMail.notDeleted"),
        duration: 5000,
      });
    }
  };
</script>

<template>
  <div class="flex flex-row justify-end gap-2">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreVerticalIcon class="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem @click="impersonateUser()">
          <SquareUserIcon class="mr-2 size-4" />
          {{ $t("admin.users.impersonate") }}
        </DropdownMenuItem>

        <DropdownMenuItem
          v-if="!user.emailVerified"
          @click="resendVerificationMail()"
        >
          <Repeat1Icon class="mr-2 size-4" />
          {{ $t("admin.users.resendVerificationMail.title") }}
        </DropdownMenuItem>

        <DropdownMenuItem @click="deleteUser()">
          <span
            class="flex items-center text-destructive hover:text-destructive"
          >
            <TrashIcon class="mr-2 size-4" />
            {{ $t("admin.users.delete") }}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
