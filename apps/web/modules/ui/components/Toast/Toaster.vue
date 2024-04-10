<script setup lang="ts">
  import {
    AlertCircleIcon,
    BellIcon,
    CheckIcon,
    LoaderIcon,
  } from "lucide-vue-next";
  import type { ToastVariantProps } from "./ToastRoot.vue";

  const { state: toasts, dismiss } = useToast();

  const variantIcons = computed<
    Record<NonNullable<ToastVariantProps["variant"]>, Component>
  >(() => ({
    default: BellIcon,
    loading: LoaderIcon,
    success: CheckIcon,
    error: AlertCircleIcon,
  }));

  const getToastIcon = ({ toast }: { toast: Toast }): any => {
    return toast.icon ?? toast.variant != null
      ? variantIcons.value[toast.variant!]
      : undefined;
  };
</script>

<template>
  <ToastProvider>
    <ToastRoot
      v-for="toast of toasts"
      :key="toast.id"
      v-bind="{ id: toast.id, variant: toast.variant }"
      @update:open="() => dismiss(toast.id)"
    >
      <div class="flex items-center gap-3">
        <component
          v-if="getToastIcon({ toast })"
          :is="getToastIcon({ toast })"
          class="size-6 shrink-0 opacity-50"
          :class="toast.variant === 'loading' ? 'animate-spin' : ''"
        />

        <div class="grid gap-1">
          <ToastTitle v-if="toast.title">{{ toast.title }}</ToastTitle>
          <ToastDescription v-if="toast.description">{{
            toast.description
          }}</ToastDescription>
        </div>
      </div>

      <ToastClose />
    </ToastRoot>

    <ToastViewport />
  </ToastProvider>
</template>
