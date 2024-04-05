import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

export type LegalPageFields = ParsedContent & {
  title: string;
};

export type DocumentationPageFields = ParsedContent & {
  title: string;
  subtitle?: string;
};

export type TableOfContentsItem = {
  id: string;
  text: string;
  depth: number;
  children?: TableOfContentsItem[];
};
