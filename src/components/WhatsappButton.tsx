"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getWhatsAppLink } from "@/lib/whatsapp";

type Size = "default" | "lg" | "xl";

const sizeStyles: Record<Size, string> = {
  default: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
  xl: "h-16 md:h-[72px] px-10 md:px-14 text-lg md:text-xl",
};

type Props = {
  children?: ReactNode;
  message?: string;
  size?: Size;
  className?: string;
  pulse?: boolean;
  magnetic?: boolean;
  variant?: "primary" | "ghost";
};

export function WhatsappButton({
  children = "Falar no WhatsApp",
  message,
  size = "default",
  className,
  pulse = false,
  magnetic = true,
  variant = "primary",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.5 });

  // Slight stretch on label for tactile feel
  const labelX = useTransform(sx, (v) => v * 0.4);
  const labelY = useTransform(sy, (v) => v * 0.4);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!magnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const range = size === "xl" ? 14 : size === "lg" ? 10 : 8;
    x.set(((e.clientX - cx) / r.width) * range * 2);
    y.set(((e.clientY - cy) / r.height) * range * 2);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      data-cursor="hover"
      className={cn(
        "group relative inline-flex items-center justify-center gap-3 rounded-full font-medium tracking-tight transition-colors duration-300",
        sizeStyles[size],
        variant === "primary" && "conic-border text-white",
        variant === "primary" && (pulse ? "glow-pulse" : "glow-accent"),
        variant === "ghost" &&
          "border border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.06]",
        className
      )}
    >
      {/* Inner gradient surface for primary */}
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,106,61,0.18), rgba(224,36,158,0.22), rgba(123,97,255,0.18))",
          }}
        />
      )}

      <motion.span
        style={{ x: labelX, y: labelY }}
        className="relative z-10 inline-flex items-center gap-3"
      >
        <WhatsappIcon className="h-[1.1em] w-[1.1em]" />
        <span>{children}</span>
        <ArrowUpRight
          className="h-[0.95em] w-[0.95em] -translate-x-0 -translate-y-0 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
          aria-hidden
        />
      </motion.span>
    </motion.a>
  );
}

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4 7.94 7.94 0 0 0 5.2 15.97L4 20l4.13-1.18A7.93 7.93 0 0 0 12.05 20a7.94 7.94 0 0 0 5.55-13.68ZM12.05 18.66a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.45.7.7-2.39-.16-.25a6.6 6.6 0 1 1 12.21-3.5 6.6 6.6 0 0 1-6.7 6.5Zm3.6-4.94c-.2-.1-1.18-.58-1.36-.65-.18-.07-.31-.1-.45.1-.13.2-.51.65-.62.78-.11.13-.23.15-.43.05a5.4 5.4 0 0 1-1.6-1 6 6 0 0 1-1.1-1.38c-.12-.2 0-.3.09-.4l.3-.36c.1-.12.13-.2.2-.33.06-.13.03-.25-.02-.35l-.61-1.46c-.16-.38-.32-.33-.45-.34h-.39a.74.74 0 0 0-.54.25 2.27 2.27 0 0 0-.7 1.69 3.94 3.94 0 0 0 .82 2.08 9.04 9.04 0 0 0 3.45 3.05c.48.21.86.34 1.16.43.49.16.93.13 1.28.08.39-.06 1.18-.48 1.35-.95.17-.46.17-.86.12-.94-.05-.09-.18-.14-.38-.25Z" />
    </svg>
  );
}
