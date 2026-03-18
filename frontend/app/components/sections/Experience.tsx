"use client";

// All experience / education data comes from lib/data.ts → experiences[]
// Add, remove, or reorder timeline items only in data.ts
import { experiences } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-28" style={{ background: "var(--bg-2)" }}>
      <div className="container">

        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="section-label reveal">// work history</p>
          <h2 className="section-title reveal">Experience &amp; Education</h2>
        </div>

        {/* Timeline — maps over experiences[] from data.ts */}
        <div className="relative max-w-2xl mx-auto">

          {/* Vertical line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--border-2) 20%, var(--border-2) 80%, transparent)",
            }}
          />

          {experiences.map((item, idx) => (
            <div
              key={item.role + item.period}
              className={`relative flex gap-8 mb-12 reveal reveal-delay-${idx}`}
            >
              {/* Timeline dot — reads from item.emoji */}
              <div
                className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full border-2 border-accent flex items-center justify-center text-base"
                style={{
                  background: "var(--surface)",
                  boxShadow: "0 0 16px var(--accent-glow)",
                }}
              >
                {item.emoji}
              </div>

              {/* Content card */}
              <div
                className="flex-1 rounded-xl border border-[var(--border)] p-7 transition-colors hover:border-[var(--border-2)]"
                style={{ background: "var(--surface)" }}
              >
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  {/* Role — reads from item.role */}
                  <h3 className="text-base font-bold">{item.role}</h3>

                  {/* Date badge — reads from item.period */}
                  <span
                    className="font-mono text-[0.7rem] text-accent rounded-full px-3 py-1 border border-[var(--border-2)]"
                    style={{ background: "var(--accent-glow)" }}
                  >
                    {item.period}
                  </span>
                </div>

                {/* Company — reads from item.company + item.companyType */}
                <p className="text-[0.88rem] text-text-2 mb-4">
                  @{" "}
                  <span className="text-accent font-semibold">{item.company}</span>
                  {" · "}
                  {item.companyType}
                </p>

                {/* Description — reads from item.description */}
                <p className="text-[0.87rem] text-text-2 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Tags — maps over item.tags[] */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[0.68rem] text-accent border border-[var(--border-2)] rounded-full px-2.5 py-1"
                      style={{ background: "var(--surface)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
