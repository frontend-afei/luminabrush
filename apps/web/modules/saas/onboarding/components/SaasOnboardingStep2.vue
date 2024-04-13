<script setup lang="ts">
  import { toTypedSchema } from "@vee-validate/zod";
  import { ArrowLeftIcon, ArrowRightIcon } from "lucide-vue-next";
  import { useForm } from "vee-validate";
  import { z } from "zod";

  defineEmits<{
    complete: [];
    back: [];
  }>();

  const { apiCaller } = useApiCaller();
  const localePath = useLocalePath();

  const formSchema = toTypedSchema(
    z.object({
      name: z.string().min(1, "Name is required"),
    }),
  );

  const serverError = ref<null | string>(null);

  const { isSubmitting, handleSubmit } = useForm({
    validationSchema: formSchema,
    initialValues: {
      name: "",
    },
  });
</script>

<template>
  <form>
    <div class="flex gap-2">
      <Button
        type="button"
        variant="outline"
        @click="$emit('back')"
        class="flex-1"
      >
        <ArrowLeftIcon class="mr-2 size-4" />
        {{ $t("onboarding.back") }}
      </Button>

      <Button type="submit" :loading="isSubmitting" class="flex-1">
        {{ $t("onboarding.continue") }}
        <ArrowRightIcon class="ml-2 size-4" />
      </Button>
    </div>
  </form>
</template>
