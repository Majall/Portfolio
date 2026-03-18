"use client";

// All project data comes from lib/data.ts → projects[]
// Add / edit / remove a project only in data.ts — this component auto-updates
import { projects } from "@/lib/data";

// Thumbnail gradient themes indexed by position
const THUMB_GRADIENTS = [
  "linear-gradient(135deg, #0f2027, #203a43, #2c5364)", // blue-slate  (project 0)
  "linear-gradient(135deg, #0a0a0a, #1a0a2e, #0a1628)", // deep purple (project 1)
  "linear-gradient(135deg, #0d1b2a, #1b4332, #0d2d1a)", // dark green  (project 2)
  "linear-gradient(135deg, #1a0a0a, #2e0a0a, #1a1010)", // dark red    (project 3)
];

// External link icon
const ExternalLinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

// GitHub icon
const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function Projects() {
  return (
    <section id="projects" className="py-28">
      <div className="container">

        {/* Section header */}
        <div className="mb-16">
          <p className="section-label reveal">// featured work</p>
          <h2 className="section-title reveal">Projects</h2>
          <p className="section-sub reveal">
            A selection of projects that showcase my ability to build full-stack
            applications, integrate AI, and design clean APIs.
          </p>
        </div>

        {/* Projects grid — maps over projects[] from data.ts */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {projects.map((project, idx) => (
            <article
              key={project.title}
              className={`reveal reveal-delay-${idx % 3} flex flex-col rounded-xl border border-[var(--border)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-2)] hover:shadow-[var(--shadow-lg)]`}
              style={{ background: "var(--surface)" }}
            >
              {/* Thumbnail — uses project.emoji + gradient */}
              <div
                className="relative h-48 flex items-center justify-center"
                style={{
                  background: THUMB_GRADIENTS[idx % THUMB_GRADIENTS.length],
                }}
              >
                <span
                  className="text-6xl"
                  style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))" }}
                >
                  {project.emoji}
                </span>

                {/* Badge — reads from project.badge */}
                <span
                  className="absolute top-3 right-3 font-mono text-[0.65rem] text-accent tracking-widest rounded-full px-3 py-1 border border-[var(--border-2)]"
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {project.badge}
                </span>
              </div>

              {/* Card body */}
              <div className="p-7 flex flex-col flex-1">
                {/* Title — reads from project.title */}
                <h3 className="text-lg font-bold tracking-tight mb-3">{project.title}</h3>

                {/* Description — reads from project.description */}
                <p className="text-text-2 text-[0.88rem] leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                {/* Features — maps over project.features[] */}
                <div className="mb-5">
                  <p className="font-mono text-[0.68rem] text-text-3 uppercase tracking-widest mb-2">
                    Key Features
                  </p>
                  <ul className="space-y-1">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[0.82rem] text-text-2">
                        <span className="text-accent text-[0.7rem] mt-0.5 shrink-0">▹</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech stack — maps over project.stack[] */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[0.68rem] text-accent border border-[var(--border-2)] rounded-full px-2.5 py-1"
                      style={{ background: "var(--surface)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links — reads from project.liveUrl, project.liveLabel, project.githubUrl */}
                <div className="flex gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-bg font-mono text-[0.73rem] font-bold rounded-lg transition-all hover:opacity-85 hover:-translate-y-0.5"
                  >
                    <ExternalLinkIcon />
                    {project.liveLabel}
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-[var(--border)] text-text-2 font-mono text-[0.73rem] rounded-lg transition-all hover:border-accent hover:text-accent hover:-translate-y-0.5"
                  >
                    <GithubIcon />
                    GitHub
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
