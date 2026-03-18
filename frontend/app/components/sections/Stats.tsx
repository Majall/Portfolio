"use client";

import { useEffect, useRef, useState } from "react";
// Stats numbers come from lib/data.ts → githubStats[]
import { githubStats, personalInfo } from "@/lib/data";

// Animates a number from 0 to target when the element enters the viewport
function useCountUp(target: number, isVisible: boolean, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const steps = 50;
    const increment = target / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return count;
}

// Individual stat card with its own intersection observer
function StatCard({ number, label }: { number: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(number, visible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="reveal rounded-xl border border-[var(--border)] p-8 text-center transition-all hover:border-accent hover:-translate-y-1 hover:shadow-[0_0_24px_var(--accent-glow)]"
      style={{ background: "var(--surface)" }}
    >
      {/* Number — animates to the value in githubStats[n].number */}
      <div
        className="font-mono text-[2.5rem] font-bold text-accent leading-none mb-2"
      >
        {count}+
      </div>
      {/* Label — reads from githubStats[n].label */}
      <div className="text-sm text-text-2">{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="py-20">
      <div className="container">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="section-label reveal">// by the numbers</p>
          <h2 className="section-title reveal">GitHub Activity</h2>
        </div>

        {/* Stats grid — maps over githubStats[] from data.ts */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {githubStats.map(({ number, label }) => (
            <StatCard key={label} number={number} label={label} />
          ))}
        </div>

        {/* CTA — reads personalInfo.github from data.ts */}
        <div className="text-center reveal">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-[var(--border-2)] text-text font-mono text-sm font-bold tracking-widest rounded-lg transition-all hover:border-accent hover:text-accent hover:-translate-y-0.5"
            style={{ background: "var(--surface)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            View GitHub Profile →
          </a>
        </div>

      </div>
    </section>
  );
}
