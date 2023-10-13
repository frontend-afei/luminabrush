export default defineNuxtConfig({
	experimental: {
		typedPages: true,
	},

	runtimeConfig: {
		public: {
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
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
		{ path: '@/modules/marketing/shared/components', pathPrefix: false },
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

	modules: [
		'@nuxtjs/i18n', // configured here and in i18n.config.ts
		'@nuxtjs/tailwindcss', // configured in tailwind.config.ts
		'@nuxtjs/google-fonts',
		'@nuxtjs/color-mode',
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
		subsets: ['latin'],
		families: {
			'Plus+Jakarta+Sans': true,
		},
	},

	// @nuxtjs/color-mode
	colorMode: {
		preference: 'system',
		fallback: 'light',
		classSuffix: '',
		storageKey: 'NUXT_COLOR_MODE',
	},
})
