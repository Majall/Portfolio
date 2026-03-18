"use client";

import { personalInfo } from "@/lib/data";

// Social icon SVGs as tiny components to keep JSX clean
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
  </svg>
);

export default function Hero() {
  // Pull everything from data.ts — change data.ts, this updates automatically
  const {
    firstName,
    name,
    role,
    tagline,
    email,
    github,
    linkedin,
    twitter,
    resumeUrl,
  } = personalInfo;

  const socials = [
    { href: github,            icon: <GithubIcon />,   label: "GitHub" },
    { href: linkedin,          icon: <LinkedinIcon />, label: "LinkedIn" },
    { href: twitter,           icon: <TwitterIcon />,  label: "Twitter" },
    { href: `mailto:${email}`, icon: <EmailIcon />,    label: "Email" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
      style={{
        backgroundImage: `
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage:
          "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%)",
      }}
    >
      {/* Glow orbs */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(99,179,237,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 -right-12 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(104,211,145,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container relative z-10 grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-12 items-center">
        {/* ---- Left: Text content ---- */}
        <div>
          {/* Greeting — reads from personalInfo.firstName */}
          <p
            className="font-mono text-sm text-accent tracking-widest mb-5 opacity-0 animate-[fadeUp_0.6s_ease_forwards_0.2s]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="opacity-50">&gt; </span>Hello, World! 👋
          </p>

          {/* Name — reads from personalInfo.name */}
          <h1
            className="font-bold leading-none tracking-tight mb-3 opacity-0 animate-[fadeUp_0.6s_ease_forwards_0.35s]"
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            {name}
          </h1>

          {/* Role + tagline — reads from personalInfo.role & personalInfo.tagline */}
          <p
            className="font-semibold text-text-2 mb-7 opacity-0 animate-[fadeUp_0.6s_ease_forwards_0.5s]"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)" }}
          >
            {role}{" "}
            <span className="relative text-accent">
              &amp; {tagline}
              <span
                className="absolute bottom-0.5 left-0 right-0 h-0.5 bg-accent opacity-40"
              />
            </span>
          </p>

          {/* Bio — reads from personalInfo.bio[0] */}
          <p
            className="text-text-2 text-base leading-relaxed max-w-lg mb-10 opacity-0 animate-[fadeUp_0.6s_ease_forwards_0.65s]"
          >
            I build robust, scalable web applications using the MERN stack and Next.js.
            Passionate about merging intelligent systems with modern web experiences —
            currently seeking internships and junior developer roles.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mb-12 opacity-0 animate-[fadeUp_0.6s_ease_forwards_0.8s]">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-bg font-mono text-sm font-bold tracking-widest rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgba(99,179,237,0.4)]"
              style={{ boxShadow: "0 0 32px rgba(99,179,237,0.25)" }}
            >
              🚀 View My Work
            </a>
            <a
              href={resumeUrl}
              download
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-[var(--border-2)] text-text bg-surface font-mono text-sm font-bold tracking-widest rounded-lg transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              📄 Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-[var(--border-2)] text-text bg-surface font-mono text-sm font-bold tracking-widest rounded-lg transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              💬 Get In Touch
            </a>
          </div>

          {/* Social links — reads from personalInfo.github / linkedin / twitter / email */}
          <div className="flex gap-3 opacity-0 animate-[fadeUp_0.6s_ease_forwards_0.95s]">
            {socials.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                title={label}
                className="w-10 h-10 rounded-lg bg-surface border border-[var(--border)] flex items-center justify-center text-text-2 transition-all hover:border-accent hover:text-accent hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(99,179,237,0.15)]"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* ---- Right: Terminal card — reads from personalInfo ---- */}
        <div
          className="hidden xl:block rounded-xl overflow-hidden border border-[var(--border-2)] opacity-0 animate-[fadeLeft_0.8s_ease_forwards_1s]"
          style={{
            background: "var(--bg-2)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]"
            style={{ background: "var(--bg-3)" }}
          >
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="font-mono text-[0.7rem] text-text-3 ml-auto">
              {firstName.toLowerCase()}@portfolio ~ zsh
            </span>
          </div>

          {/* Terminal body — all values come from personalInfo */}
          <div className="p-5 font-mono text-[0.8rem] leading-loose text-text-2">
            <div>
              <span className="text-green-400">~/portfolio</span>{" "}
              <span className="text-text">cat developer.json</span>
            </div>
            <div>&nbsp;</div>
            <div>{"{"}</div>
            <div>
              &nbsp; <span className="text-accent">"name"</span>:{" "}
              <span className="text-green-400">"{name}"</span>,
            </div>
            <div>
              &nbsp; <span className="text-accent">"role"</span>:{" "}
              <span className="text-green-400">"{role}"</span>,
            </div>
            <div>
              &nbsp; <span className="text-accent">"focus"</span>:{" "}
              <span className="text-green-400">"{tagline}"</span>,
            </div>
            <div>
              &nbsp; <span className="text-accent">"stack"</span>: [
            </div>
            <div>
              &nbsp;&nbsp;&nbsp;{" "}
              <span className="text-green-400">"MongoDB"</span>,{" "}
              <span className="text-green-400">"Express"</span>,
            </div>
            <div>
              &nbsp;&nbsp;&nbsp;{" "}
              <span className="text-green-400">"React"</span>,{" "}
              <span className="text-green-400">"Node.js"</span>,
            </div>
            <div>
              &nbsp;&nbsp;&nbsp;{" "}
              <span className="text-green-400">"Next.js"</span>
            </div>
            <div>&nbsp; ],</div>
            <div>
              &nbsp; <span className="text-accent">"location"</span>:{" "}
              <span className="text-green-400">"{personalInfo.location}"</span>,
            </div>
            <div>
              &nbsp; <span className="text-accent">"available"</span>:{" "}
              <span className="text-orange-400">true</span>
            </div>
            <div>{"}"}</div>
            <div>&nbsp;</div>
            <div>
              <span className="text-green-400">~/portfolio</span>{" "}
              <span
                className="inline-block w-2 h-[1em] bg-accent align-middle animate-[blink_1s_step-end_infinite]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
