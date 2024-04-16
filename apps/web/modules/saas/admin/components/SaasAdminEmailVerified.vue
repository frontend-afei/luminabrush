<script lang="ts" setup>
  import { CheckIcon, ClockIcon } from "lucide-vue-next";

  defineProps<{
    verified?: boolean;
  }>();

  const { t } = useTranslations();
</script>

<template>
  <TooltipProvider :delayDuration="0">
    <Tooltip>
      <TooltipContent>
        {{
          verified
            ? t("admin.users.emailVerified.verified")
            : t("admin.users.emailVerified.waiting")
        }}
      </TooltipContent>
      <TooltipTrigger as="span" :class="$attrs.class">
        <component :is="verified ? CheckIcon : ClockIcon" class="size-3" />
      </TooltipTrigger>
    </Tooltip>
  </TooltipProvider>
</template>
