import { getBaseUrl } from 'utils/lib/base-url'

const baseUrl = getBaseUrl()

export default defineNuxtConfig({
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
			marketing: {
				menu: [
					{
						translationKey: 'pricing',
						href: '/pricing',
					},
					{
						translationKey: 'blog',
						href: '/Blog',
					},
				],
			},
			teams: {
				avatarColors: ['#425693', '#9170b4', '#7e91c9', '#6e90ba'],
			},
		},
	},

	components: [
		//
		{ path: '@/modules/ui/components', pathPrefix: false },
		{ path: '@/modules/shared/components', pathPrefix: false },
		{ path: '@/modules/marketing/blog/components', pathPrefix: false },
		{ path: '@/modules/marketing/shared/components', pathPrefix: false },
		{ path: '@/modules/marketing/home/components', pathPrefix: false },
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

	/*
	routeRules: {
		'/api/**': {
			prerender: false,
			swr: false,
			isr: false,
		},
	},
	*/

	build: {
		transpile: ['trpc-nuxt'],
	},

	modules: [
		'@nuxtjs/i18n', // configured here and in i18n.config.ts
		'@nuxtjs/tailwindcss', // configured in tailwind.config.ts
		'@nuxtjs/google-fonts',
		'@nuxtjs/color-mode',
		'@nuxt/content',
		'@nuxt/image',
		'nuxt-simple-robots',
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
})
