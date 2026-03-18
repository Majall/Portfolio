// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Space_Mono, Syne } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/lib/data";

// ---- Fonts ----
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

// ---- SEO Metadata ----
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://alexchen.dev"),
  title: {
    default: `${personalInfo.name} — Full Stack Developer`,
    template: `%s | ${personalInfo.name}`,
  },
  description: `Full Stack Developer & Aspiring AI Engineer. I build scalable MERN applications and intelligent web systems. Open to internships and junior developer roles.`,
  keywords: [
    "Full Stack Developer",
    "MERN Stack",
    "React Developer",
    "Node.js Developer",
    "Next.js",
    "AI Engineer",
    "Portfolio",
    personalInfo.name,
  ],
  authors: [{ name: personalInfo.name, url: personalInfo.github }],
  creator: personalInfo.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: `${personalInfo.name} — Full Stack Developer`,
    description: "Full Stack Developer & Aspiring AI Engineer. MERN stack, Next.js, and ML.",
    siteName: `${personalInfo.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} — Developer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} — Full Stack Developer`,
    description: "Full Stack Developer & Aspiring AI Engineer.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#070a0f",
  width: "device-width",
  initialScale: 1,
};

// ---- Layout ----
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
