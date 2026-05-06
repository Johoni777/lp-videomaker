"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const PILLARS = [
  {
    title: "Retenção",
    desc: "Cada plano é cortado pra prender o olho nos primeiros segundos.",
  },
  {
    title: "Resultado",
    desc: "A estrutura serve a conversão, não só ao estético.",
  },
  {
    title: "Estratégia",
    desc: "Conteúdo direcionado pro que sua marca precisa comunicar.",
  },
];

export function Positioning() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const fade1 = useTransform(scrollYProgress, [0.0, 0.15, 0.3], [0.25, 1, 1]);
  const fade2 = useTransform(scrollYProgress, [0.2, 0.35, 0.5], [0.25, 1, 1]);
  const fade3 = useTransform(scrollYProgress, [0.4, 0.55, 0.7], [0.25, 1, 1]);
  const fades = [fade1, fade2, fade3];

  return (
    <section
      id="positioning"
      ref={ref}
      className="relative w-full px-6 py-32 md:px-12 md:py-48"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
        <div className="md:sticky md:top-32 md:self-start">
          <span className="mb-6 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/55">
            <span className="h-px w-8 bg-white/35" /> Posicionamento
          </span>
          <h2 className="font-display text-[clamp(2rem,5.5vw,5rem)] font-light leading-[0.98] tracking-tight">
            <span className="text-white/35">Não é sobre fazer</span>
            <br />
            <span className="text-white/35">vídeo bonito.</span>
            <br />
            <span className="text-white">É sobre fazer</span>
            <br />
            <span className="text-white">o público </span>
            <span className="italic text-white">parar,</span>
            <br />
            <span className="italic text-white">assistir</span>
            <span className="text-white"> e </span>
            <span className="italic text-white">agir.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-10 md:gap-16 md:pt-40">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              style={{ opacity: fades[i] }}
              className={cn(
                "border-l border-white/15 pl-6 md:pl-10",
                "transition-all"
              )}
            >
              <div className="flex items-baseline gap-4">
                <span className="font-display text-xs text-[var(--accent-2)]">
                  / 0{i + 1}
                </span>
                <h3 className="font-display text-3xl font-light text-white md:text-4xl">
                  {p.title}
                </h3>
              </div>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
