"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { StaticHeading } from "@/components/KineticHeading";
import { WhatsappButton } from "@/components/WhatsappButton";
import { cn } from "@/lib/utils";

const MENSAL = {
  title: "Pacote Mensal",
  badge: "Mais escolhido",
  desc: "Marcas que querem aparecer todo dia. Conteúdo recorrente, ritmo consistente, presença constante.",
  items: [
    "Produção contínua de vídeos",
    "Entregas semanais previsíveis",
    "Revisões inclusas no escopo",
    "Prioridade na agenda",
    "Estratégia de pauta junto",
  ],
  message: "Oi! Quero saber sobre o pacote mensal de vídeos.",
};

const AVULSO = {
  title: "Projetos Avulsos",
  desc: "Campanhas pontuais, lançamentos, evento específico. Foco e velocidade.",
  items: [
    "Briefing dedicado por projeto",
    "Entrega em 24-72h",
    "Arquivos finais entregues",
    "Formatos para todas as redes",
  ],
  message: "Oi! Tenho um projeto avulso de vídeo. Pode me passar valores?",
};

export function Offer() {
  return (
    <section
      id="offer"
      className="relative w-full px-6 py-24 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <span className="mb-6 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/55">
            <span className="h-px w-8 bg-white/35" /> Oferta
          </span>
          <StaticHeading as="h2" className="text-[clamp(1.75rem,4.5vw,3.75rem)] text-white">
            Produção contínua de vídeos
            <br />
            <span className="italic text-white/45">
              pra manter sua marca ativa.
            </span>
          </StaticHeading>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {/* Mensal — destaque */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative md:order-2"
          >
            <div className="conic-border h-full overflow-hidden rounded-3xl">
              <div className="relative h-full rounded-[calc(1.5rem-1.5px)] bg-[#0E0E0E] p-8 md:p-10">
                <div className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-1)]" />
                  {MENSAL.badge}
                </div>

                <div className="mb-8">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/55">
                    Recorrente
                  </span>
                  <h3 className="mt-3 font-display text-3xl font-light text-white md:text-4xl">
                    {MENSAL.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
                    {MENSAL.desc}
                  </p>
                </div>

                <ul className="mb-10 space-y-3">
                  {MENSAL.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-3 text-sm text-white/85"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                        <Check className="h-3 w-3 text-white" />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>

                <WhatsappButton
                  size="lg"
                  message={MENSAL.message}
                  className="w-full sm:w-auto"
                >
                  Quero o pacote mensal
                </WhatsappButton>
              </div>
            </div>
          </motion.div>

          {/* Avulso */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn(
              "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm md:p-10 md:order-1"
            )}
          >
            <div className="mb-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/55">
                Pontual
              </span>
              <h3 className="mt-3 font-display text-3xl font-light text-white md:text-4xl">
                {AVULSO.title}
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
                {AVULSO.desc}
              </p>
            </div>

            <ul className="mb-10 space-y-3">
              {AVULSO.items.map((it) => (
                <li
                  key={it}
                  className="flex items-start gap-3 text-sm text-white/85"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                  {it}
                </li>
              ))}
            </ul>

            <WhatsappButton
              size="lg"
              variant="ghost"
              message={AVULSO.message}
              className="w-full sm:w-auto"
            >
              Solicitar projeto
            </WhatsappButton>
          </motion.div>
        </div>

        <p className="mx-auto mt-12 max-w-md text-center text-xs uppercase tracking-[0.3em] text-white/45">
          Valores sob consulta no WhatsApp
        </p>
      </div>
    </section>
  );
}
