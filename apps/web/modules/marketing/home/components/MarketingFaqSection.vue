<script setup lang="ts">
  import type { FAQ } from "../types";

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
  <section id="faq" class="bg-primary/5 py-16 lg:py-24">
    <div class="container max-w-3xl">
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold lg:text-5xl">
          {{ $t("faq.title") }}
        </h1>
        <p class="mt-2 text-lg opacity-50">
          {{ $t("faq.description") }}
        </p>
      </div>

      <Accordion type="single" collapsible class="flex flex-col gap-3">
        <AccordionItem
          v-for="(item, i) of faqItems"
          :key="i"
          :value="`faq-item-${i}`"
          class="rounded-xl border bg-card px-6 py-4"
        >
          <AccordionTrigger class="py-2 text-lg">
            {{ item.question }}
          </AccordionTrigger>
          <AccordionContent>{{ item.answer }}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </section>
</template>
