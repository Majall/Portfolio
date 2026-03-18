// app/page.tsx
"use client";

import useScrollReveal from "@/hooks/useScrollReveal";
import Navbar     from "@/components/layout/Navbar";
import Footer     from "@/components/layout/Footer";
import Hero       from "@/components/sections/Hero";
import About      from "@/components/sections/About";
import Skills     from "@/components/sections/Skills";
import Projects   from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Stats      from "@/components/sections/Stats";
import Contact    from "@/components/sections/Contact";

export default function HomePage() {
  // Activates scroll animations for all .reveal elements site-wide
  useScrollReveal();

  return (
    <><h1>My Portfolio</h1>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Stats />
        <Contact />
      </main><></>
      <Footer />
    </>
  );
}
