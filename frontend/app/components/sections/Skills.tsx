"use client";

// All skill data comes from lib/data.ts → skills[]
// To add/remove/edit a skill category or pill, only edit lib/data.ts
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="py-28" style={{ background: "var(--bg-2)" }}>
      <div className="container">

        {/* Section header */}
        <div className="mb-16">
          <p className="section-label reveal">// tech stack</p>
          <h2 className="section-title reveal">Skills &amp; Technologies</h2>
          <p className="section-sub reveal">
            A curated set of tools and technologies I use to build full-stack web
            applications and explore AI/ML.
          </p>
        </div>

        {/* Skills grid — maps over skills[] from data.ts */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skills.map((category, catIdx) => (
            <div
              key={category.title}
              className={`reveal reveal-delay-${catIdx % 4} rounded-xl border border-[var(--border)] p-8 transition-all duration-300 hover:border-[var(--border-2)] hover:-translate-y-1 hover:shadow-[var(--shadow)]`}
              style={{ background: "var(--surface)" }}
            >
              {/* Category header: icon + title from data.ts */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-11 h-11 rounded-lg border border-[var(--border)] flex items-center justify-center text-xl"
                  style={{ background: "var(--bg-2)" }}
                >
                  {category.icon}
                </div>
                <h3 className="font-bold text-base">{category.title}</h3>
              </div>

              {/* Skill pills — each string in category.items from data.ts */}
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-full font-mono text-[0.78rem] text-text-2 border border-[var(--border)] transition-all hover:border-accent hover:text-accent cursor-default"
                    style={{ background: "var(--bg-2)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
