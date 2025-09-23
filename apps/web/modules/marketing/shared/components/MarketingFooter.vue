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
          href="https://math-gpt.ai/"
          title="Math AI"
          target="_blank"
          class="block"
        >
          Math AI
        </a>
        <a
          href="https://math-tutor.ai/"
          title="MathTutor"
          target="_blank"
          class="block"
        >
          MathTutor
        </a>
        <a
          href="https://image-gpt.ai/"
          title="ImageGPT"
          target="_blank"
          class="block"
        >
          ImageGPT
        </a>
        <a
          href="https://nano-banana-ai.org/"
          title="Nano Banana AI"
          target="_blank"
          class="block"
        >
          Nano Banana AI
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
          href="https://watermark-remover.io/"
          title="Watermark Remover"
          target="_blank"
          class="block"
        >
          Watermark Remover
        </a>
        <a
          href="https://wan-animate.io/"
          title="Wan Animate"
          target="_blank"
          class="block"
        >
          Wan Animate
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
