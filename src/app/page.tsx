import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Portfolio } from "@/components/sections/Portfolio";
import { Positioning } from "@/components/sections/Positioning";
import { Differential } from "@/components/sections/Differential";
import { Process } from "@/components/sections/Process";
import { Offer } from "@/components/sections/Offer";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Marquee />
      <Portfolio />
      <Positioning />
      <Differential />
      <Process />
      <Offer />
      <FinalCta />
    </main>
  );
}
