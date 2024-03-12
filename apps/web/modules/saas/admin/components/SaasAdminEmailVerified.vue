<script lang="ts" setup>
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
        <Icon v-if="verified" name="check" class="h-3 w-3" />
        <Icon v-else name="clock" class="h-3 w-3" />
      </TooltipTrigger>
    </Tooltip>
  </TooltipProvider>
</template>
