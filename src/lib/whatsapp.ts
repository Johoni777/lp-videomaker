export const WHATSAPP_NUMBER = "5541995355794";

const DEFAULT_MESSAGE =
  "Oi! Vim do site e quero saber sobre vídeos pra minha marca.";

export function getWhatsAppLink(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
