import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "../ui/badge";
import { getSpotlight } from "@/lib/actions/get-spotlight";

type SpotlightSheetProps = {
  data: Awaited<ReturnType<typeof getSpotlight>>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function getSourceUrls(sources: unknown): string[] {
  if (!Array.isArray(sources)) return [];
  return sources.filter((s): s is string => typeof s === "string");
}

export function SpotlightSheet({ data, open, onOpenChange }: SpotlightSheetProps) {
  if (!data) return null;

  const { stories, ...spotlight } = data;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md bg-gray-50 flex flex-col">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="text-2xl font-bold">
            {spotlight.homeTeam} <span className="text-gray-400">vs</span>{" "}
            {spotlight.awayTeam}
          </SheetTitle>
          <p className="text-sm text-gray-500">Live AI Game Coverage</p>
        </SheetHeader>

        <ScrollArea className="flex-1 pr-4 mt-4">
          <div className="flex flex-col gap-6">
            {stories.map((story) => {
              const sourceUrls = getSourceUrls(story.sources);

              return (
                <div key={story.id} className="relative pl-6 border-l-2 border-blue-500">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1" />

                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="uppercase text-xs">
                      {story.phase} Update
                    </Badge>
                    <span className="text-xs text-gray-400">
                      {new Date(story.updatedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="prose prose-sm text-gray-700">
                    {story.article ?? (
                      <span className="italic text-gray-400">Story pending...</span>
                    )}
                  </div>

                  {sourceUrls.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {sourceUrls.map((src, i) => (
                        <a
                          key={i}
                          href={src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-blue-500 hover:underline"
                        >
                          [Source {i + 1}]
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {stories.some((s) => s.status === "pending") && (
              <div className="text-sm text-gray-400 animate-pulse text-center mt-8">
                Waiting for the next live update...
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}