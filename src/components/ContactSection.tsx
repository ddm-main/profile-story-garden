// src/components/ContactSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CONTACT_EMAIL = 'deepak.career@hotmail.com';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  // No backend is wired up (yet), so "sending" opens the visitor's own mail
  // client with the message pre-filled — it still reaches the inbox, it
  // just isn't automatic. Swap this for a real API call if one gets added.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio contact from ${formData.name || 'your site'}`;
    const body = `${formData.message}\n\n— ${formData.name} (${formData.email})`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <>
    <section
      id="contact"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-12 lg:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Eyebrow Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center space-x-4 mb-4 sm:mb-5"
              >
                <span
                  className="text-[10px] sm:text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  05 / CONTACT
                </span>
                <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-6 sm:mb-8"
              >
                <h2
                  className="text-4xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.9] sm:leading-[0.85] select-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                aria-label="Let's talk cloud security."
                >
                  <span aria-hidden="true" className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F4EFEA] to-[#D8CEC4] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                    LET&apos;S TALK
                  </span>
                  <span aria-hidden="true" className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5DC] via-[#F5D59A] to-[#D4A95D] drop-shadow-[0_8px_25px_rgba(212,169,93,0.4)]">
                    CLOUD SECURITY.
                  </span>
                </h2>
              </motion.div>

              <ul className="grid gap-1.5 text-sm text-[#E2D6CA] sm:text-[15px]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <li>• Azure and cloud security</li>
                <li>• Identity protection</li>
                <li>• Cloud security engineering</li>
              </ul>

              {/* Direct Channels Cards */}
              <div className="mt-6 sm:mt-8 space-y-3 max-w-md">
                <a
                  href="mailto:deepak.career@hotmail.com"
                  className="flex items-center justify-between p-3.5 sm:p-4 border border-[#8C6D4F]/40 bg-[#120F0C] hover:border-[#D4AF37] hover:bg-[#1A1510] transition-all rounded-sm group shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#D4AF37]">EMAIL</span>
                    <span className="text-sm sm:text-[15px] font-medium text-white group-hover:text-[#FFF5DC] transition-colors">deepak.career@hotmail.com</span>
                  </div>
                  <span className="text-sm sm:text-base text-[#D4AF37] font-bold group-hover:translate-x-1 transition-transform">↗</span>
                </a>

                <a
                  href="tel:+918425062561"
                  className="flex items-center justify-between p-3.5 sm:p-4 border border-[#8C6D4F]/40 bg-[#120F0C] hover:border-[#D4AF37] hover:bg-[#1A1510] transition-all rounded-sm group shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#D4AF37]">PHONE</span>
                    <span className="text-sm sm:text-[15px] font-medium text-white group-hover:text-[#FFF5DC] transition-colors">+91 84250 62561</span>
                  </div>
                  <span className="text-sm sm:text-base text-[#D4AF37] font-bold group-hover:translate-x-1 transition-transform">↗</span>
                </a>

                <a
                  href="https://linkedin.com/in/deepak-dongare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 sm:p-4 border border-[#8C6D4F]/40 bg-[#120F0C] hover:border-[#D4AF37] hover:bg-[#1A1510] transition-all rounded-sm group shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#D4AF37]">LINKEDIN</span>
                    <span className="text-sm sm:text-[15px] font-medium text-white group-hover:text-[#FFF5DC] transition-colors">linkedin.com/in/deepak-dongare</span>
                  </div>
                  <span className="text-sm sm:text-base text-[#D4AF37] font-bold group-hover:translate-x-1 transition-transform">↗</span>
                </a>

                <div className="p-3.5 sm:p-4 border border-[#8C6D4F]/35 bg-[#0D0B09] rounded-sm text-xs text-[#E0D4C8] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#D4AF37]">LOCATION:</span>
                    <span className="text-sm text-white font-medium">Pune, Maharashtra, India</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#D4AF37]">FOCUS:</span>
                    <span className="text-sm text-[#FFF5DC] font-semibold">Azure &amp; Cloud Security</span>
                  </div>
                </div>

                <a
                  href="/resume.pdf"
                  download="Deepak_Dongare_Resume.pdf"
                  className="inline-flex items-center justify-center space-x-2 w-full py-4 sm:py-3.5 border-2 border-[#D4AF37] bg-[#14100D] hover:bg-[#D4AF37] text-white hover:text-black text-xs sm:text-[13px] font-bold tracking-[0.22em] uppercase transition-all rounded-sm shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span>DOWNLOAD RESUME (PDF)</span>
                  <span className="text-sm font-bold">↓</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Monolith Terminal Form (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative w-full rounded-sm border border-[#8C6D4F]/40 bg-[#0A0806] p-5 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Top Gold Horizon Edge */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
            
            {/* Precision Corner Crosshairs */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/60" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]/60" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37]/60" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/60" />

            {sent ? (
              <div className="py-12 text-center space-y-4 sm:py-16" aria-live="polite">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#D4AF37] text-[#D4AF37] text-lg font-bold">
                  ✓
                </div>
                <h3 className="text-2xl sm:text-3xl text-white font-normal uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  EMAIL DRAFT READY
                </h3>
                <ul className="mx-auto max-w-sm space-y-2 text-left text-sm text-[#E0D4C8]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  <li>• Review and send the draft in your mail app.</li>
                  <li>• Or email <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#D4AF37] underline hover:text-white transition-colors">{CONTACT_EMAIL}</a>.</li>
                </ul>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="text-xs font-mono uppercase tracking-[0.2em] text-[#A8988B] hover:text-[#D4AF37] transition-colors underline"
                >
                  Back to form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs sm:text-[13px] font-mono font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-2">
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
                      className="w-full bg-[#14100D] border border-[#8C6D4F]/40 focus:border-[#D4AF37] text-base sm:text-sm text-white placeholder-[#A8988B] px-4 py-3 outline-none rounded-sm transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs sm:text-[13px] font-mono font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-2">
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
                      className="w-full bg-[#14100D] border border-[#8C6D4F]/40 focus:border-[#D4AF37] text-base sm:text-sm text-white placeholder-[#A8988B] px-4 py-3 outline-none rounded-sm transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs sm:text-[13px] font-mono font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can I help?"
                    className="w-full bg-[#14100D] border border-[#8C6D4F]/40 focus:border-[#D4AF37] text-base sm:text-sm text-white placeholder-[#A8988B] p-4 outline-none rounded-sm transition-colors resize-none"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 sm:py-3.5 border-2 border-[#D4AF37] bg-[#18130E] hover:bg-[#D4AF37] text-white hover:text-black text-xs sm:text-[13px] font-bold tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.25)]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  OPEN EMAIL DRAFT ↗
                </button>

              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>

    <footer className="relative w-full bg-black px-4 sm:px-12 lg:px-20 pb-10">
      <div className="max-w-7xl mx-auto w-full pt-10 border-t border-[#8C6D4F]/25 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
        <span className="text-xs sm:text-[13px] font-mono tracking-wider text-[#D5CBC0] uppercase">
          PORTFOLIO // DEEPAK DONGARE • CLOUD SECURITY ENGINEER
        </span>
        <span className="text-xs sm:text-[13px] font-mono text-[#D5CBC0]">
          © {new Date().getFullYear()} • ENGINEERED WITH PRECISION
        </span>
      </div>
    </footer>
    </>
  );
};

export default ContactSection;
