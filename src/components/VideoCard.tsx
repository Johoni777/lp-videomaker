"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VideoItem } from "@/lib/portfolio";

type Props = {
  item: VideoItem;
  index: number;
  onOpen: (item: VideoItem) => void;
};

const aspectClass: Record<VideoItem["aspect"], string> = {
  "9/16": "aspect-[9/16]",
  "16/9": "aspect-[16/9]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
};

export function VideoCard({ item, index, onOpen }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);

  // Autoplay-on-visible via IntersectionObserver
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const enter = () => {
    setHovered(true);
    if (!ref.current) return;
    ref.current.muted = false;
    ref.current.volume = 0.55;
    setMuted(false);
  };

  const leave = () => {
    setHovered(false);
    if (!ref.current) return;
    ref.current.muted = true;
    setMuted(true);
  };

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(item)}
      onMouseEnter={enter}
      onMouseLeave={leave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.015 }}
      data-cursor="hover"
      className={cn(
        "group relative block w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] text-left will-change-transform",
        "ring-0 ring-white/0 transition-all duration-500",
        "hover:ring-2 hover:ring-white/20 hover:border-white/20",
        aspectClass[item.aspect]
      )}
    >
      <video
        ref={ref}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />

      {/* Vignette overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-100 transition-opacity duration-500"
      />

      {/* Top-right mute icon */}
      <div className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-black/55 p-2 backdrop-blur-sm transition-opacity duration-300">
        {muted ? (
          <VolumeX className="h-3.5 w-3.5 text-white/80" />
        ) : (
          <Volume2 className="h-3.5 w-3.5 text-white" />
        )}
      </div>

      {/* Bottom client chip */}
      <div
        className={cn(
          "pointer-events-none absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between gap-2 transition-all duration-500",
          hovered ? "opacity-100 translate-y-0" : "opacity-80 translate-y-1"
        )}
      >
        <div>
          <span className="block text-[10px] uppercase tracking-[0.25em] text-white/55">
            {item.category}
          </span>
          <span className="mt-1 block font-display text-sm md:text-base text-white">
            {item.client}
          </span>
        </div>
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-sm transition-all",
            hovered ? "scale-110 bg-white text-black border-white" : "text-white"
          )}
          aria-hidden
        >
          <Play className="h-4 w-4 fill-current" />
        </div>
      </div>
    </motion.button>
  );
}
