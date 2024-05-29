<template>
  <div
    class="relative min-h-screen max-w-full overflow-x-hidden bg-gradient-to-b from-card from-0% to-background to-[50vh]"
  >
    <div
      class="absolute left-1/2 z-10 ml-[-500px] h-[500px] w-[1000px] rounded-full bg-gradient-to-r from-primary via-background to-highlight opacity-15 blur-[150px]"
    ></div>
    <div class="relative z-20">
      <slot />
    </div>
  </div>
</template>
