"use client";

import { motion } from "framer-motion";
import { Aurora } from "@/components/fx/Aurora";
import { KineticHeading } from "@/components/KineticHeading";
import { WhatsappButton } from "@/components/WhatsappButton";

export function FinalCta() {
  return (
    <section
      id="cta"
      className="relative isolate flex min-h-[90svh] w-full flex-col overflow-hidden"
    >
      {/* Background video */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <video
          src="/videos/final-cta.mp4"
          poster="/videos/posters/final-cta.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover opacity-70"
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.55)_0%,_rgba(10,10,10,0.85)_60%,_#0A0A0A_100%)]"
      />
      <Aurora className="-z-10" intensity="strong" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 py-24 text-center md:px-12 md:py-32">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="mb-10 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/60"
        >
          <span className="h-px w-8 bg-white/40" />
          A última chance de pular o scroll
          <span className="h-px w-8 bg-white/40" />
        </motion.span>

        <KineticHeading
          whileInView
          delay={0.1}
          staggerWord={0.05}
          className="text-[clamp(1.4rem,5vw,4.75rem)] text-white"
          lines={[
            { words: ["Seu", "concorrente"] },
            { words: ["já", "está"] },
            { words: ["aparecendo."] },
            {
              words: [
                { text: "A", className: "text-white/45" },
                { text: "diferença", className: "text-white/45" },
                { text: "é", className: "text-white/45" },
                { text: "que", className: "text-white/45" },
              ],
            },
            {
              words: [
                { text: "ele", className: "text-white/45" },
                { text: "pode", className: "text-white/45" },
                { text: "estar", className: "text-white/45" },
              ],
            },
            {
              words: [
                { text: "fazendo", className: "text-white/45" },
                {
                  text: "melhor.",
                  italic: true,
                  className: "text-white",
                },
              ],
            },
          ]}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-8 max-w-xl text-sm leading-relaxed text-white/65 md:text-base"
        >
          Não dá pra esperar mais um mês inteiro perdendo presença. Vamos
          começar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-12"
        >
          <WhatsappButton size="xl" pulse>
            Quero vídeos que vendem
          </WhatsappButton>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 border-t border-white/10 px-6 py-8 text-xs text-white/55 md:flex-row md:items-center md:px-12">
        <div className="flex items-center gap-3">
          <span className="font-display text-base text-white">
            João Vitor Heringer
          </span>
          <span className="h-1 w-1 rounded-full bg-white/40" />
          <span>Curitiba, PR</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 uppercase tracking-[0.25em]">
          <a
            href="https://wa.me/5541995355794"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="transition-colors hover:text-white"
          >
            WhatsApp
          </a>
          <a
            href="https://instagram.com/heringerdigital"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="transition-colors hover:text-white"
          >
            @heringerdigital
          </a>
          <span className="text-white/35">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </section>
  );
}
