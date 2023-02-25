# supastarter-nuxt-lemonsqueezy

## Installation

### 1. Environment Variables

Add this to your `.env`:

```bash
# supastarter-nuxt-lemonsqueezy
NUXT_LEMONSQUEEZY_API_KEY=""
```

### 2. Install dependency for types

Install this module as devDependency (used for having TypeScript types).

```bash
npm install -D lemonsqueezy.ts
```

### 3. Add to `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  // ...
  runtimeConfig: {
    lemonsqueezy: {
      apiKey: process.env.NUXT_LEMONSQUEEZY_API_KEY,
    },
    // ...
  },
})
```
