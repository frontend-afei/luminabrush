<script setup lang="ts">
  import { formatDate, formatDistance, parseISO } from "date-fns";
  import type { ChangelogItem } from "../types";

  defineProps<{ items: ChangelogItem[] }>();
</script>

<template>
  <section id="changelog">
    <div class="w-full text-left">
      <div v-for="(item, i) of items" :key="i">
        <hr v-if="i > 0" class="my-4 border" />
        <h3
          class="opacity-50"
          :title="formatDate(parseISO(item.date), 'yyyy-MM-dd')"
        >
          {{
            formatDistance(parseISO(item.date), new Date(), {
              addSuffix: true,
            })
          }}
        </h3>
        <ul class="mt-4 list-disc space-y-2 pl-6">
          <li v-for="(change, j) of item.changes" :key="j">{{ change }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
