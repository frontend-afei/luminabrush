<template>
  <footer class="bg-muted py-12 text-muted-foreground">
    <div class="container grid grid-cols-1 gap-6 md:grid-cols-3">
      <div>
        <Logo class="opacity-50 grayscale" />
        <p class="mt-3 text-sm opacity-70">
          Copyright © {{ new Date().getFullYear() }} - All rights reserved.
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <div class="font-bold">Partners</div>
        <a
          href="https://happy-horse-ai.io/"
          title="HappyHorse"
          target="_blank"
          class="block"
        >
          HappyHorse
        </a>
        <a
          href="https://image-to-video.ai/"
          title="Image To Video AI"
          target="_blank"
          class="block"
        >
          Image To Video AI
        </a>
        <a
          href="https://wan-animate.io/"
          title="Wan Animate"
          target="_blank"
          class="block"
        >
          Wan Animate
        </a>
        <a
          href="https://ai-image-editor.com/"
          title="AI Image Editor"
          target="_blank"
          class="block"
        >
          AI Image Editor
        </a>
        <a
          href="https://math-gpt.ai/"
          title="Math AI"
          target="_blank"
          class="block"
        >
          Math AI
        </a>
      </div>

      <div class="flex flex-col gap-2">
        <div class="font-bold">Legal</div>
        <NuxtLink to="/legal/privacy" class="block"> Privacy policy </NuxtLink>
        <NuxtLink to="/legal/terms" class="block">Terms and conditions</NuxtLink>
      </div>
    </div>
  </footer>
</template>
