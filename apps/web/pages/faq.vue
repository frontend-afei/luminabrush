<script setup lang="ts">
  import type { FAQ } from "@/modules/marketing/faq/types";

  definePageMeta({
    layout: "marketing",
  });

  const faqItems: FAQ[] = [
    {
      question: "What is the refund policy?",
      answer:
        "We offer a 30-day money-back guarantee if you're not happy with our product.",
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription by visiting the billing page.",
    },
    {
      question: "Can I change my plan?",
      answer:
        "Yes, you can change your plan at any time by visiting the billing page.",
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 14-day free trial.",
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
