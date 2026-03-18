"use client";

import { personalInfo } from "@/lib/data";

export default function About() {
  // Everything rendered here comes from lib/data.ts → personalInfo
  const { name, firstName, bio, availability, education, location } = personalInfo;

  // These quick-facts are driven by personalInfo fields
  const facts = [
    { label: "Location",     value: `🌏 ${location}` },
    { label: "Experience",   value: "Junior / Intern Level" },
    { label: "Availability", value: `✓ ${availability}`, highlight: true },
    { label: "Education",    value: education },
  ];

  return (
    <section id="about" className="py-28">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* ---- Avatar / image column ---- */}
          <div className="reveal relative max-w-sm mx-auto lg:mx-0 w-full">
            {/* Avatar box */}
            <div
              className="relative w-full aspect-square rounded-xl border border-[var(--border-2)] flex items-center justify-center overflow-hidden"
              style={{ background: "var(--surface)" }}
            >
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-glow), transparent, var(--green-glow))",
                }}
              />
              {/* Avatar emoji — swap with <Image> for a real photo */}
              <span className="relative z-10 text-[8rem] select-none">👨‍💻</span>
            </div>

            {/* Decorative offset frame */}
            <div
              className="absolute -bottom-3 -right-3 w-full h-full rounded-xl border-2 border-accent pointer-events-none"
              style={{ opacity: 0.25 }}
            />

            {/* "Open to work" badge */}
            <div
              className="absolute bottom-4 -left-5 rounded-lg px-4 py-3 border border-[var(--border-2)]"
              style={{ background: "var(--surface)", boxShadow: "var(--shadow)" }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full bg-green-400"
                  style={{ boxShadow: "0 0 8px var(--green)", animation: "pulse 2s ease infinite" }}
                />
                {/* Reads availability from data.ts */}
                <span className="font-mono text-[0.7rem] text-text-2">{availability}</span>
              </div>
            </div>
          </div>

          {/* ---- Text column ---- */}
          <div>
            <p className="section-label reveal">// about me</p>

            {/* Title uses firstName from data.ts */}
            <h2 className="section-title reveal">
              Hi, I'm{" "}
              <span className="text-accent">{firstName}</span>.
              <br />
              I Build for the Web.
            </h2>

            {/* Bio paragraphs — each item in personalInfo.bio renders as its own <p> */}
            {bio.map((paragraph, i) => (
              <p
                key={i}
                className={`text-text-2 text-[0.97rem] leading-relaxed mb-5 reveal reveal-delay-${i + 1}`}
                // Bold the developer's name wherever it appears
                dangerouslySetInnerHTML={{
                  __html: paragraph
                    .replace(
                      new RegExp(`\\b${firstName}\\b`, "g"),
                      `<strong class="text-text">${firstName}</strong>`
                    )
                    .replace(
                      /MERN stack|Next\.js|AI|Machine Learning|open source/g,
                      (m) => `<strong class="text-text">${m}</strong>`
                    ),
                }}
              />
            ))}

            {/* Facts grid — driven by personalInfo fields */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {facts.map(({ label, value, highlight }) => (
                <div
                  key={label}
                  className="reveal rounded-lg border border-[var(--border)] px-5 py-4 transition-colors hover:border-[var(--border-2)]"
                  style={{ background: "var(--surface)" }}
                >
                  <div className="font-mono text-[0.68rem] text-text-3 uppercase tracking-widest mb-1">
                    {label}
                  </div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: highlight ? "var(--green)" : "var(--text)" }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex gap-4 mt-8 reveal">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg font-mono text-xs font-bold tracking-widest rounded-lg transition-all hover:opacity-90 hover:-translate-y-0.5"
              >
                See My Projects →
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-2)] text-text font-mono text-xs font-bold tracking-widest rounded-lg transition-all hover:border-accent hover:text-accent hover:-translate-y-0.5"
                style={{ background: "var(--surface)" }}
              >
                Email Me
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
