<script setup lang="ts">
  import {
    ArrowRightIcon,
    CloudIcon,
    PaperclipIcon,
    PhoneIcon,
    PointerIcon,
    StarIcon,
    UploadIcon,
  } from "lucide-vue-next";
</script>

<template>
  <section class="py-24 text-card-foreground">
    <div class="container">
      <div class="text-center">
        <h1 class="text-4xl font-bold lg:text-5xl">
          Features your clients will love
        </h1>
        <p class="mt-3 text-lg text-foreground/60">
          In this section you can showcase the features of your SaaS.
        </p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-8">
        <div
          class="grid items-center gap-8 rounded-2xl border bg-card/50 p-8 lg:grid-cols-2 lg:gap-16"
        >
          <div class="overflow-hidden rounded-xl bg-primary/10 p-12">
            <NuxtImg
              src="/images/feature-image.svg"
              class="block dark:hidden"
              alt="Feature 1"
            />
            <NuxtImg
              src="/images/feature-image-dark.svg"
              class="hidden dark:block"
              alt="Feature 1"
            />
          </div>

          <div>
            <h3 class="text-3xl font-bold">Feature A</h3>
            <p class="mt-2 leading-normal text-foreground/60">
              This is a brilliant feature. And below you can see some reasons
              why. This is basically just a dummy text.
            </p>
            <Button variant="secondary" size="sm" class="mt-4">
              Learn more
              <ArrowRightIcon class="ml-2 size-4" />
            </Button>

            <div class="mt-6 grid grid-cols-2 gap-4">
              <div class="text-card-foreground">
                <StarIcon class="size-6 text-3xl text-highlight" />
                <strong class="mt-2 block">Benefit 1</strong>
                <p class="text-foreground/60">This is a brilliant benefit.</p>
              </div>
              <div class="text-card-foreground">
                <PointerIcon class="size-6 text-3xl text-highlight" />
                <strong class="mt-2 block">Benefit 2</strong>
                <p class="text-foreground/60">This is a brilliant benefit.</p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="grid items-center gap-8 rounded-2xl border bg-card/50 p-8 lg:grid-cols-2 lg:gap-16"
        >
          <div class="overflow-hidden rounded-xl bg-primary/10 p-12 lg:order-2">
            <NuxtImg
              src="/images/feature-image.svg"
              class="block dark:hidden"
              alt="Feature 2"
            />
            <NuxtImg
              src="/images/feature-image-dark.svg"
              class="hidden dark:block"
              alt="Feature 2"
            />
          </div>

          <div class="lg:order-1">
            <h3 class="text-3xl font-bold">Feature B</h3>
            <p class="mt-2 leading-normal text-foreground/60">
              This is a brilliant feature. And below you can see some reasons
              why. This is basically just a dummy text.
            </p>
            <Button variant="secondary" size="sm" class="mt-4">
              Learn more
              <ArrowRightIcon class="ml-2 size-4" />
            </Button>

            <div class="mt-6 grid grid-cols-2 gap-4">
              <div class="text-card-foreground">
                <UploadIcon class="size-6 text-3xl text-highlight" />
                <strong class="mt-2 block">Benefit 1</strong>
                <p class="text-foreground/60">This is a brilliant benefit.</p>
              </div>
              <div class="text-card-foreground">
                <CloudIcon class="size-6 text-3xl text-highlight" />
                <strong class="mt-2 block">Benefit 2</strong>
                <p class="text-foreground/60">This is a brilliant benefit.</p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="grid items-center gap-8 rounded-2xl border bg-card/50 p-8 lg:grid-cols-2 lg:gap-16"
        >
          <div class="overflow-hidden rounded-xl bg-primary/10 p-12">
            <NuxtImg
              src="/images/feature-image.svg"
              class="block dark:hidden"
              alt="Feature 3"
            />
            <NuxtImg
              src="/images/feature-image-dark.svg"
              class="hidden dark:block"
              alt="Feature 3"
            />
          </div>

          <div>
            <h3 class="text-3xl font-bold">Feature C</h3>
            <p class="mt-2 leading-normal text-foreground/60">
              This is a brilliant feature. And below you can see some reasons
              why. This is basically just a dummy text.
            </p>
            <Button variant="secondary" size="sm" class="mt-4">
              Learn more
              <ArrowRightIcon class="ml-2 size-4" />
            </Button>

            <div class="mt-6 grid grid-cols-2 gap-4">
              <div class="text-card-foreground">
                <PhoneIcon class="size-6 text-3xl text-highlight" />
                <strong class="mt-2 block">Benefit 1</strong>
                <p class="text-foreground/60">This is a brilliant benefit.</p>
              </div>
              <div class="text-card-foreground">
                <PaperclipIcon class="size-6 text-3xl text-highlight" />
                <strong class="mt-2 block">Benefit 2</strong>
                <p class="text-foreground/60">This is a brilliant benefit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
