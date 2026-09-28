"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before starting. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  as?: "div" | "section" | "li" | "article" | "header";
  once?: boolean;
};

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Fade-and-rise when the element enters the viewport. Renders children
 * immediately (no opacity: 0) under reduced motion or before hydration
 * matters, so nothing depends on it for correctness.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as = "div",
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay } },
  };

  return (
    <Comp
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      variants={variants}
    >
      {children}
    </Comp>
  );
}

/** Stagger container for lists of Reveal-able children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Comp>
  );
}

/** A child of RevealGroup. */
export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
      }}
    >
      {children}
    </Comp>
  );
}
