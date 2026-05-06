"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Aurora } from "@/components/fx/Aurora";
import { KineticHeading } from "@/components/KineticHeading";
import { WhatsappButton } from "@/components/WhatsappButton";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden"
    >
      {/* Background video with slow zoom */}
      <motion.div
        aria-hidden
        initial={{ scale: 1 }}
        animate={{ scale: 1.06 }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 -z-20"
      >
        <video
          src="/videos/hero-reel.mp4"
          poster="/videos/posters/hero.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Vignette + tint */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.25)_0%,_rgba(0,0,0,0.55)_55%,_rgba(0,0,0,0.85)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]"
      />

      {/* Aurora behind text */}
      <Aurora className="-z-10" intensity="soft" />

      {/* Top eyebrow */}
      <div className="relative z-10 flex w-full items-start justify-between px-6 pt-8 md:px-12 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-base md:text-lg text-white"
        >
          João Vitor Heringer
          <span className="ml-2 inline-block h-1 w-1 rounded-full bg-[var(--accent-2)] align-middle" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden text-[10px] uppercase tracking-[0.4em] text-white/55 md:block"
        >
          Videomaker · Curitiba · Brasil
        </motion.div>
      </div>

      {/* Center content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-start justify-center px-6 pb-20 pt-10 md:px-12 md:pb-16 md:pt-8">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-6 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/60 md:mb-5"
        >
          <span className="h-px w-8 bg-white/40" />
          Vídeos que performam
        </motion.span>

        {/* Mobile: 4 short lines so they fit narrow viewports without wrapping */}
        <div className="md:hidden">
          <KineticHeading
            delay={0.5}
            staggerWord={0.06}
            className="text-[clamp(2rem,8vw,5.5rem)] text-white"
            lines={[
              { words: ["Se", "o", "seu", "vídeo"] },
              { words: ["não", "chama"] },
              {
                words: [
                  {
                    text: "atenção,",
                    italic: true,
                    className: "text-white",
                  },
                ],
              },
              {
                words: [
                  "ele",
                  "não",
                  { text: "vende.", className: "text-white/35" },
                ],
              },
            ]}
          />
        </div>

        {/* Desktop: 3 lines so the whole hero fits in 100vh */}
        <div className="hidden md:block">
          <KineticHeading
            as="h2"
            delay={0.5}
            staggerWord={0.05}
            className="text-[clamp(2.5rem,5vw,5rem)] text-white"
            lines={[
              { words: ["Se", "o", "seu", "vídeo"] },
              {
                words: [
                  "não",
                  "chama",
                  {
                    text: "atenção,",
                    italic: true,
                    className: "text-white",
                  },
                ],
              },
              {
                words: [
                  "ele",
                  "não",
                  { text: "vende.", className: "text-white/35" },
                ],
              },
            ]}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-xl text-base leading-relaxed text-white/75 md:mt-6 md:text-lg"
        >
          Eu transformo produtos comuns em desejo através de vídeos
          que performam.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 flex flex-wrap items-center gap-4 md:mt-8"
        >
          <WhatsappButton size="lg">Falar no WhatsApp</WhatsappButton>
          <a
            href="#portfolio"
            data-cursor="hover"
            className="inline-flex items-center gap-2 px-2 py-2 text-sm text-white/70 transition-colors hover:text-white"
          >
            <span className="h-px w-8 bg-white/30 transition-colors group-hover:bg-white" />
            Ver portfólio
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.1 }}
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-[10px] uppercase tracking-[0.3em] text-white/55 md:mt-7 md:text-[11px]"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-1)]" />
            Entrega em 24h
          </span>
          <span className="hidden h-3 w-px bg-white/15 md:block" />
          <span>Curitiba, PR</span>
          <span className="hidden h-3 w-px bg-white/15 md:block" />
          <span>Pacotes mensais & avulsos</span>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#portfolio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/55 md:bottom-8"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
