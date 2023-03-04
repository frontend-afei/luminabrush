import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export type BlogPost = ParsedContent & {
  title: string;
  authorName: string;
  authorLink?: string;
  authorImage?: string;
  createdAt: string;
  tags?: string[];
  published?: boolean;
  image?: string;
};
