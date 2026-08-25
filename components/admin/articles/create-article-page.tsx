"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createArticleAction } from "@/lib/actions/article";
import { ArticleFormInput, ArticleFormValues, articleSchema } from "@/lib/schemas/article";
import { RichTextEditor } from "./rich-text-editor";
import { ArticleTabs } from "./article-tabs";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateNewArticle() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<ArticleFormInput, any, ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      slug: "",
      league: "NBA",
      excerpt: "",
      originalUrl: "",
      content: "",
      readMinutes: 0,
      featured: false,
      image: "",
      twitterUrl: "",
      instagramUrl: "",
      youtubeUrl: "",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: ArticleFormValues) => {
    setServerError(null);
    const result = await createArticleAction(data);
    if (result.success) {
      router.push("articles");
    } else {
      setServerError(result.error || "Something went wrong.");
    }
  };

  return (
    <div className="relative  bg-zinc-950 text-zinc-100">
      {/* <img
        src="/images/ts-brands/ts-logo-min-1.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 -right-2 w-[16rem] select-none brightness-10"
      /> */}

      <div className="relative z-10 max-w-6xl px-8 ">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              New article
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Drafts save privately until you publish them.
            </p>
          </div>

          <Button
            type="submit"
            form="article-form"
            disabled={isSubmitting}
            className="bg-zinc-100 text-zinc-950 hover:bg-zinc-300"
          >
            {isSubmitting ? "Saving..." : "Save draft"}
          </Button>
        </div>

        {serverError && (
          <div className="mb-6 rounded-md border border-red-900/50 bg-red-950/50 px-4 py-3 text-sm text-red-400">
            {serverError}
          </div>
        )}

        <form id="article-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-5 gap-10">

          {/* LEFT: FIELDS */}
          <div className="col-span-3 space-y-7">

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-zinc-400">Title</Label>
                <Input
                  id="title"
                  {...register("title")}
                  className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-600"
                />
                {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug" className="text-zinc-400">Slug</Label>
                <Input
                  id="slug"
                  {...register("slug")}
                  className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-600"
                />
                {errors.slug && <p className="text-xs text-red-400">{errors.slug.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-zinc-400">League</Label>
                <Controller
                  control={control}
                  name="league"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-100">
                        <SelectValue placeholder="Select league" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                        <SelectItem value="NBA">NBA</SelectItem>
                        <SelectItem value="NFL">NFL</SelectItem>
                        <SelectItem value="NHL">NHL</SelectItem>
                        <SelectItem value="MLB">MLB</SelectItem>
                        <SelectItem value="SOCCER">Soccer</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.league && <p className="text-xs text-red-400">{errors.league.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="readMinutes" className="text-zinc-400">Read minutes</Label>
                <Input
                  id="readMinutes"
                  type="number"
                  {...register("readMinutes")}
                  className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-600"
                />
                {errors.readMinutes && <p className="text-xs text-red-400">{errors.readMinutes.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-zinc-400">Excerpt</Label>
              <Textarea
                id="excerpt"
                {...register("excerpt")}
                rows={2}
                className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-600"
              />
              {errors.excerpt && <p className="text-xs text-red-400">{errors.excerpt.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-400">Content</Label>
              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <RichTextEditor value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.content && <p className="text-xs text-red-400">{errors.content.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="originalUrl" className="text-zinc-400">
                Original URL <span className="text-zinc-600">(optional)</span>
              </Label>
              <Input
                id="originalUrl"
                {...register("originalUrl")}
                placeholder="https://..."
                className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-600"
              />
              {errors.originalUrl && <p className="text-xs text-red-400">{errors.originalUrl.message}</p>}
            </div>

            <div className="flex items-center gap-2">
              <Controller
                control={control}
                name="featured"
                render={({ field }) => (
                  <Checkbox
                    id="featured"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-zinc-700 data-[state=checked]:bg-zinc-100 data-[state=checked]:text-zinc-950"
                  />
                )}
              />
              <Label htmlFor="featured" className="text-zinc-300 font-normal">
                Feature this article
              </Label>
            </div>
          </div>

          {/* RIGHT: MEDIA / PREVIEW TABS */}
          <div className="col-span-2">
            <ArticleTabs form={form} />
          </div>

        </form>
      </div>
    </div>
  );
}