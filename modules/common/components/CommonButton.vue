<template>
  <component :is="component" :class="button({ intent, size })" :to="isLink ? props.to : undefined" :disabled="disabled">
    <slot v-if="!props.isLoading" />
    <Icon v-else name="feather:loader" class="animate-spin" />
  </component>
</template>

<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import type { RouteLocationRaw } from 'vue-router'

const NuxtLink = resolveComponent('NuxtLink')

const button = cva('button', {
  variants: {
    intent: {
      primary: [
        'bg-black',
        'text-white',
        'border-transparent',
        'focus:ring-transparent',
        // hover
        'hover:bg-black',
        'hover:bg-opacity-90',
        // dark mode
        'dark:bg-white',
        'dark:text-black',
        'dark:hover:bg-white',
        'dark:hover:bg-opacity-90',
        'dark:focus:bg-opacity-80'
      ],
      'primary-outline': [
        'bg-transparent',
        'text-black',
        'border-zinc-100',
        // hover
        'hover:bg-zinc-100',
        // focus
        'focus:bg-zinc-200',
        'focus:border-zinc-200',
        // dark mode
        'dark:text-white',
        'dark:border-zinc-800',
        'dark:hover:bg-zinc-800',
        'dark:focus:bg-zinc-700',
        'dark:focus:border-zinc-700'
      ],
      'primary-ghost': [
        'bg-black',
        'bg-opacity-5',
        'text-black',
        'border-transparent',
        // hover
        'hover:bg-opacity-10',
        // focus
        'focus:bg-opacity-20',
        // dark mode
        'dark:bg-white',
        'dark:text-white',
        'dark:bg-opacity-5',
        'dark:hover:bg-opacity-10',
        'dark:focus:bg-opacity-20'
      ],
      secondary: ['bg-white', 'text-zinc-800', 'border-zinc-400', 'hover:bg-zinc-100'],
      github: ['bg-zinc-900', 'text-white', 'border-transparent', 'hover:bg-zinc-800'],
      discord: ['bg-[#7289DA]', 'text-white', 'border-transparent', 'hover:bg-[#5E74C0]'],
      google: ['bg-[#4285F4]', 'text-white', 'border-transparent', 'hover:bg-[#357AE8]'],
      apple: ['bg-black', 'text-white', 'border-transparent', 'hover:bg-[#1E1E1E]', 'ring-black'],
      twitter: ['bg-[#1DA1F2]', 'text-white', 'border-transparent', 'hover:bg-[#1A94E0]']
    },
    size: {
      xsmall: ['text-xs', 'py-1', 'px-2', 'rounded-lg', 'h-8'],
      small: ['text-sm', 'py-2', 'px-4', 'rounded-lg', 'h-10'],
      medium: ['text-base', 'py-3', 'px-6', 'rounded-xl', 'h-12'],
      large: ['text-lg', 'py-4', 'px-8', 'rounded-2xl', 'h-14']
    }
  },
  compoundVariants: [
    {
      class: [
        'font-semibold',
        'border-2',
        'hover:no-underline',
        // alignment inside button
        'flex',
        'items-center',
        'gap-2',
        'justify-center',
        // transition
        'transition-all',
        'duration-150',
        'ease-in-out',
        // focus ring
        'focus:ring-0',
        'outline-none',
        // make sure content doesn't wrap
        'whitespace-nowrap',
        // disabled styles
        'disabled:opacity-50',
        'disabled:cursor-not-allowed',
        'disabled:pointer-events-none',
        // style svg icons inside a button
        '[&>svg:not(.animate-spin)]:scale-110'
      ]
    }
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'medium'
  }
})

type ButtonProps = Required<VariantProps<typeof button>>;
const props = defineProps<{
  intent: ButtonProps['intent'];
  size: ButtonProps['size']
  isLoading?: boolean;
  disabled?: boolean;
  as?: 'button' | 'link'
  to?: RouteLocationRaw
}>()

const isLink = computed(() => {
  return props.as === 'link'
})

const component = computed(() => {
  return isLink.value ? NuxtLink : 'button'
})

const disabled = computed(() => {
  return props.isLoading ?? props.disabled ?? false
})
</script>
