<script setup lang="ts">
  import type { FAQ } from "@/modules/marketing/faq/types";
  const { t } = useTranslations();

  definePageMeta({
    layout: "marketing",
  });

  const faqItems: FAQ[] = [
    {
      question: t("faq.questions.refundPolicy"),
      answer: t("faq.answers.refundPolicy"),
    },
    {
      question: t("faq.questions.cancelSubscription"),
      answer: t("faq.answers.cancelSubscription"),
    },
    {
      question: t("faq.questions.changePlan"),
      answer: t("faq.answers.changePlan"),
    },
    {
      question: t("faq.questions.freeTrial"),
      answer: t("faq.answers.freeTrial"),
    },
  ];
</script>

<template>
  <div class="pb-24 pt-12">
    <div class="container">
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold lg:text-5xl">
          {{ $t("faq.title") }}
        </h1>
        <p class="mt-3 text-lg opacity-50">
          {{ $t("faq.description") }}
        </p>
      </div>

      <div class="mx-auto max-w-2xl">
        <MarketingFaqSection :items="faqItems" />
      </div>
    </div>
  </div>
</template>
