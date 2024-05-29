import baseConfig from "tailwind-config";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [baseConfig],
  darkMode: "class",
  content: [
    "./layouts/**/*.{vue,ts}",
    "./modules/**/*.{vue,ts}",
    "./pages/**/*.{vue,ts}",
  ],
  safelist: ["ml-2", "ml-4", "ml-6", "ml-8"],
};

export default config;
