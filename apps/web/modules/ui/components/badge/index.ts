import { type VariantProps, cva } from "class-variance-authority";

export { default as Badge } from "./Badge.vue";

export const badgeVariants = cva(
  "inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase leading-tight",
  {
    variants: {
      variant: {
        success: ["bg-emerald-500/10", "text-emerald-500"],
        info: ["bg-primary/10", "text-primary"],
        warning: ["bg-amber-500/10", "text-amber-500"],
        error: ["bg-rose-500/10", "text-rose-500"],
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
