<template>
  <Alert variant="primary">
    <MailCheckIcon class="size-4" />
    <template #title>{{ $t("auth.teamInvitation.title") }}</template>
    <template #description?>
      {{ $t("auth.teamInvitation.description") }}
    </template>
  </Alert>
</template>
