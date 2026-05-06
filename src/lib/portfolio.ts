export type VideoCategory = "reels" | "comercial" | "ugc";

export type VideoItem = {
  id: string;
  client: string;
  category: VideoCategory;
  src: string;
  poster: string;
  aspect: "9/16" | "16/9" | "4/5" | "1/1";
  span?: { col?: number; row?: number };
  featured?: boolean;
};

export const PORTFOLIO: VideoItem[] = [
  {
    id: "fuj-1",
    client: "FUJ Restaurante",
    category: "reels",
    src: "/videos/portfolio/fuj-1.mp4",
    poster: "/videos/posters/portfolio/fuj-1.jpg",
    aspect: "9/16",
    span: { col: 2, row: 2 },
    featured: true,
  },
  {
    id: "empreenda-mais-brasil",
    client: "Empreenda Mais Brasil",
    category: "comercial",
    src: "/videos/portfolio/empreenda-mais-brasil.mp4",
    poster: "/videos/posters/portfolio/empreenda-mais-brasil.jpg",
    aspect: "9/16",
  },
  {
    id: "villa-1",
    client: "Villa dei Nonni",
    category: "reels",
    src: "/videos/portfolio/villa-1.mp4",
    poster: "/videos/posters/portfolio/villa-1.jpg",
    aspect: "9/16",
  },
  {
    id: "coosly-midias",
    client: "Sky Mídias",
    category: "reels",
    src: "/videos/portfolio/coosly-midias.mp4",
    poster: "/videos/posters/portfolio/coosly-midias.jpg",
    aspect: "9/16",
  },
  {
    id: "urban-market",
    client: "Urban Market",
    category: "reels",
    src: "/videos/portfolio/urban-market.mp4",
    poster: "/videos/posters/portfolio/urban-market.jpg",
    aspect: "9/16",
  },
  {
    id: "comunidade-legacy",
    client: "Paulo henrique | Transformatória",
    category: "comercial",
    src: "/videos/portfolio/comunidade-legacy.mp4",
    poster: "/videos/posters/portfolio/comunidade-legacy.jpg",
    aspect: "9/16",
  },
  {
    id: "noriaki-1",
    client: "NORIMAKI",
    category: "reels",
    src: "/videos/portfolio/noriaki-1.mp4",
    poster: "/videos/posters/portfolio/noriaki-1.jpg",
    aspect: "9/16",
  },
  {
    id: "mastermind",
    client: "CEO Mastermind",
    category: "comercial",
    src: "/videos/portfolio/mastermind.mp4",
    poster: "/videos/posters/portfolio/mastermind.jpg",
    aspect: "9/16",
  },
  {
    id: "fuj-2",
    client: "FUJ Restaurante",
    category: "ugc",
    src: "/videos/portfolio/fuj-2.mp4",
    poster: "/videos/posters/portfolio/fuj-2.jpg",
    aspect: "9/16",
  },
  {
    id: "evento-corporativo",
    client: "Evento Corporativo",
    category: "reels",
    src: "/videos/portfolio/evento-corporativo.mp4",
    poster: "/videos/posters/portfolio/evento-corporativo.jpg",
    aspect: "9/16",
  },
  {
    id: "villa-2",
    client: "Villa dei Nonni",
    category: "comercial",
    src: "/videos/portfolio/villa-2.mp4",
    poster: "/videos/posters/portfolio/villa-2.jpg",
    aspect: "9/16",
  },
  {
    id: "villa-3",
    client: "Villa dei Nonni",
    category: "ugc",
    src: "/videos/portfolio/villa-3.mp4",
    poster: "/videos/posters/portfolio/villa-3.jpg",
    aspect: "9/16",
  },
  {
    id: "urban-market-2",
    client: "Urban Market",
    category: "ugc",
    src: "/videos/portfolio/urban-market-2.mp4",
    poster: "/videos/posters/portfolio/urban-market-2.jpg",
    aspect: "9/16",
  },
];

export const CATEGORY_LABELS: Record<VideoCategory | "all", string> = {
  all: "Todos",
  reels: "Reels",
  comercial: "Comercial",
  ugc: "UGC",
};

export const CLIENTS = [
  "FUJ Restaurante",
  "Villa dei Nonni",
  "Urban Market",
  "NORIMAKI",
  "Empreenda Mais Brasil",
  "Comunidade Legacy",
  "CEO Mastermind",
  "Sky Mídias",
];
