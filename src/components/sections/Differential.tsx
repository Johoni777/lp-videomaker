"use client";

import { motion } from "framer-motion";
import { Zap, Target, TrendingUp } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";
import { StaticHeading } from "@/components/KineticHeading";

const ITEMS = [
  {
    n: "01",
    icon: Zap,
    title: "24h de entrega",
    desc: "Conteúdo pronto pra postar no dia seguinte ao briefing. Velocidade que acompanha o ritmo do seu marketing.",
  },
  {
    n: "02",
    icon: Target,
    title: "Mensagem clara",
    desc: "Antes da câmera ligar, eu entendo o que sua marca precisa comunicar. Estratégia primeiro, frame depois.",
  },
  {
    n: "03",
    icon: TrendingUp,
    title: "Mindset de performance",
    desc: "Cada corte pensado pra reter, prender e converter. Vídeo bonito é base — vídeo que vende é o objetivo.",
  },
];

export function Differential() {
  return (
    <section
      id="differential"
      className="relative w-full px-6 py-24 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-4xl md:mb-20">
          <span className="mb-6 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/55">
            <span className="h-px w-8 bg-white/35" /> Diferencial
          </span>
          <StaticHeading
            as="h2"
            className="text-[clamp(2rem,6vw,5.5rem)]"
          >
            <span className="text-white">Enquanto outros só filmam,</span>
            <br />
            <span className="italic text-white/45">
              eu penso no resultado.
            </span>
          </StaticHeading>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <TiltCard className="h-full rounded-2xl">
                  <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm md:p-10">
                    {/* Big background number */}
                    <span
                      aria-hidden
                      className="font-display absolute -right-4 -top-12 select-none text-[10rem] font-light leading-none text-white/[0.03] md:text-[14rem]"
                    >
                      {item.n}
                    </span>

                    <div className="relative flex h-full flex-col">
                      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04]">
                        <Icon className="h-5 w-5 text-white" />
                      </div>

                      <h3 className="font-display text-2xl font-light leading-tight text-white md:text-3xl">
                        {item.title}
                      </h3>

                      <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-base">
                        {item.desc}
                      </p>

                      <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/45">
                        <span className="h-px w-8 bg-white/30" />
                        {item.n}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
