import tailwindConfig from "tailwind-config";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [tailwindConfig],
  content: ["./layouts/**/*.vue", "./modules/**/*.vue", "./pages/**/*.vue"],
  safelist: ["ml-2", "ml-4", "ml-6", "ml-8"],
};

export default config;
