// hooks/useScrollReveal.ts
// Attaches IntersectionObserver to all .reveal elements
// Import and call once in a client layout or page component

"use client";

import { useEffect } from "react";

/**
 * useScrollReveal
 *
 * Observes every element with className "reveal" in the DOM.
 * When they enter the viewport, adds "visible" → triggers the
 * CSS transition defined in globals.css (.reveal.visible).
 *
 * Usage: call this hook once in your root page or layout.
 *   import useScrollReveal from "@/hooks/useScrollReveal";
 *   export default function Page() {
 *     useScrollReveal();
 *     return <main>...</main>;
 *   }
 */
export default function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // animate once only
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
