// components/sections/Contact.tsx
"use client";

import { useState } from "react";
import { personalInfo } from "@/lib/data";

// ---- Types ----
interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  name: "", email: "", subject: "", message: ""
};

export default function Contact() {
  const [form, setForm]       = useState<FormState>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSuccess(true);
      setForm(INITIAL_FORM);
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 bg-bg-2">
      <div className="container">
        {/* Header */}
        <div className="mb-16">
          <p className="section-label reveal">// get in touch</p>
          <h2 className="section-title reveal">Let's Work Together</h2>
          <p className="section-sub reveal">
            I'm currently open to internship and junior developer roles. Have a project
            or opportunity? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-20 items-start">
          {/* Left: Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 reveal">Say hello. 👋</h3>
            <p className="text-text-2 text-base leading-relaxed mb-8 reveal">
              Whether you have a job opportunity, a project idea, or just want to chat
              about tech — my inbox is always open. I typically respond within 24 hours.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { icon: "📧", label: "Email",    value: personalInfo.email,    href: `mailto:${personalInfo.email}` },
                { icon: "💼", label: "LinkedIn", value: personalInfo.linkedin.replace("https://", ""), href: personalInfo.linkedin },
                { icon: "🐙", label: "GitHub",   value: personalInfo.github.replace("https://", ""),   href: personalInfo.github },
              ].map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="contact-link-item reveal group"
                >
                  <span className="text-xl w-10 flex justify-center">{icon}</span>
                  <div>
                    <small className="block font-mono text-[0.65rem] text-text-3 uppercase tracking-widest mb-0.5">{label}</small>
                    <span className="text-sm text-text group-hover:text-accent transition-colors">{value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-surface border border-border rounded-xl p-10 reveal">
            {success ? (
              <div className="text-center py-8 text-green font-mono text-sm space-y-2">
                <div className="text-4xl mb-4">✅</div>
                <p className="font-bold">Message sent!</p>
                <p className="text-text-2">I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 text-accent underline text-xs hover:no-underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label" htmlFor="name">Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="email">Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@email.com"
                      className="form-input"
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label" htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Internship opportunity / Project collab..."
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Hi Alex, I came across your portfolio and..."
                    className="form-input resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-400 font-mono text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
                    ⚠️ {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="form-btn disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
