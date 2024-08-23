import { config } from "@config";
import deepmerge from "deepmerge";
import type { Messages } from "../types";

export const importLocale = async (locale: string): Promise<Messages> => {
  return (await import(`../translations/${locale}.json`)).default as Messages;
};

export const getMessagesForLocale = async (
  locale: string,
): Promise<Messages> => {
  const localeMessages = await importLocale(locale);

  // TODO: Add config for this property
  if (locale === config.i18n.defaultLocale) {
    return localeMessages;
  }

  // TODO: Add config for this property
  const defaultLocaleMessages = await importLocale(config.i18n.defaultLocale);
  return deepmerge(defaultLocaleMessages, localeMessages);
};
