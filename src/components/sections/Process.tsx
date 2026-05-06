"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { StaticHeading } from "@/components/KineticHeading";

const STEPS = [
  {
    n: "01",
    title: "Entendo seu negócio",
    desc: "Briefing direto. Identifico o que sua marca precisa comunicar e pra quem.",
  },
  {
    n: "02",
    title: "Produzo o conteúdo",
    desc: "Captação e edição com mindset de performance. Cada corte tem propósito.",
  },
  {
    n: "03",
    title: "Entrego pronto pra postar",
    desc: "Em 24h, você recebe o conteúdo nos formatos certos. Sem retrabalho.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      className="relative w-full px-6 py-20 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl md:mb-24">
          <span className="mb-4 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/55 md:mb-6">
            <span className="h-px w-8 bg-white/35" /> Processo
          </span>
          <StaticHeading
            as="h2"
            className="text-[clamp(2rem,5vw,4.5rem)] text-white"
          >
            Simples. Direto.
            <br />
            <span className="italic text-white/45">Pronto pra rodar.</span>
          </StaticHeading>
        </div>

        <div
          ref={ref}
          className="relative grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-8"
        >
          {/* Static base line — passes through the centers of all 3 badges (each badge sits on top thanks to z-10 + bg-[#0A0A0A]) */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[2.25rem] hidden h-px bg-white/10 md:block"
            style={{
              left: "calc(100% / 6)",
              right: "calc(100% / 6)",
            }}
          />
          {/* Animated progress line that fills as you scroll through the section */}
          <motion.div
            aria-hidden
            style={{
              scaleX: lineScale,
              transformOrigin: "left center",
              left: "calc(100% / 6)",
              right: "calc(100% / 6)",
            }}
            className="pointer-events-none absolute top-[2.25rem] hidden h-px md:block"
          >
            <div
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(90deg, #FF6A3D 0%, #E0249E 50%, #7B61FF 100%)",
              }}
            />
          </motion.div>

          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex flex-col items-start text-left md:items-center md:text-center"
            >
              <div className="relative z-10 flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#0A0A0A]">
                <span className="font-display text-2xl font-light text-white">
                  {step.n}
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-light leading-tight text-white md:mt-8 md:text-3xl">
                {step.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65 md:mt-4 md:text-base">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
