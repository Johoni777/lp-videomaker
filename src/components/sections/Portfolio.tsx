"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoCard } from "@/components/VideoCard";
import { VideoLightbox } from "@/components/VideoLightbox";
import {
  CATEGORY_LABELS,
  PORTFOLIO,
  type VideoCategory,
  type VideoItem,
} from "@/lib/portfolio";
import { StaticHeading } from "@/components/KineticHeading";

const FILTERS: ("all" | VideoCategory)[] = [
  "all",
  "reels",
  "comercial",
  "ugc",
];

export function Portfolio() {
  const [filter, setFilter] = useState<"all" | VideoCategory>("all");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<VideoItem | null>(null);

  const items = useMemo(() => {
    if (filter === "all") return PORTFOLIO;
    return PORTFOLIO.filter((p) => p.category === filter);
  }, [filter]);

  const handleOpen = (item: VideoItem) => {
    setActive(item);
    setOpen(true);
  };

  return (
    <section
      id="portfolio"
      className="relative w-full px-6 py-20 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end md:gap-8">
          <div>
            <span className="mb-4 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/55 md:mb-5">
              <span className="h-px w-8 bg-white/35" /> Portfólio
            </span>
            <StaticHeading
              as="h2"
              className="text-[clamp(2rem,5.5vw,4.5rem)] text-white"
            >
              O trabalho
              <br />
              <span className="text-white/40">fala antes de mim.</span>
            </StaticHeading>
          </div>

          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as "all" | VideoCategory)}
            className="w-full md:w-auto"
          >
            <TabsList className="flex h-11 w-full overflow-x-auto rounded-full border border-white/10 bg-white/[0.02] p-1 backdrop-blur-sm md:w-auto">
              {FILTERS.map((f) => (
                <TabsTrigger
                  key={f}
                  value={f}
                  className="flex-1 whitespace-nowrap rounded-full px-4 text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white data-active:!bg-white data-active:!text-black data-active:!border-transparent md:flex-initial"
                >
                  {CATEGORY_LABELS[f]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Masonry layout via CSS columns — every video shows fully, no overlap */}
        <div className="columns-1 gap-3 sm:columns-2 md:columns-3 md:gap-4 lg:columns-4">
          {items.map((item, i) => (
            <div
              key={item.id}
              className="mb-3 break-inside-avoid md:mb-4"
            >
              <VideoCard item={item} index={i} onOpen={handleOpen} />
            </div>
          ))}
        </div>
      </div>

      <VideoLightbox item={active} open={open} onOpenChange={setOpen} />
    </section>
  );
}
