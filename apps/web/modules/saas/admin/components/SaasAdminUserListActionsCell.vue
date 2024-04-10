<script lang="ts" setup>
  import type { ApiOutput } from "api";

  const { user } = defineProps<{
    user: ApiOutput["admin"]["users"]["users"][number];
  }>();

  const { t } = useTranslations();
  const { apiCaller } = useApiCaller();
  const { toast, dismiss: dismissToast, update: updateToast } = useToast();
  const impersonateMutation = apiCaller.admin.impersonate.useMutation();
  const deleteUserMutation = apiCaller.admin.deleteUser.useMutation();

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
      updateToast(deleteUserToast.id, {
        variant: "success",
        title: t("admin.users.deleteUser.deleted"),
        duration: 5000,
      });
    } catch {
      updateToast(deleteUserToast.id, {
        variant: "error",
        title: t("admin.users.deleteUser.notDeleted"),
        duration: 5000,
      });
    }
  };
</script>

<template>
  <div class="flex flex-row justify-end gap-2">
    <DropdownMenuRoot>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <Icon name="more" class="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem @click="impersonateUser()">
          <Icon name="impersonate" class="mr-2 h-4 w-4" />
          {{ $t("admin.users.impersonate") }}
        </DropdownMenuItem>
        <DropdownMenuItem @click="deleteUser()">
          <span
            class="text-destructive hover:text-destructive flex items-center"
          >
            <Icon name="delete" class="mr-2 h-4 w-4" />
            {{ $t("admin.users.delete") }}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  </div>
</template>
