import React, { useState } from "react";
import { motion } from "framer-motion";

const CONTACT_EMAIL = "deepak.career@hotmail.com";

const channels = [
  { label: "EMAIL", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: "PHONE", value: "+91 84250 62561", href: "tel:+918425062561" },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/deepak-dongare",
    href: "https://www.linkedin.com/in/deepak-dongare",
    external: true,
  },
];

const panel =
  "relative flex h-full flex-col rounded-sm border border-[#8C6D4F]/40 bg-[#0A0806] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] sm:p-8";
const panelTitle = "font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]";
const labelCls =
  "mb-2 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] sm:text-[13px]";
const fieldCls =
  "w-full rounded-sm border border-[#8C6D4F]/40 bg-[#14100D] px-4 py-3 text-base text-white outline-none transition-colors placeholder-[#9C8E82] focus:border-[#D4AF37] sm:text-sm";
const rowCls =
  "group flex items-center justify-between rounded-sm border border-[#8C6D4F]/40 bg-[#14100D] p-4 transition-colors hover:border-[#D4AF37] hover:bg-[#1A1510]";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  // No backend is wired up, so "sending" opens the visitor's own mail client
  // with the message pre-filled.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio contact from ${formData.name || "your site"}`;
    const body = `${formData.message}\n\n— ${formData.name} (${formData.email})`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const reveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7 },
  };

  return (
    <>
      <section
        id="contact"
        className="relative w-full overflow-hidden bg-black px-4 pb-12 pt-12 font-sans text-[#E8DFD8] selection:bg-[#cbb59d] selection:text-black sm:px-12 sm:pb-16 sm:pt-16 lg:px-20"
      >
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <motion.div {...reveal} className="mb-8 sm:mb-12">
            <div className="mb-4 flex items-center space-x-4 sm:mb-5">
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#D4AF37] sm:text-[11px]">
                05 / CONTACT
              </span>
              <div className="h-px w-16 bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
            </div>
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <h2
                className="select-none text-4xl uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                aria-label="Let's talk cloud security."
              >
                <span
                  aria-hidden="true"
                  className="block bg-gradient-to-b from-[#FFFFFF] via-[#F4EFEA] to-[#D8CEC4] bg-clip-text text-transparent"
                >
                  LET&apos;S TALK
                </span>
                <span
                  aria-hidden="true"
                  className="block bg-gradient-to-b from-[#FFF5DC] via-[#F5D59A] to-[#D4A95D] bg-clip-text text-transparent"
                >
                  CLOUD SECURITY.
                </span>
              </h2>
              <ul className="grid gap-1.5 text-sm text-[#E2D6CA] md:justify-items-end sm:text-[15px]">
                <li>Azure and cloud security</li>
                <li>Identity protection</li>
                <li>Cloud security engineering</li>
              </ul>
            </div>
          </motion.div>

          {/* Two matching panels: form first, details second (stacked on mobile) */}
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            <motion.div {...reveal} className={panel}>
              <h3 className={`${panelTitle} mb-6`}>Send a message</h3>
              {sent ? (
                <div
                  className="flex flex-1 flex-col items-center justify-center space-y-4 py-10 text-center"
                  aria-live="polite"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#D4AF37] text-lg font-bold text-[#D4AF37]">
                    ✓
                  </div>
                  <h4
                    className="text-2xl font-normal uppercase text-white sm:text-3xl"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    EMAIL DRAFT READY
                  </h4>
                  <ul className="mx-auto max-w-sm space-y-2 text-left text-sm text-[#E0D4C8]">
                    <li>Review and send the draft in your mail app.</li>
                    <li>
                      • Or email{" "}
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-[#D4AF37] underline transition-colors hover:text-white"
                      >
                        {CONTACT_EMAIL}
                      </a>
                      .
                    </li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="font-mono text-xs uppercase tracking-[0.2em] text-[#C8B6A6] underline transition-colors hover:text-[#D4AF37]"
                  >
                    Back to form
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5">
                  <div>
                    <label htmlFor="contact-name" className={labelCls}>
                      YOUR NAME
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className={fieldCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelCls}>
                      YOUR EMAIL
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className={fieldCls}
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <label htmlFor="contact-message" className={labelCls}>
                      MESSAGE
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can I help?"
                      className={`${fieldCls} min-h-[8rem] flex-1 resize-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full border-2 border-[#D4AF37] bg-[#18130E] py-4 text-xs font-bold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-[#D4AF37] hover:text-black sm:text-[13px]"
                  >
                    OPEN IN MY EMAIL APP
                  </button>
                </form>
              )}
            </motion.div>

            <motion.div {...reveal} className={panel}>
              <h3 className={`${panelTitle} mb-6`}>Contact details</h3>
              <div className="flex flex-1 flex-col gap-5">
                {channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={rowCls}
                  >
                    <div className="flex flex-col">
                      <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                        {c.label}
                      </span>
                      <span className="mt-1 text-sm font-medium text-white sm:text-[15px]">
                        {c.value}
                      </span>
                    </div>
                    <span aria-hidden="true" className="font-bold text-[#D4AF37] transition-transform group-hover:translate-x-1">
                      {c.external ? "↗" : "→"}
                    </span>
                  </a>
                ))}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="rounded-sm border border-[#D4AF37]/70 px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#D4AF37] hover:text-black"
                  >
                    {copied ? "Email copied ✓" : "Copy email"}
                  </button>
                  <a
                    href="/resume.pdf"
                    download="Deepak_Dongare_Resume.pdf"
                    className="rounded-sm border border-[#8C6D4F]/50 px-3 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:border-[#D4AF37] hover:text-[#F5D59A]"
                  >
                    Resume <span aria-hidden="true">↓</span>
                  </a>
                  <span className="sr-only" aria-live="polite">{copied ? "Email address copied" : ""}</span>
                </div>
                <dl className="grid flex-1 content-center gap-3 rounded-sm border border-[#8C6D4F]/35 bg-[#0D0B09] p-4">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                      LOCATION
                    </dt>
                    <dd className="text-sm font-medium text-white">Pune, Maharashtra, India</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                      ROLES
                    </dt>
                    <dd className="text-right text-sm font-medium text-white">Azure security · IAM</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                      STATUS
                    </dt>
                    <dd className="text-right text-sm font-medium text-[#7FD69B]">Available immediately · Pune or remote</dd>
                  </div>
                </dl>
                <a
                  href="/resume.pdf"
                  download="Deepak_Dongare_Resume.pdf"
                  className="w-full border-2 border-[#D4AF37] bg-[#18130E] py-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-[#D4AF37] hover:text-black sm:text-[13px]"
                >
                  DOWNLOAD RESUME (PDF) <span aria-hidden="true">↓</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="relative w-full bg-black px-4 pb-10 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl border-t border-[#8C6D4F]/25 pt-10">
          <nav aria-label="Footer" className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-[0.18em] text-[#D5CBC0] sm:justify-start">
            {[["About","#about"],["Skills","#skills"],["Experience","#experience"],["Practice","#work"],["Contact","#contact"]].map(([l,h]) => (
              <a key={h} href={h} className="transition-colors hover:text-[#D4AF37]">{l}</a>
            ))}
            <a href="/resume.pdf" download="Deepak_Dongare_Resume.pdf" className="transition-colors hover:text-[#D4AF37]">Resume <span aria-hidden="true">↓</span></a>
            <a href="https://www.linkedin.com/in/deepak-dongare" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#D4AF37]">LinkedIn <span aria-hidden="true">↗</span></a>
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-[#D4AF37] sm:ml-auto">Back to top <span aria-hidden="true">↑</span></a>
          </nav>
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <span className="font-mono text-xs uppercase tracking-wider text-[#D5CBC0] sm:text-[13px]">
              Deepak Dongare · Senior Cloud Security Engineer
            </span>
            <span className="font-mono text-xs text-[#D5CBC0] sm:text-[13px]">
              © {new Date().getFullYear()} · Engineered with precision
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContactSection;
