import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.date(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    featuredImage: z.string().optional(),
    author: z.string(),
    readTime: z.number(),
    featured: z.boolean().optional(),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  posts,
  pages,
};