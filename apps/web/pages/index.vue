<script setup lang="ts">
  import {
    Brush,
    Lightbulb,
    Eye,
    Settings2,
    Layers,
    Layout,
    ChevronDownIcon,
  } from "lucide-vue-next";

  definePageMeta({
    layout: "marketing",
  });
  useSeoMeta({
    title: "LuminaBrush - AI Drawing Tool for Illumination Effects",
    description:
      "Transform your art with LuminaBrush, the AI-powered lighting tool. Enjoy real-time preview, custom tools, and advanced layers. Create stunning art for free!",
  });

  const features = [
    {
      title: "Unique Brush Technology",
      description:
        "The revolutionary brush engine of LuminaBrush delivers unparalleled realism and precision, perfectly simulating traditional artistic techniques",
      icon: Brush,
    },
    {
      title: "AI-Powered Lighting",
      description:
        "Experience the power of LuminaBrush's intelligent algorithms that transform ordinary artwork with sophisticated lighting patterns",
      icon: Lightbulb,
    },
    {
      title: "Real-time Preview",
      description:
        "Watch your creative vision come to life with our instant preview system, enabling rapid experimentation and refinement",
      icon: Eye,
    },
    {
      title: "Customizable Tools",
      description:
        "The versatile toolkit of Lumina Brush allows you to fine-tune every aspect of your brushes, from texture to opacity, for truly unique artistic expression",
      icon: Settings2,
    },
    {
      title: "Advanced Layer System",
      description:
        "Master complex compositions with LuminaBrush, using the professional-grade layer management system for complete creative control",
      icon: Layers,
    },
    {
      title: "Intuitive Interface",
      description:
        "Focus on your creativity with Lumina Brush, utilizing the streamlined workspace designed for maximum efficiency and minimal learning curve",
      icon: Layout,
    },
    {
      title: "Two-Stage Framework",
      description:
        "LuminaBrush employs a revolutionary two-stage approach that first transforms images to achieve uniform lighting, then generates precise illumination effects guided by user input",
      icon: Layers,
    },
    {
      title: "Flux Integration",
      description:
        "Built on the cutting-edge Flux framework, LuminaBrush provides unparalleled consistency and professional-grade results in demanding artistic projects",
      icon: Layout,
    },
    {
      title: "Advanced Control System",
      description:
        "Achieve precise control with LuminaBrush through the responsive brush system while maintaining professional output quality",
      icon: Settings2,
    },
  ];

  const demos = [
    {
      id: 1,
      title: "Portrait Enhancement",
      image: "/demo1.jpg",
    },
    {
      id: 2,
      title: "Landscape Lighting",
      image: "/demo2.jpg",
    },
  ];

  const workflow = [
    {
      title: "Import Your Art",
      description:
        "Upload your artwork to the processing system of LuminaBrush",
    },
    {
      title: "Apply Effects",
      description:
        "Use intuitive brushes to scribble for sophisticated lighting effects",
    },
    {
      title: "Write Prompts",
      description:
        "Customize lighting and background with natural language prompts",
    },
    {
      title: "AI Processing",
      description: "Our advanced AI analyzes and processes your image",
    },
    // {
    //   title: "Export & Share",
    //   description: "Download your enhanced artwork in professional quality",
    // },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Professional Digital Artist",
      rating: 5,
      content:
        "LuminaBrush has revolutionized my workflow. The AI-powered lighting effects are incredibly natural, and the real-time preview feature helps me work faster than ever. It's become an essential part of my digital art toolkit.",
    },
    {
      name: "Michael Rodriguez",
      role: "Photography Studio Owner",
      rating: 5,
      content:
        "As an AI photo editor, Lumina Brush stands out from the competition. The two-stage framework produces remarkably consistent results, and the intuitive interface makes complex lighting adjustments feel effortless.",
    },
    {
      name: "Emma Thompson",
      role: "Concept Artist",
      rating: 5,
      content:
        "I've tried many AI image editors, but the precision and control of Lumina Brush are unmatched. The advanced layer system and customizable tools give me the flexibility I need for professional projects.",
    },
    {
      name: "David Park",
      role: "Game Art Director",
      rating: 5,
      content:
        "LuminaBrush's AI photo editor capabilities have transformed our concept art pipeline. The speed and quality of the lighting effects are remarkable, saving us countless hours in post-production.",
    },
    {
      name: "Lisa Zhang",
      role: "Digital Illustrator",
      rating: 5,
      content:
        "LuminaBrush is a game-changer for digital artists. The AI image editor features are incredibly sophisticated, yet easy to use. I especially love how it preserves the original artwork's integrity while enhancing the lighting.",
    },
    {
      name: "James Wilson",
      role: "Visual Effects Supervisor",
      rating: 5,
      content:
        "In my 15 years of industry experience, Lumina Brush is the most innovative lighting tool I've used. The AI-powered effects are not just impressive - they're production-ready and consistently reliable.",
    },
  ];

  const plans = [
    {
      name: "Starter",
      price: 0,
      features: [
        "Basic lighting effects",
        "720p export resolution",
        "Community support",
        "2 projects per month",
      ],
      recommended: false,
    },
    {
      name: "Professional",
      price: 29,
      features: [
        "Advanced lighting effects",
        "4K export resolution",
        "Priority support",
        "Unlimited projects",
      ],
      recommended: true,
    },
    {
      name: "Enterprise",
      price: 99,
      features: [
        "Custom lighting presets",
        "8K export resolution",
        "Dedicated support",
        "API access",
      ],
      recommended: false,
    },
  ];

  const faqs = ref([
    {
      question:
        "What makes LuminaBrush different from other image editing tools?",
      answer:
        "LuminaBrush combines advanced AI technology with intuitive controls, allowing artists to achieve professional lighting effects with unprecedented ease and precision.",
      isOpen: true,
    },
    {
      question: "How does LuminaBrush's two-stage lighting process work?",
      answer:
        "LuminaBrush's revolutionary two-stage approach first transforms images to achieve uniform lighting conditions, then generates precise illumination effects guided by user input. This ensures exceptional control and consistency in the final output.",
      isOpen: false,
    },
    {
      question: "Can LuminaBrush integrate with my existing workflow?",
      answer:
        "Yes, LuminaBrush seamlessly integrates with industry-standard software and existing digital art workflows. Its advanced lighting manipulation system is designed to enhance your creative process without disrupting your established workflow.",
      isOpen: false,
    },
    {
      question: "What visual effects can I create with Luminar Brush?",
      answer:
        "Luminar Brush offers a comprehensive suite of effects including atmospheric ambience, directional illumination, multi-source setups, natural environments, dynamic transitions, color temperature control, rim highlights, and volumetric effects.",
      isOpen: false,
    },
    {
      question: "Is Luminar Brush suitable for professional use?",
      answer:
        "Absolutely. Luminar Brush is trusted by professional digital artists, photographers, and concept artists worldwide. Its sophisticated AI-powered system delivers professional-grade results while maintaining intuitive usability.",
      isOpen: false,
    },
    {
      question: "How does LuminaBrush's AI technology enhance my artwork?",
      answer:
        "LuminaBrush's advanced AI analyzes and optimizes lighting conditions while preserving your artistic vision. It processes complex lighting scenarios with remarkable accuracy and speed, enabling both subtle adjustments and dramatic transformations.",
      isOpen: false,
    },
  ]);

  const capabilities = [
    {
      title: "Atmospheric Effects",
      description:
        "Create sophisticated atmospheric lighting with intelligent diffusion",
    },
    {
      title: "Directional Lighting",
      description:
        "Apply precise directional illumination using advanced ray-tracing",
    },
    {
      title: "Multi-Light Scenarios",
      description:
        "Generate complex multi-light setups with intelligent light interaction",
    },
    {
      title: "Natural Ambient",
      description:
        "Achieve realistic ambient lighting through advanced mapping",
    },
    {
      title: "Dynamic Transitions",
      description:
        "Implement smooth lighting transitions with temporal coherence",
    },
    {
      title: "Color Temperature",
      description: "Fine-tune color temperature with enhancement tools",
    },
  ];
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div class="container mx-auto px-6 py-24">
        <div class="flex flex-col items-center gap-4 lg:flex-row">
          <div class="space-y-8 lg:w-1/2">
            <h1 class="text-5xl font-bold leading-tight">
              Transform Your Digital Art with LuminaBrush
            </h1>
            <p class="text-xl">
              Advanced AI-powered lighting effects for artists and creators
            </p>
            <a
              href="#try-luminabrush"
              class="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-purple-600 transition hover:bg-opacity-90"
            >
              Try LuminaBrush Now
            </a>
          </div>
          <div class="mt-10 lg:mt-0 lg:w-1/2">
            <img
              src="/images/luminabrush-hero.png"
              alt="LuminaBrush Hero"
              class="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-gray-50 py-20">
      <div class="container mx-auto px-6">
        <h2 class="mb-16 text-center text-4xl font-bold">
          Key Features of LuminaBrush AI
        </h2>
        <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="rounded-xl bg-white p-8 shadow-lg transition hover:shadow-xl"
          >
            <div class="mb-4 text-3xl text-purple-600">
              <component :is="feature.icon" />
            </div>
            <h3 class="mb-4 text-xl font-semibold">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo Section -->
    <!-- <section class="py-20">
      <div class="container mx-auto px-6">
        <h2 class="mb-16 text-center text-4xl font-bold">
          See LuminaBrush in Action
        </h2>
        <div class="grid gap-8 md:grid-cols-2">
          <div
            v-for="demo in demos"
            :key="demo.id"
            class="group relative overflow-hidden rounded-xl"
          >
            <img
              :src="demo.image"
              :alt="demo.title"
              class="w-full transition group-hover:scale-105"
            />
            <div
              class="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-6"
            >
              <p class="text-lg font-medium text-white">{{ demo.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Workflow Section -->
    <section class="bg-gray-50 py-20">
      <div class="container mx-auto px-6">
        <h2 class="mb-6 text-center text-4xl font-bold">
          How LuminaBrush Works
        </h2>
        <p class="mx-auto mb-16 max-w-3xl text-center text-xl text-gray-600">
          Transform your artwork in minutes with our intuitive process
        </p>
        <div class="grid gap-8 md:grid-cols-4">
          <div
            v-for="(step, index) in workflow"
            :key="step.title"
            class="relative flex flex-col items-center"
          >
            <div
              class="mb-6 flex size-16 items-center justify-center rounded-full bg-purple-600 text-2xl font-bold text-white"
            >
              {{ index + 1 }}
            </div>
            <h3 class="mb-4 text-center text-xl font-semibold">
              {{ step.title }}
            </h3>
            <p class="text-center text-gray-600">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <!-- <section class="bg-gray-50 py-20">
      <div class="container mx-auto px-6">
        <h2 class="mb-6 text-center text-4xl font-bold">Choose Your Plan</h2>
        <p class="mx-auto mb-16 max-w-3xl text-center text-xl text-gray-600">
          Flexible options for artists at every stage
        </p>
        <div class="grid gap-8 md:grid-cols-3">
          <div
            v-for="plan in plans"
            :key="plan.name"
            class="overflow-hidden rounded-xl bg-white shadow-lg"
          >
            <div class="p-8">
              <h3 class="mb-4 text-2xl font-bold">{{ plan.name }}</h3>
              <div class="mb-6">
                <span class="text-4xl font-bold">${{ plan.price }}</span>
                <span class="text-gray-600">/month</span>
              </div>
              <ul class="mb-8 space-y-4">
                <li
                  v-for="feature in plan.features"
                  :key="feature"
                  class="flex items-center"
                >
                  <CheckIcon class="mr-2 size-5 text-green-500" />
                  <span>{{ feature }}</span>
                </li>
              </ul>
              <button
                class="w-full rounded-lg py-3 font-semibold transition"
                :class="[
                  plan.recommended
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
                ]"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <section id="try-luminabrush" class="bg-white pt-16 pb-4">
      <!-- <p class="bg-white p-6 text-center text-gray-600">
        2025 May 01: The huggingface space in under maintenance now ...
      </p> -->
      <div>
        <iframe
          src="https://jasperai-lbm-relighting.hf.space/"
          class="h-[600px] w-full"
          title="LuminaBrush Demo"
        ></iframe>
      </div>
    </section>

    <!-- Capabilities Section -->
    <!-- <section class="py-20">
      <div class="container mx-auto px-6">
        <h2 class="mb-16 text-center text-4xl font-bold">
          Advanced Capabilities of LuminaBrush
        </h2>
        <div class="grid gap-8 md:grid-cols-3">
          <div
            v-for="cap in capabilities"
            :key="cap.title"
            class="rounded-xl bg-white p-8 shadow-lg transition hover:shadow-xl"
          >
            <h3 class="mb-4 text-xl font-semibold">{{ cap.title }}</h3>
            <p class="text-gray-600">{{ cap.description }}</p>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Testimonials Section -->
    <section class="bg-gradient-to-b from-background to-card py-20">
      <div class="container mx-auto px-4">
        <h2 class="mb-16 text-center text-3xl font-bold md:text-4xl">
          Trusted by Professionals Worldwide
        </h2>
        <div class="grid gap-8 md:grid-cols-3">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            class="group rounded-2xl bg-card p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div class="mb-6 flex items-center">
              <div
                class="flex size-12 items-center justify-center rounded-full bg-purple-100"
              >
                <span class="text-xl font-semibold text-purple-600">
                  {{ testimonial.name.charAt(0) }}
                </span>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-semibold">{{ testimonial.name }}</h4>
                <p class="text-foreground/60">{{ testimonial.role }}</p>
              </div>
            </div>
            <div class="mb-4 flex text-yellow-400">
              <svg
                v-for="star in testimonial.rating"
                :key="star"
                xmlns="http://www.w3.org/2000/svg"
                class="size-5 fill-current"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
            </div>
            <p class="text-foreground/80">{{ testimonial.content }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Section -->
    <!-- <section class="bg-card py-20">
      <div class="container mx-auto px-6">
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="mb-8 text-4xl font-bold">Revolutionary Technology</h2>
          <p class="mb-8 text-xl">
            At the heart of LuminaBrush lies a pioneering approach to image
            lighting manipulation. Our innovative two-stage process enables
            unprecedented control while maintaining natural image qualities.
          </p>
          <p class="text-xl">
            The sophisticated system allows artists to achieve both subtle
            adjustments and dramatic transformations with equal precision,
            making it the premier choice for professional digital artists
            worldwide.
          </p>
        </div>
      </div>
    </section> -->

    <!-- FAQ Section -->
    <section class="py-20">
      <div class="container mx-auto px-6">
        <div class="mx-auto mb-16 max-w-4xl text-center">
          <h2 class="mb-4 text-center text-4xl font-bold">
            Frequently Asked Questions
          </h2>
          <p class="text-lg text-foreground/80">
            Find answers to common questions about LuminaBrush
          </p>
        </div>
        <div class="mx-auto max-w-4xl space-y-6">
          <div
            v-for="faq in faqs"
            :key="faq.question"
            class="rounded-lg border border-gray-200 bg-card transition-all duration-200 hover:border-purple-600"
          >
            <button
              @click="faq.isOpen = !faq.isOpen"
              class="flex w-full items-center justify-between px-6 py-4 text-left"
            >
              <span class="font-semibold">{{ faq.question }}</span>
              <ChevronDownIcon
                class="size-5 transition"
                :class="[faq.isOpen ? 'rotate-180' : '']"
              />
            </button>
            <div v-show="faq.isOpen" class="px-6 pb-4">
              <p class="text-gray-600">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="bg-gradient-to-r from-purple-600 to-blue-600 py-20 text-white"
    >
      <div class="container mx-auto px-6 text-center">
        <h2 class="mb-8 text-4xl font-bold">
          Ready to Transform Your Artwork?
        </h2>
        <p class="mx-auto mb-12 max-w-2xl text-xl">
          Join thousands of artists already using LuminaBrush to create stunning
          lighting effects
        </p>
        <a
          href="#try-luminabrush"
          class="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-purple-600 transition hover:bg-opacity-90"
        >
          Get Started Free
        </a>
      </div>
    </section>
  </div>
</template>
