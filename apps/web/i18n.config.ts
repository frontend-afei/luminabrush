import { config } from "@config";

/**
 * Global i18n configuration.
 * The currency setting (e.g. "USD") only works with Stripe for now.
 * For LemonSqueezy, we need to set the currency in the LemonSqueezy dashboard
 * and there can only be one.
 */
export default defineI18nConfig(() => ({
  legacy: false,
  availableLocales: Object.keys(config.i18n.locales),
  locale: config.i18n.defaultLocale,
  fallbackLocale: config.i18n.defaultLocale,
  numberFormats: Object.fromEntries(
    Object.entries(config.i18n.locales).map(([key, value]) => [
      key,
      value.numberFormats,
    ]),
  ),
}));
