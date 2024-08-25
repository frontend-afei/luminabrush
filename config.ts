export const config = {
  i18n: {
    locales: {
      de: {
        label: "Deutsch",
        numberFormats: {
          currency: {
            style: "currency",
            currency: "USD",
            notation: "standard",
          },
          number: {
            style: "decimal",
            maximumFractionDigits: 0,
          },
          percent: {
            style: "percent",
            useGrouping: false,
          },
        },
      },
      en: {
        label: "English",
        numberFormats: {
          currency: {
            style: "currency",
            currency: "USD",
            notation: "standard",
          },
          number: {
            style: "decimal",
            maximumFractionDigits: 0,
          },
          percent: {
            style: "percent",
            useGrouping: false,
          },
        },
      },
    },
    defaultLocale: "en",
    defaultCurrency: "USD",
    cookieName: "NUXT_LOCALE",
  },
  teams: {
    avatarColors: ["#4e6df5", "#e5a158", "#9dbee5", "#ced3d9"],
  },
  auth: {
    redirectAfterLogout: "/",
  },
  mailing: {
    provider: "plunk",
    from: "hello@your-domain.com",
  },
} as const satisfies Config;

export type Config = {
  i18n: {
    locales: {
      [locale: string]: {
        label: string;
        numberFormats: {
          currency: { style: string; currency: string; notation: string };
          number: { style: string; maximumFractionDigits: number };
          percent: { style: string; useGrouping: boolean };
        };
      };
    };
    defaultLocale: string;
    defaultCurrency: string;
    cookieName: string;
  };
  teams: { avatarColors: string[] };
  auth: { redirectAfterLogout: string };
  mailing: {
    provider:
      | "custom"
      | "console"
      | "plunk"
      | "resend"
      | "postmark"
      | "nodemailer";
    from: string;
  };
};

export type Locale = keyof (typeof config)["i18n"]["locales"];
