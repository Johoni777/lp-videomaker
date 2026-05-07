import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { Grain } from "@/components/fx/Grain";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { CustomCursor } from "@/components/fx/CustomCursor";
import { SmoothScroll } from "@/components/fx/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const SITE_URL = "https://heringerdigital.com.br";
const TITLE =
  "João Vitor Heringer — Videomaker em Curitiba | Vídeos que performam";
const DESCRIPTION =
  "Vídeos cinemáticos, UGC e comerciais para marcas locais em Curitiba. Entrega em 24h. Conteúdo estratégico pensado para reter, prender e converter.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "videomaker curitiba",
    "produção de vídeo curitiba",
    "vídeo para empresas",
    "ugc curitiba",
    "reels comercial",
    "marketing de vídeo",
  ],
  authors: [{ name: "João Vitor Heringer" }],
  creator: "João Vitor Heringer",
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "João Vitor Heringer",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17945972533"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17945972533');
        `}</Script>
      </head>
      <body className="relative min-h-svh overflow-x-hidden bg-[#0A0A0A] text-foreground">
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
        <Grain />
        {children}
      </body>
    </html>
  );
}
