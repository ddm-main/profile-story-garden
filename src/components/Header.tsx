import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { scrollToTarget } from "../lib/lenis";

const navItems = [
  { name: "ABOUT", id: "about" },
  { name: "SKILLS", id: "skills" },
  { name: "EXPERIENCE", id: "experience" },
  { name: "FOCUS", id: "work" },
  { name: "CONTACT", id: "contact" },
];

// Matches --nav-height in index.css: how far a target section should sit
// below the fixed header once we're done scrolling to it.
const NAV_OFFSET = -72;

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasOpenRef = useRef(false);

  // Condensed background once the hero has scrolled by.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page's real scrolling element while the drawer is open. This
  // page scrolls via <html>, not <body>, so locking body alone (the
  // previous approach) did nothing on mobile.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prevOverflow;
    };
  }, [mobileMenuOpen]);

  // Move focus into the drawer on open, trap it there, close on Escape,
  // and return focus to the toggle button on close.
  useEffect(() => {
    if (mobileMenuOpen) {
      wasOpenRef.current = true;
      firstLinkRef.current?.focus();

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
          return;
        }
        if (e.key !== "Tab" || !drawerRef.current) return;
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        );
        if (!focusables.length) return;
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      toggleRef.current?.focus();
    }
    return undefined;
  }, [mobileMenuOpen]);

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    requestAnimationFrame(() => scrollToTarget(id, NAV_OFFSET));
  };

  const goToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    requestAnimationFrame(() => scrollToTarget(null));
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-black/85 backdrop-blur-md border-b border-[#8C6D4F]/25" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between w-full px-4 sm:px-12 lg:px-16 py-4 sm:py-4">
        <a
          href="#hero"
          onClick={goToTop}
          aria-label="Deepak Dongare — back to top"
          className="inline-flex items-center py-2.5 -my-2.5 text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-[#EAD8C7] hover:opacity-75 transition-opacity"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          DEEPAK DONGARE
        </a>

        {/* Navigation Links (Desktop) */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center space-x-8 xl:space-x-10 text-xs sm:text-[13px] tracking-[0.22em] font-medium uppercase text-[#EAE0D5] absolute left-1/2 -translate-x-1/2"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              onClick={goTo(item.id)}
              className="relative group py-1 transition-colors duration-300 hover:text-[#FFFFFF]"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Action & Mobile Toggle */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 ml-auto lg:ml-0">
          <a
            href="#contact"
            onClick={goTo("contact")}
            className="group hidden lg:flex items-center space-x-2 text-xs sm:text-[12.5px] tracking-[0.22em] font-semibold uppercase py-2.5 px-4 border border-[#D4AF37]/60 hover:border-[#D4AF37] bg-[#16120E]/90 hover:bg-[#D4AF37] text-white hover:text-black transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(212,175,55,0.15)]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span>LET&apos;S TALK</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs font-bold">
              ↗
            </span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-[#EAD8C7] hover:text-[#D4AF37] focus-visible:outline-2 focus-visible:outline-[#D4AF37] z-50"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            <div className="w-6 h-4 flex flex-col justify-between items-end">
              <span
                className={`h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? "w-6 rotate-45 translate-y-1.5 bg-[#D4AF37]" : "w-6"}`}
              />
              <span
                className={`h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : "w-4"}`}
              />
              <span
                className={`h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? "w-6 -rotate-45 -translate-y-1.5 bg-[#D4AF37]" : "w-5"}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? {} : { opacity: 0, y: -15 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-40 bg-[#0A0806]/98 backdrop-blur-3xl flex flex-col justify-between p-6 pt-24 lg:hidden"
          >
            <nav aria-label="Mobile primary" className="flex flex-col space-y-4">
              {navItems.map((item, idx) => (
                <a
                  key={item.name}
                  ref={idx === 0 ? firstLinkRef : undefined}
                  href={`#${item.id}`}
                  onClick={goTo(item.id)}
                  className="text-3xl font-normal tracking-[0.2em] text-[#EAD8C7] hover:text-[#D4AF37] transition-colors py-2 border-b border-[#8C6D4F]/20 flex items-center justify-between"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span>{item.name}</span>
                  <span className="text-[11px] font-mono text-[#B39169]">0{idx + 1}</span>
                </a>
              ))}
            </nav>

            <div className="space-y-3 pt-6 border-t border-[#8C6D4F]/30 pb-4">
              <a
                href="#contact"
                onClick={goTo("contact")}
                className="w-full py-3.5 border border-[#D4AF37] bg-[#D4AF37]/10 text-[#F7E7C4] text-xs font-medium tracking-[0.25em] uppercase text-center block"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                LET&apos;S TALK ↗
              </a>
              <a
                href="/resume.pdf"
                download="Deepak_Dongare_Resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 border border-[#8C6D4F]/40 text-[#A8988B] text-xs font-medium tracking-[0.2em] uppercase text-center block"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                DOWNLOAD RESUME ↓
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
