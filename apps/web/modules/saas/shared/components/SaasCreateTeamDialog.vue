<script setup lang="ts">
  const { createTeamDialogOpen } = useDashboardState();

  const emit = defineEmits<{
    success: [id: string];
  }>();

  const handleCreateTeamSuccess = async (newTeamId: string) => {
    emit("success", newTeamId);
    createTeamDialogOpen.value = false;
  };
</script>

<template>
  <Dialog
    :open="createTeamDialogOpen"
    @update:open="(newVal) => (createTeamDialogOpen = newVal)"
  >
    <DialogContent>
      <DialogDescription class="sr-only">
        {{ $t("createTeam.title") }}
      </DialogDescription>
      <DialogHeader>
        <DialogTitle>
          {{ $t("createTeam.title") }}
        </DialogTitle>
      </DialogHeader>

      <SaasCreateTeamForm
        @success="(newTeam) => handleCreateTeamSuccess(newTeam.id)"
      />
    </DialogContent>
  </Dialog>
</template>
