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
  const [videoReady, setVideoReady] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const userPausedRef = useRef(false);
  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isPaused) {
      userPausedRef.current = false;
      if (v.currentTime >= 9) v.currentTime = 0;
      v.play().catch(() => {});
      setIsPaused(false);
    } else {
      userPausedRef.current = true;
      v.pause();
      setIsPaused(true);
    }
  };
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
      if (videoRef.current.readyState >= 2) setVideoReady(true);
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
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
            if (videoRef.current && !prefersReducedMotion && !userPausedRef.current) {
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
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black flex items-end justify-end">
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.015, 1] }}
          transition={
            prefersReducedMotion ? {} : { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }
          className="relative h-[calc(100svh-5.5rem)] w-full sm:w-[90vw] md:w-[75vw] lg:w-[62vw] xl:w-[58vw] 2xl:w-[54vw] flex items-center justify-end overflow-hidden"
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
              onLoadedData={() => setVideoReady(true)}
              className={`h-full w-full transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}  object-cover object-center lg:object-[center_18%] brightness-[0.85] sm:brightness-[0.92] lg:brightness-[1] contrast-[1.04]`}
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          )}

          {!prefersReducedMotion && !videoFailed && (
            <button
              type="button"
              onClick={toggleVideo}
              aria-label={isPaused ? "Play background video" : "Pause background video"}
              aria-pressed={isPaused}
              className="absolute bottom-6 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/60 bg-black/60 text-[#F5D59A] backdrop-blur-sm transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] sm:right-6"
            >
              {isPaused ? (
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M8 5v14l11-7z" /></svg>
              ) : (
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
              )}
            </button>
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
      <div className="relative z-10 flex flex-col justify-center h-full min-h-screen w-full px-4 sm:px-12 lg:px-16 pt-24 sm:pt-28 pb-8 pointer-events-none">
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
              </h1>
            </motion.div>

            {/* Specialisation, kept separate from the role title */}
            <motion.div variants={fadeUpVariants} className="mb-4 flex items-center gap-3 sm:mb-5">
              <span aria-hidden="true" className="h-px w-8 bg-[#D4AF37] sm:w-12" />
              <p
                className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F5D59A] sm:text-sm"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Azure Security · Identity &amp; Access (IAM)
              </p>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="mb-6 max-w-xl text-sm font-normal leading-snug tracking-wide text-[#E8DCD0] sm:text-[15px] md:text-base"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <ul className="grid gap-2">
                {[
                  "10 years in IT · 7+ years in Azure",
                  "Entra ID · Azure and network security · incident response",
                  "Microsoft SC-500 certified · led TISAX AL2",
                  "Builds internal apps with AI · Claude, Lovable, Supabase",
                ].map((line) => (
                  <li key={line} className="flex gap-2">
                    <span aria-hidden="true" className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#D4AF37]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Availability */}
            <motion.p
              variants={fadeUpVariants}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/[0.08] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F5D59A] sm:text-xs"
            >
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7FD69B] opacity-70 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7FD69B]" />
              </span>
              Open to Azure &amp; IAM security roles · Pune or remote · Available immediately
            </motion.p>

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
                <span aria-hidden="true" className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-sm font-bold">
                  ↓
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
                <span aria-hidden="true" className="transform transition-transform duration-300 group-hover:translate-y-0.5 text-sm font-bold">
                  ↓
                </span>
              </motion.a>

              {/* LinkedIn Button */}
              <motion.a
                href="https://www.linkedin.com/in/deepak-dongare"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="relative inline-flex items-center justify-center space-x-2 px-6 sm:px-7 py-3.5 border border-[#C99E5D] bg-[#100D0B] hover:border-[#D4AF37] hover:bg-[#1A1510] text-[#F5EDE4] hover:text-white text-xs sm:text-[13px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 text-center"
              >
                <span>CONNECT ON LINKEDIN</span>
                <span aria-hidden="true" className="text-sm font-bold">↗</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stat strip: static and under the actions, so it never covers the portrait */}
        <motion.dl
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto mt-8 grid w-full max-w-xl grid-cols-4 divide-x divide-[#8C6D4F]/40 border-t border-[#8C6D4F]/40 pt-4 sm:mt-10"
          aria-label="Experience at a glance"
        >
          {[
            ["10", "Years in IT"],
            ["7+", "Years in Azure"],
            ["450+", "Users secured"],
            ["100+", "Azure VMs (FinIQ)"],
          ].map(([value, label]) => (
            <div key={label} className="px-2 first:pl-0 sm:px-4">
              <dd className="font-display text-2xl leading-none text-[#F5D59A] sm:text-3xl">
                {value}
              </dd>
              <dt className="mt-1 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.12em] text-[#CFC2B5] sm:text-[11px]">
                {label}
              </dt>
            </div>
          ))}
        </motion.dl>

        {/* Bottom Spacer */}
        <div className="h-2" />
      </div>
    </section>
  );
};

export default HeroSection;
