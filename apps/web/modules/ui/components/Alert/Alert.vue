<script setup lang="ts">
  const alertVariants = cva(
    "relative w-full rounded-lg border p-6 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-6 [&>svg]:top-6 [&>svg]:text-foreground [&>svg~*]:pl-8",
    {
      variants: {
        variant: {
          default: "bg-background text-foreground",
          primary:
            "border-primary/20 bg-primary/10 text-primary [&>svg]:text-primary",
          error:
            "border-destructive/20 bg-destructive/10 text-destructive [&>svg]:text-destructive",
          success:
            "border-success/20 bg-success/10 text-success [&>svg]:text-success",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    },
  );

  type AlertVariantProps = VariantProps<typeof alertVariants>;
  type Props = {
    variant?: AlertVariantProps["variant"];
    class?: ClassProp;
  };

  const props = withDefaults(defineProps<Props>(), {
    variant: "default",
  });
</script>

<template>
  <div role="alert" :class="cn(alertVariants({ variant, class: props.class }))">
    <slot />

    <h5
      v-if="$slots.title"
      class="mb-1 font-medium leading-none tracking-tight"
    >
      <slot name="title" />
    </h5>

    <div v-if="$slots.description" class="text-sm [&_p]:leading-relaxed">
      <slot name="description" />
    </div>
  </div>
</template>
