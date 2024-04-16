<script setup lang="ts">
  import { isVNode } from "vue";
  import { useToast } from "./use-toast";
  import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
    type ToastProps,
  } from ".";
  import {
    AlertCircleIcon,
    BellIcon,
    CheckIcon,
    LoaderIcon,
  } from "lucide-vue-next";

  const { toasts } = useToast();

  const variantIcons: Record<NonNullable<ToastProps["variant"]>, Component> = {
    default: BellIcon,
    loading: LoaderIcon,
    success: CheckIcon,
    error: AlertCircleIcon,
  };

  const getToastVariantIcon = (variant: NonNullable<ToastProps["variant"]>) => {
    return variantIcons[variant];
  };
</script>

<template>
  <ToastProvider>
    <Toast v-for="toast in toasts" :key="toast.id" v-bind="toast">
      <div class="grid gap-1">
        <div class="flex items-center gap-3">
          <component
            :is="getToastVariantIcon(toast.variant ?? 'default')"
            class="size-6 shrink-0 opacity-50"
            :class="{ 'animate-spin': toast.variant === 'loading' }"
          />
          <div class="flex-1">
            <ToastTitle v-if="toast.title">
              {{ toast.title }}
            </ToastTitle>
            <template v-if="toast.description">
              <ToastDescription v-if="isVNode(toast.description)">
                <component :is="toast.description" />
              </ToastDescription>
              <ToastDescription v-else>
                {{ toast.description }}
              </ToastDescription>
            </template>
          </div>
        </div>
        <ToastClose />
      </div>
      <component :is="toast.action" />
    </Toast>
    <ToastViewport />
  </ToastProvider>
</template>
