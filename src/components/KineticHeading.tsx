"use client";

import { motion, type Variants } from "framer-motion";
import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Word =
  | string
  | { text: string; className?: string; italic?: boolean };

type Line = { words: Word[]; className?: string };

type Props = {
  lines: Line[];
  className?: string;
  delay?: number;
  staggerWord?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  whileInView?: boolean;
  once?: boolean;
};

const wordVariants: Variants = {
  hidden: {
    y: "110%",
    opacity: 0,
    filter: "blur(8px)",
  },
  visible: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function KineticHeading({
  lines,
  className,
  delay = 0,
  staggerWord = 0.06,
  as = "h1",
  whileInView = false,
  once = true,
}: Props) {
  const Tag = motion[as] as typeof motion.h1;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: staggerWord,
      },
    },
  };

  const animateProps = whileInView
    ? {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once, amount: 0.3 },
      }
    : {
        initial: "hidden" as const,
        animate: "visible" as const,
      };

  return (
    <Tag
      variants={containerVariants}
      {...animateProps}
      className={cn(
        "font-display font-light leading-[0.95] tracking-tight",
        className
      )}
    >
      {lines.map((line, li) => (
        <span
          key={li}
          className={cn("block overflow-hidden", line.className)}
        >
          <span className="inline-block">
            {line.words.map((w, wi) => {
              const word = typeof w === "string" ? { text: w } : w;
              return (
                <Fragment key={wi}>
                  <motion.span
                    variants={wordVariants}
                    className={cn(
                      "inline-block will-change-transform",
                      word.italic && "italic font-normal",
                      typeof w !== "string" ? w.className : undefined
                    )}
                  >
                    {word.text}
                  </motion.span>
                  {wi < line.words.length - 1 && (
                    <span className="inline-block">&nbsp;</span>
                  )}
                </Fragment>
              );
            })}
          </span>
        </span>
      ))}
    </Tag>
  );
}

export function StaticHeading({
  children,
  as: Tag = "h2",
  className,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "font-display font-light leading-[0.98] tracking-tight",
        className
      )}
    >
      {children}
    </Tag>
  );
}
