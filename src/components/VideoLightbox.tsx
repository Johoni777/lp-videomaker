"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { VideoItem } from "@/lib/portfolio";

type Props = {
  item: VideoItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const aspectClass: Record<VideoItem["aspect"], string> = {
  "9/16": "aspect-[9/16]",
  "16/9": "aspect-[16/9]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
};

export function VideoLightbox({ item, open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className={cn(
          "border-white/10 bg-black/90 p-0 backdrop-blur-xl",
          "w-[95vw] max-w-[min(95vw,1200px)] sm:max-w-[min(95vw,1200px)]",
          "data-[state=open]:duration-300"
        )}
      >
        <DialogTitle className="sr-only">
          {item ? `Vídeo — ${item.client}` : "Vídeo"}
        </DialogTitle>

        {item && (
          <div className="flex flex-col items-center justify-center p-3 sm:p-6">
            <div
              className={cn(
                "relative w-full overflow-hidden rounded-xl bg-black",
                aspectClass[item.aspect],
                item.aspect === "9/16" && "max-w-[min(80vh,420px)]",
                item.aspect === "16/9" && "max-w-[min(95vw,1100px)]",
                item.aspect === "4/5" && "max-w-[min(80vh,560px)]"
              )}
            >
              <video
                key={item.id}
                src={item.src}
                poster={item.poster}
                autoPlay
                loop
                controls
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 flex w-full max-w-3xl items-center justify-between text-xs uppercase tracking-[0.25em] text-white/60">
              <span>{item.category}</span>
              <span className="font-display text-sm normal-case tracking-normal text-white/85">
                {item.client}
              </span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
