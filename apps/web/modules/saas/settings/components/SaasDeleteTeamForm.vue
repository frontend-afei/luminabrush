<script lang="ts" setup>
  import { useToast } from "@/modules/ui/components/toast";

  const { t } = useTranslations();
  const { toast } = useToast();
  const showConfirmation = ref(false);
  const { apiCaller } = useApiCaller();
  const { currentTeam } = useUser();

  const { mutate, status } = apiCaller.team.deleteTeam.useMutation();

  const deleteTeam = async () => {
    if (!currentTeam.value) {
      return;
    }

    try {
      await mutate({
        id: currentTeam.value.id,
      });

      toast({
        variant: "success",
        title: t("settings.notifications.teamDeleted"),
      });

      window.location.reload();
    } catch {
      toast({
        variant: "error",
        title: t("settings.notifications.teamNotDeleted"),
      });
    }
  };
</script>

<template>
  <SaasActionBlock
    danger
    @submit="showConfirmation = true"
    :submit-label="t('settings.team.deleteTeam.submit')"
  >
    <template #title>{{ $t("settings.team.deleteTeam.title") }}</template>
    <p>{{ $t("settings.team.deleteTeam.description") }}</p>
  </SaasActionBlock>

  <AlertDialog
    :open="showConfirmation"
    @update:open="(open: boolean) => (showConfirmation = open)"
  >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle class="text-destructive">
          {{ $t("settings.team.deleteTeam.title") }}
        </AlertDialogTitle>
        <AlertDialogDescription>
          {{ $t("settings.team.deleteTeam.confirmation") }}
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
            deleteTeam();
            showConfirmation = false;
          "
        >
          {{ $t("settings.team.deleteTeam.submit") }}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
