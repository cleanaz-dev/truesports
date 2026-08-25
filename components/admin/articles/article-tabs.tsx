"use client"

import { useCallback, useState } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import { ImageIcon, UploadCloud, X, Twitter, Instagram, Youtube } from "lucide-react";
import type { ArticleFormInput, ArticleFormValues } from "@/lib/schemas/article";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function ArticleTabs({
  form,
}: {
  form: UseFormReturn<ArticleFormInput, any, ArticleFormValues>;
}) {
  const { register, control, watch, setValue, formState: { errors } } = form;
  const [dragActive, setDragActive] = useState(false);

  const image = watch("image");
  const title = watch("title");
  const excerpt = watch("excerpt");
  const content = watch("content");
  const league = watch("league");
  const readMinutes = watch("readMinutes");
  const twitterUrl = watch("twitterUrl");
  const instagramUrl = watch("instagramUrl");
  const youtubeUrl = watch("youtubeUrl");

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => {
        // Stored as a data URL for now — swap this for an upload call
        // (e.g. to S3/Vercel Blob) that returns a hosted URL instead.
        setValue("image", reader.result as string, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    },
    [setValue]
  );

  return (
    <Tabs defaultValue="media">
      <TabsList className="bg-zinc-900 border border-zinc-800">
        <TabsTrigger value="media">Media</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>

      {/* MEDIA TAB */}
      <TabsContent value="media" className="space-y-6 mt-4">
        <div>
          <Label className="text-zinc-400 mb-2 block">Cover image</Label>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              const file = e.dataTransfer.files?.[0];
              if (file) handleFile(file);
            }}
            className={`relative aspect-video w-full rounded-lg border-2 border-dashed transition-colors ${
              dragActive ? "border-zinc-400 bg-zinc-900" : "border-zinc-800 bg-zinc-900/50"
            }`}
          >
            {image ? (
              <>
                <img src={image} alt="Cover preview" className="h-full w-full rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={() => setValue("image", "", { shouldValidate: true })}
                  className="absolute top-2 right-2 rounded-full bg-black/70 p-1.5 text-zinc-300 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </>
            ) : (
              <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 text-zinc-600">
                <UploadCloud className="h-6 w-6" />
                <span className="text-xs">Drag an image, or click to browse</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                  }}
                />
              </label>
            )}
          </div>
          {!image && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-600">
              <ImageIcon className="h-3 w-3" />
              Falls back to a placeholder if left empty
            </div>
          )}
          {errors.image && <p className="mt-2 text-xs text-red-400">{errors.image.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="twitterUrl" className="text-zinc-400 flex items-center gap-1.5">
            <Twitter className="h-3.5 w-3.5" /> X / Twitter link
          </Label>
          <Input
            id="twitterUrl"
            {...register("twitterUrl")}
            placeholder="https://x.com/..."
            className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-600"
          />
          {errors.twitterUrl && <p className="text-xs text-red-400">{errors.twitterUrl.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="instagramUrl" className="text-zinc-400 flex items-center gap-1.5">
            <Instagram className="h-3.5 w-3.5" /> Instagram link
          </Label>
          <Input
            id="instagramUrl"
            {...register("instagramUrl")}
            placeholder="https://instagram.com/p/..."
            className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-600"
          />
          {errors.instagramUrl && <p className="text-xs text-red-400">{errors.instagramUrl.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="youtubeUrl" className="text-zinc-400 flex items-center gap-1.5">
            <Youtube className="h-3.5 w-3.5" /> YouTube link
          </Label>
          <Input
            id="youtubeUrl"
            {...register("youtubeUrl")}
            placeholder="https://youtube.com/watch?v=..."
            className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-600"
          />
          {errors.youtubeUrl && <p className="text-xs text-red-400">{errors.youtubeUrl.message}</p>}
        </div>
      </TabsContent>

      {/* PREVIEW TAB */}
      <TabsContent value="preview" className="mt-4">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
          <div className="aspect-video w-full bg-zinc-800">
            {image ? (
              <img src={image} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-zinc-600">
                No cover image yet
              </div>
            )}
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="rounded-full border border-zinc-700 px-2 py-0.5">
                {league || "—"}
              </span>
              <span>{readMinutes ? `${readMinutes} min read` : "— min read"}</span>
            </div>

            <h3 className="text-lg font-semibold text-white leading-snug">
              {title || "Untitled article"}
            </h3>

            {excerpt && <p className="text-sm text-zinc-400">{excerpt}</p>}

            <div
              className="prose prose-invert prose-sm max-w-none pt-2 border-t border-zinc-800"
              dangerouslySetInnerHTML={{
                __html: content || "<p class='text-zinc-600'>Nothing written yet.</p>",
              }}
            />

            {(twitterUrl || instagramUrl || youtubeUrl) && (
              <div className="flex items-center gap-3 pt-2 border-t border-zinc-800 text-zinc-500">
                {twitterUrl && <Twitter className="h-4 w-4" />}
                {instagramUrl && <Instagram className="h-4 w-4" />}
                {youtubeUrl && <Youtube className="h-4 w-4" />}
              </div>
            )}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}