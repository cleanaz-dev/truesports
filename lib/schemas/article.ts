import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  slug: z.string().min(3, "Slug is too short"),
  league: z.enum(["NBA", "NFL", "NHL", "MLB", "SOCCER"]),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  originalUrl: z.url("Must be a valid URL").optional().or(z.literal("")),
  content: z.string().min(20, "Content must be at least 20 characters"),
  readMinutes: z.coerce.number().min(1, "Must be at least 1 minute"),
  featured: z.boolean().default(false),
  image: z.string().optional(),
  twitterUrl: z.url("Must be a valid URL").optional().or(z.literal("")),
  instagramUrl: z.url("Must be a valid URL").optional().or(z.literal("")),
  youtubeUrl: z.url("Must be a valid URL").optional().or(z.literal("")),
});

export type ArticleFormInput = z.input<typeof articleSchema>;
export type ArticleFormValues = z.output<typeof articleSchema>;