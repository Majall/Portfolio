// components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { personalInfo } from "@/lib/data";

const NAV_LINKS = [
  { href: "#about",      label: "about" },
  { href: "#skills",     label: "skills" },
  { href: "#projects",   label: "projects" },
  { href: "#experience", label: "experience" },
  { href: "#contact",    label: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [isDark, setIsDark]         = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActive]  = useState("");

  // Scroll effects
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Highlight active section
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((sec) => {
        if (window.scrollY >= (sec as HTMLElement).offsetTop - 120) {
          current = sec.getAttribute("id") || "";
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setIsDark(!isDark);
  };

  // Close mobile nav
  const closeMobile = () => {
    setMobileOpen(false);
    document.body.style.overflow = "";
  };

  const openMobile = () => {
    setMobileOpen(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4
        ${scrolled ? "bg-bg/90 backdrop-blur-md border-b border-border py-3 shadow-lg" : ""}`}
      >
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="#hero" className="font-mono text-base font-bold text-accent tracking-widest">
              {personalInfo.firstName.toLowerCase()}
              <span className="text-text-2">.dev</span>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`font-mono text-xs tracking-widest transition-colors duration-200 relative group
                      ${activeSection === href.slice(1) ? "text-accent" : "text-text-2 hover:text-accent"}`}
                  >
                    {label}
                    <span className={`absolute -bottom-1 left-0 right-0 h-px bg-accent transition-transform duration-200
                      ${activeSection === href.slice(1) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center transition-all hover:border-accent hover:rotate-12"
                title="Toggle theme"
              >
                {isDark ? "🌙" : "☀️"}
              </button>
              <a
                href={personalInfo.resumeUrl}
                download
                className="hidden md:block font-mono text-xs tracking-widest px-4 py-2 rounded-lg border border-accent text-accent bg-transparent transition-all hover:bg-accent hover:text-bg"
              >
                resume.pdf
              </a>
              <button
                className="md:hidden flex flex-col gap-1.5 p-1"
                onClick={mobileOpen ? closeMobile : openMobile}
                aria-label="Toggle menu"
              >
                <span className="block w-5 h-0.5 bg-text rounded" />
                <span className="block w-5 h-0.5 bg-text rounded" />
                <span className="block w-5 h-0.5 bg-text rounded" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile nav overlay */}
      <div className={`fixed inset-0 bg-bg z-40 flex flex-col items-center justify-center gap-8 transition-opacity duration-300
        ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={closeMobile}
            className="font-mono text-xl text-text-2 tracking-widest hover:text-accent transition-colors"
          >
            {label}
          </Link>
        ))}
        <a href={personalInfo.resumeUrl} download className="btn-secondary mt-4">
          Download Resume
        </a>
      </div>
    </>
  );
}
