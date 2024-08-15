import { createConsola } from "consola";

export const logger = createConsola({
  formatOptions: {
    date: false,
  },
  level: process.env.NODE_ENV === "production" ? 3 : 0,
});
