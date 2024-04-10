<script setup lang="ts">
  import type { FAQ } from "../types";

  defineProps<{ items: FAQ[] }>();
</script>

<template>
  <section id="faq">
    <Accordion type="single" collapsible class="flex flex-col gap-3">
      <AccordionItem
        v-for="(item, i) of items"
        :key="i"
        :value="`faq-item-${i}`"
        class="rounded-lg border px-6 py-4"
      >
        <AccordionTrigger class="py-2 text-lg">
          {{ item.question }}
        </AccordionTrigger>
        <AccordionContent>{{ item.answer }}</AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
</template>
