"use client";

// Footer reads name, email, github, linkedin from lib/data.ts → personalInfo
import { personalInfo } from "@/lib/data";

export default function Footer() {
  const { name, email, github, linkedin } = personalInfo;

  const links = [
    { href: "#hero",       label: "back to top ↑" },
    { href: github,        label: "GitHub",    external: true },
    { href: linkedin,      label: "LinkedIn",  external: true },
    { href: `mailto:${email}`, label: "Email" },
  ];

  return (
    <footer className="py-12 border-t border-[var(--border)]">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 flex-wrap">

          {/* Copyright — reads personalInfo.name */}
          <p className="font-mono text-[0.78rem] text-text-3 text-center sm:text-left">
            Designed &amp; built by{" "}
            <span className="text-accent">{name}</span>
            {" · "}© {new Date().getFullYear()}
          </p>

          {/* Links — all driven by personalInfo */}
          <nav className="flex flex-wrap justify-center gap-6">
            {links.map(({ href, label, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="font-mono text-[0.78rem] text-text-3 transition-colors hover:text-accent"
              >
                {label}
              </a>
            ))}
          </nav>

        </div>
      </div>
    </footer>
  );
}
