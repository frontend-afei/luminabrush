<script setup lang="ts">
  const emit = defineEmits<{
    submit: [];
  }>();

  const props = defineProps<{
    isSubmitDisabled?: boolean;
    isSubmitting?: boolean;
    submitLabel?: string;
    danger?: boolean;
  }>();

  const { t } = useTranslations();

  const hasSubmitEventListener = computed(
    () => !!getCurrentInstance()?.vnode.props?.onSubmit,
  );
</script>

<template>
  <Card :class="{ 'border border-destructive/50': danger }">
    <form @submit.prevent="emit('submit')">
      <CardHeader :class="{ 'text-destructive': danger }">
        <CardTitle>
          <slot name="title" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <slot />

        <div
          v-if="hasSubmitEventListener"
          class="mt-6 flex justify-end border-t pt-3"
        >
          <Button
            type="submit"
            :variant="danger ? 'error' : 'default'"
            :disabled="props.isSubmitDisabled"
            :loading="props.isSubmitting"
          >
            {{ submitLabel ?? t("settings.save") }}
          </Button>
        </div>
      </CardContent>
    </form>
  </Card>
</template>
