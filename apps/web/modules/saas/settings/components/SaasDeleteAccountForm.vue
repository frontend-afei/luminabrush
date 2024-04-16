<script lang="ts" setup>
  import { useToast } from "@/modules/ui/components/toast";

  const { t } = useTranslations();
  const { toast } = useToast();
  const router = useRouter();
  const showConfirmation = ref(false);
  const { apiCaller } = useApiCaller();

  const { mutate, status } = apiCaller.auth.deleteAccount.useMutation();

  const deleteAccount = async () => {
    try {
      await mutate();

      toast({
        variant: "success",
        title: t("settings.notifications.accountDeleted"),
      });
      router.replace("/");
    } catch {
      toast({
        variant: "error",
        title: t("settings.notifications.accountNotDeleted"),
      });
    }
  };
</script>

<template>
  <SaasActionBlock
    danger
    @submit="showConfirmation = true"
    :submit-label="t('settings.account.deleteAccount.submit')"
  >
    <template #title>{{ $t("settings.account.deleteAccount.title") }}</template>
    <p>{{ $t("settings.account.deleteAccount.description") }}</p>
  </SaasActionBlock>

  <AlertDialog
    :open="showConfirmation"
    @update:open="(open: boolean) => (showConfirmation = open)"
  >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="text-destructive">
          {{ $t("settings.account.deleteAccount.title") }}
        </AlertDialogTitle>
        <AlertDialogDescription>
          {{ $t("settings.account.deleteAccount.confirmation") }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <Button variant="outline" @click="showConfirmation = false">
          {{ $t("common.confirmation.cancel") }}
        </Button>
        <Button
          variant="error"
          :loading="status === 'pending'"
          @click="
            deleteAccount();
            showConfirmation = false;
          "
        >
          {{ $t("settings.account.deleteAccount.submit") }}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
