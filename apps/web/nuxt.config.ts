import { getBaseUrl } from 'utils'

const baseUrl = getBaseUrl()

export default defineNuxtConfig({
	devtools: true,

	experimental: {
		typedPages: true,
	},

	runtimeConfig: {
		public: {
			siteUrl: baseUrl,
			locales: {
				localeLabels: {
					en: 'English',
					es: 'Español',
					de: 'Deutsch',
				},
				localeCurrencies: {
					/* This only works with Stripe for now. For LemonSqueezy, we need to set the currency in the LemonSqueezy dashboard and there can only be one. */
					en: 'USD',
					de: 'USD',
					es: 'USD',
				},
			},
			auth: {
				oAuthProviders: ['google', 'github'],
			},
		},
	},

	imports: {
		dirs: ['modules/saas/auth/composables/**', 'modules/ui/lib/**', 'composables/**'],
	},

	components: [
		//
		{ path: '@/modules/ui/components', pathPrefix: false },
		{ path: '@/modules/shared/components', pathPrefix: false },
		{ path: '@/modules/marketing/blog/components', pathPrefix: false },
		{ path: '@/modules/marketing/shared/components', pathPrefix: false },
		{ path: '@/modules/marketing/home/components', pathPrefix: false },
		{ path: '@/modules/saas/auth/components', pathPrefix: false },
	],

	app: {
		head: {
			link: [
				{
					rel: 'icon',
					type: 'image/png',
					href: '/icon.png',
				},
			],
		},
	},

	build: {
		transpile: ['trpc-nuxt'],
	},

	// packages/auth
	nitro: {
		moduleSideEffects: ['lucia/polyfill/node'],
	},

	modules: [
		'./modules/ui/lib/radixModule.ts',
		'@nuxtjs/i18n', // configured here and in i18n.config.ts
		'@nuxtjs/tailwindcss', // configured in tailwind.config.ts
		'@nuxtjs/google-fonts',
		'@nuxtjs/color-mode',
		'@nuxt/content',
		'@nuxt/image',
		'nuxt-simple-robots',
		'vue-email/nuxt',
	],

	// @nuxtjs/i18n
	i18n: {
		locales: [
			{
				code: 'en',
				iso: 'en-US',
				file: 'en.json',
				name: 'English',
			},
			{
				code: 'de',
				iso: 'de-DE',
				file: 'de.json',
				name: 'Deutsch',
			},
			{
				code: 'es',
				iso: 'es-ES',
				file: 'es.json',
				name: 'Español',
			},
		],
		defaultLocale: 'en',
		strategy: 'prefix_except_default',
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'NUXT_LOCALE',
			redirectOn: 'root',
		},
		lazy: true,
		langDir: 'locales',
	},

	// @nuxtjs/google-fonts
	googleFonts: {
		display: 'swap',
		families: {
			'Plus+Jakarta+Sans': [400, 500, 600, 700, 800],
		},
	},

	// @nuxtjs/color-mode
	colorMode: {
		preference: 'system',
		fallback: 'light',
		classSuffix: '',
		storageKey: 'NUXT_COLOR_MODE',
	},

	// @nuxt/content
	content: {
		markdown: {
			anchorLinks: false,
		},
	},

	// @nuxt/image
	image: {
		domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
	},

	// nuxt-simple-robots -> nuxt-site-config
	site: {
		url: baseUrl,
	},

	// nuxt-simple-robots
	robots: {
		allow: '*',
		// sitemap: 'sitemap.xml',
	},

	// vue-email/nuxt
	vueEmail: {
		baseUrl,
	},
})
