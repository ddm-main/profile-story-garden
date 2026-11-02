import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import type { Variants } from "framer-motion";
import watermarkImg from "../assets/dd-insignia.svg";
import { scrollToTarget } from "../lib/lenis";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [cursorReady, setCursorReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasLeftHeroRef = useRef(false);
  const [isInHero, setIsInHero] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener?.(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener?.(onChange);
    };
  }, []);

  // Play video on mount (initial page load / refresh) — unless the visitor
  // asked for reduced motion, in which case we never even start the
  // autoplaying video and show the static poster instead (see render below).
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => setVideoFailed(true));
    }
  }, [prefersReducedMotion]);

  // Stop strictly at 9 seconds and hold
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 9) {
      videoRef.current.pause();
      videoRef.current.currentTime = 9;
    }
  };

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Restart video ONLY when user leaves the hero section and returns to it
  useEffect(() => {
    const heroEl = sectionRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInHero(entry.isIntersecting);
          if (!entry.isIntersecting) {
            // User scrolled away / left the hero section
            hasLeftHeroRef.current = true;
            setCursorReady(false);
            videoRef.current?.pause();
          } else if (entry.isIntersecting && hasLeftHeroRef.current) {
            // User came back to the hero section after leaving
            hasLeftHeroRef.current = false;
            if (videoRef.current && !prefersReducedMotion) {
              videoRef.current.currentTime = 0;
              videoRef.current.play().catch(() => {});
            }
          }
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCursorReady(true);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`relative w-full min-h-[100svh] overflow-hidden bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black cursor-default ${
        isInHero && cursorReady && !prefersReducedMotion ? "lg:cursor-none" : ""
      }`}
    >
      {/* ================= 1. MINIMAL CUSTOM CURSOR (DESKTOP ONLY) ================= */}
      {cursorReady && isInHero && !prefersReducedMotion && (
        <motion.div
          className="hidden lg:flex fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 rounded-full border border-[#D4AF37]/40 items-center justify-center backdrop-blur-[1px]"
          style={{ x: cursorX, y: cursorY }}
          animate={{
            width: isHovered ? 48 : 10,
            height: isHovered ? 48 : 10,
            backgroundColor: isHovered ? "rgba(212, 175, 55, 0.1)" : "rgba(235, 215, 195, 0.95)",
          }}
          transition={{ type: "spring", damping: 30, stiffness: 350, mass: 0.5 }}
        />
      )}

      {/* ================= 2. CINEMATIC VIDEO HERO VISUAL LAYER ================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black flex items-center justify-end">
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.015, 1] }}
          transition={
            prefersReducedMotion ? {} : { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }
          className="relative h-[100svh] w-full sm:w-[90vw] md:w-[75vw] lg:w-[62vw] xl:w-[58vw] 2xl:w-[54vw] flex items-center justify-end overflow-hidden"
        >
          {/* Reduced motion: skip the autoplaying 1.9MB video entirely and
              show the same poster frame as a static image. */}
          {!prefersReducedMotion && (
            <video
              ref={videoRef}
              muted
              playsInline
              preload="metadata"
              poster="/deepak-cut.webp"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
              onError={() => setVideoFailed(true)}
              className="h-full w-full object-cover object-center lg:object-[center_18%] brightness-[0.85] sm:brightness-[0.92] lg:brightness-[1] contrast-[1.04]"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          )}

          {/* Static fallback when the video cannot load, cannot autoplay, or reduced motion is on */}
          {(videoFailed || prefersReducedMotion) && (
            <img
              src="/deepak-cut.webp"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center lg:object-[center_18%]"
            />
          )}

          {/* Seamless Soft Left Edge Blend */}
          <div className="absolute inset-y-0 left-0 w-2/5 sm:w-1/2 bg-gradient-to-r from-black via-black/85 to-transparent pointer-events-none" />

          {/* Mobile Contrast Scrim (ensures text readability on phones) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 lg:hidden pointer-events-none" />

          {/* Top Edge Soft Fade */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />

          {/* Bottom Edge Fade */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

          {/* Subtle Golden Ambient Light Flare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 via-transparent to-[#D4AF37]/10 mix-blend-screen pointer-events-none" />
        </motion.div>

        {/* ================= 3. ANIMATED WATERMARK EMBLEM (DESKTOP / TABLET) ================= */}
        <div className="hidden sm:flex absolute bottom-6 right-6 lg:bottom-10 lg:right-12 pointer-events-none items-center justify-center z-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-36 h-36 bg-black/85 rounded-full blur-xl" />

            <motion.div
              animate={prefersReducedMotion ? {} : { y: [-3, 3, -3], scale: [1, 1.03, 1] }}
              transition={
                prefersReducedMotion ? {} : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
              }
              className="relative flex items-center justify-center"
            >
              <img
                src={watermarkImg}
                alt=""
                aria-hidden="true"
                className="w-24 h-24 lg:w-32 lg:h-32 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.25)]"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ================= 4. CONTENT LAYER ================= */}
      <div className="relative z-10 flex flex-col justify-between h-full min-h-screen w-full px-4 sm:px-12 lg:px-16 pt-24 sm:pt-28 pb-8 pointer-events-none">
        {/* Main Hero Row */}
        <div className="relative flex flex-col md:flex-row items-center justify-between w-full pt-4 pb-2 my-auto">
          {/* LEFT: Balanced Headline & Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[39rem] xl:max-w-[42rem] pointer-events-auto z-20"
          >
            {/* Massive Condensed Headline with Crisp High-Contrast Gradients */}
            <motion.div variants={fadeUpVariants} className="relative mb-3 sm:mb-4 select-none">
              <h1
                className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[7.8rem] tracking-tight uppercase leading-[0.88] sm:leading-[0.83]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                aria-label="Senior Cloud Security Engineer"
              >
                {/* Line 1: ENTERPRISE */}
                <span
                  aria-hidden="true"
                  className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F4EFEA] to-[#D8CEC4] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
                >
                  CLOUD SECURITY
                </span>

                {/* Line 2: CLOUD & IAM */}
                <span
                  aria-hidden="true"
                  className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5DC] via-[#F5D59A] to-[#D4A95D] drop-shadow-[0_8px_25px_rgba(212,169,93,0.4)]"
                >
                  ENGINEER
                </span>

                {/* Line 3: ROLE SPECIALTIES */}
                <span
                  aria-hidden="true"
                  className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E2BF] via-[#E2BE80] to-[#BE9656] drop-shadow-[0_10px_30px_rgba(190,150,86,0.45)]"
                >
                  AZURE &amp; IAM
                </span>
              </h1>
            </motion.div>

            {/* Subtitle Technologies */}
            <motion.div variants={fadeUpVariants} className="mb-3.5 sm:mb-4">
              <ul
                className="flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-[13px] md:text-sm font-semibold tracking-[0.14em] uppercase text-[#F3E6D8] leading-relaxed"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <li>• Azure security</li>
                <li>• Identity and access</li>
                <li>• Cybersecurity</li>
              </ul>
            </motion.div>

            {/* Short, scan-first profile bullets */}
            <motion.div
              variants={fadeUpVariants}
              className="mb-6 max-w-xl text-sm font-normal leading-snug tracking-wide text-[#E8DCD0] sm:text-[15px] md:text-base"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <ul className="grid gap-2">
                <li className="flex gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span>10 years in IT · 7+ years in Azure</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span>Entra ID · cloud security · endpoint defense</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span>Security automation · TISAX Level 2</span>
                </li>
              </ul>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {/* Explore Initiatives CTA */}
              <motion.a
                href="#work"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToTarget("work", -72);
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                className="relative inline-flex items-center justify-center space-x-3 px-6 sm:px-7 py-3.5 border-2 border-[#D4AF37] bg-[#14100D] hover:bg-[#D4AF37] text-white hover:text-black text-xs sm:text-[13px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.25)] text-center"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFF]/50 to-transparent pointer-events-none" />
                <span>EXPLORE INITIATIVES</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-sm font-bold">
                  ↗
                </span>
              </motion.a>

              {/* Download Resume Button */}
              <motion.a
                href="/resume.pdf"
                download="Deepak_Dongare_Resume.pdf"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                className="relative inline-flex items-center justify-center space-x-2 px-6 sm:px-7 py-3.5 border border-[#C99E5D] bg-[#100D0B] hover:border-[#D4AF37] hover:bg-[#1A1510] text-[#F5EDE4] hover:text-white text-xs sm:text-[13px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 text-center shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              >
                <span>DOWNLOAD RESUME</span>
                <span className="transform transition-transform duration-300 group-hover:translate-y-0.5 text-sm font-bold">
                  ↓
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          <div
            className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 xl:block"
            role="group"
            aria-label="Selected security experience"
          >
            {[
              { label: "IDENTITY", value: "230–240 USERS", target: "experience", y: 0 },
              { label: "ENDPOINTS", value: "260+ DEVICES", target: "experience", y: 1 },
              { label: "ASSURANCE", value: "TISAX LEVEL 2", target: "skills", y: 2 },
            ].map((item, index) => (
              <motion.a
                key={item.label}
                href={`#${item.target}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToTarget(item.target, -72);
                }}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
                animate={
                  prefersReducedMotion
                    ? {}
                    : { opacity: 1, x: [0, 4, 0], y: [0, index % 2 ? 3 : -3, 0] }
                }
                transition={
                  prefersReducedMotion
                    ? {}
                    : {
                        opacity: { delay: 0.6 + index * 0.16, duration: 0.5 },
                        x: { duration: 6 + index, repeat: Infinity, ease: "easeInOut" },
                        y: { duration: 5 + index, repeat: Infinity, ease: "easeInOut" },
                      }
                }
                whileHover={prefersReducedMotion ? {} : { x: -8, scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className={`relative mb-3 block w-52 rounded-sm border border-[#D4AF37]/40 bg-[#090807]/85 p-4 shadow-[0_12px_36px_rgba(0,0,0,0.4)] backdrop-blur-md transition-colors hover:border-[#F5D59A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F5D59A] ${index === 1 ? "xl:ml-5" : index === 2 ? "xl:ml-2" : ""}`}
                aria-label={`${item.label}: ${item.value}. View experience.`}
              >
                <span className="block font-mono text-[10px] tracking-[0.22em] text-[#C9A96E]">
                  0{index + 1} / {item.label}
                </span>
                <span className="mt-1 block font-display text-xl text-white">{item.value}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom Spacer */}
        <div className="h-2" />
      </div>
    </section>
  );
};

export default HeroSection;
