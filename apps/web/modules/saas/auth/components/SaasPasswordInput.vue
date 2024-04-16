<script setup lang="ts">
  import { EyeIcon, EyeOffIcon } from "lucide-vue-next";
  import type { ComponentFieldBindingObject } from "vee-validate";
  import type { InputHTMLAttributes } from "vue";

  /** @see https://github.com/vuejs/core/issues/8286#issuecomment-1545659320 */
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface HTMLAttributes extends /* @vue-ignore */ InputHTMLAttributes {}

  type Props = HTMLAttributes & ComponentFieldBindingObject;

  const props = defineProps<Props>();

  defineOptions({
    inheritAttrs: false,
  });

  const showPassword = ref(false);
</script>

<template>
  <div class="relative">
    <Input
      v-bind="{ ...$attrs, ...props }"
      :type="showPassword ? 'text' : 'password'"
      class="pr-10"
    />

    <button
      type="button"
      @click="showPassword = !showPassword"
      class="absolute inset-y-0 right-0 flex items-center pr-4 text-xl text-primary"
    >
      <component :is="showPassword ? EyeOffIcon : EyeIcon" class="size-4" />
    </button>
  </div>
</template>
