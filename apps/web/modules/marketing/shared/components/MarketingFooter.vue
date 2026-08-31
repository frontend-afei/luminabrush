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
          href="https://minimaxh3max.io"
          title="MiniMax H3 Max"
          target="_blank"
          class="block"
        >
          MiniMax H3 Max
        </a>
        <a
          href="https://sparkvid.ai"
          title="SparkVid"
          target="_blank"
          class="block"
        >
          SparkVid
        </a>
        <a
          href="https://animove.ai"
          title="AI Image Editor"
          target="_blank"
          class="block"
        >
          Animove
        </a>
        <a
          href="https://image-to-video.ai"
          title="Image To Video AI"
          target="_blank"
          class="block"
        >
          Image To Video AI
        </a>
        <a
          href="https://ai-image-editor.com"
          title="AI Image Editor"
          target="_blank"
          class="block"
        >
          AI Image Editor
        </a>
        <a
          href="https://math-gpt.ai"
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
