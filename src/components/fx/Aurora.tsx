import { cn } from "@/lib/utils";

type AuroraProps = {
  className?: string;
  intensity?: "soft" | "strong";
};

export function Aurora({ className, intensity = "soft" }: AuroraProps) {
  const opacity = intensity === "strong" ? "opacity-60" : "opacity-40";
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "aurora-blob-1 absolute -top-1/3 -left-1/4 h-[70vh] w-[70vh] rounded-full blur-[140px] mix-blend-screen will-change-transform",
          opacity
        )}
        style={{
          background:
            "radial-gradient(circle at center, #FF6A3D 0%, rgba(255,106,61,0) 60%)",
        }}
      />
      <div
        className={cn(
          "aurora-blob-2 absolute top-1/4 -right-1/4 h-[80vh] w-[80vh] rounded-full blur-[160px] mix-blend-screen will-change-transform",
          opacity
        )}
        style={{
          background:
            "radial-gradient(circle at center, #E0249E 0%, rgba(224,36,158,0) 65%)",
        }}
      />
      <div
        className={cn(
          "aurora-blob-1 absolute -bottom-1/4 left-1/3 h-[60vh] w-[60vh] rounded-full blur-[140px] mix-blend-screen will-change-transform",
          opacity
        )}
        style={{
          background:
            "radial-gradient(circle at center, #7B61FF 0%, rgba(123,97,255,0) 65%)",
          animationDelay: "-9s",
        }}
      />
    </div>
  );
}
