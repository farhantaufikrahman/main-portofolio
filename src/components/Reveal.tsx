"use client";

import type { ElementType, ReactNode } from "react";
import { useInViewOnce } from "@/lib/hooks";

/** Fades content in once when it scrolls into view (skipped for reduced motion via CSS). */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInViewOnce<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
