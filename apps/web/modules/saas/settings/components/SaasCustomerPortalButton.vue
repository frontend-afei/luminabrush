<script setup lang="ts">
  import { CreditCardIcon } from "lucide-vue-next";
  import { useToast } from "@/modules/ui/components/toast";

  const props = defineProps<{
    subscriptionId: string;
  }>();

  const { t } = useTranslations();
  const { toast } = useToast();
  const { apiCaller } = useApiCaller();

  const mutationPending = ref(false);

  const createCustomerPortal = async () => {
    if (!process.client || typeof window === "undefined") {
      return;
    }

    mutationPending.value = true;

    try {
      const url = await apiCaller.billing.createCustomerPortalLink.mutate({
        subscriptionId: props.subscriptionId,
        redirectUrl: window.location.href,
      });

      navigateTo(url, {
        external: true,
      });
    } catch (error) {
      toast({
        variant: "error",
        title: t(
          "settings.billing.createCustomerPortal.notifications.error.title",
        ),
      });
    } finally {
      mutationPending.value = false;
    }
  };
</script>

<template>
  <Button
    variant="default"
    @click="createCustomerPortal"
    :loading="mutationPending"
  >
    <CreditCardIcon class="mr-2 size-4" />
    {{ $t("settings.billing.createCustomerPortal.label") }}
  </Button>
</template>
