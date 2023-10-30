export default defineI18nConfig(() => ({
	legacy: false,
	availableLocales: ['en', 'de', 'es'],
	locale: 'en',
	fallbackLocale: 'en',
	numberFormats: {
		'de': {
			currency: {
				style: 'currency',
				currency: 'USD',
				notation: 'standard',
			},
			number: {
				style: 'decimal',
				maximumFractionDigits: 0,
			},
			percent: {
				style: 'percent',
				useGrouping: false,
			},
		},
		'en': {
			currency: {
				style: 'currency',
				currency: 'USD',
				notation: 'standard',
			},
			number: {
				style: 'decimal',
				maximumFractionDigits: 0,
			},
			percent: {
				style: 'percent',
				useGrouping: false,
			},
		},
		'es': {
			currency: {
				style: 'currency',
				currency: 'USD',
				notation: 'standard',
			},
			number: {
				style: 'decimal',
				maximumFractionDigits: 0,
			},
			percent: {
				style: 'percent',
				useGrouping: false,
			},
		},
	},
}))
