import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { RevealText } from "./RevealText";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const AboutSection: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // 1. Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useMotionValue(200);
  const spotlightY = useMotionValue(200);

  // 2. Springs for 3D Physics
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), {
    damping: 18,
    stiffness: 220,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), {
    damping: 18,
    stiffness: 220,
  });

  // 3. Top-Level Unconditional Transform for Spotlight Background
  const spotlightBg = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) =>
      `radial-gradient(circle 240px at ${x}px ${y}px, rgba(255,255,255,0.35), rgba(212,175,55,0.18), transparent 80%)`,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => setIsCardHovered(true);

  const handleMouseLeave = () => {
    setIsCardHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="about"
      className="relative w-full min-h-[100svh] bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black py-16 sm:py-24 lg:py-32 px-4 sm:px-12 lg:px-20 overflow-hidden flex items-center"
    >
      {/* ================= BACKGROUND GLOWS & FLOATING PARTICLES ================= */}
      <motion.div
        animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.08, 0.16, 0.08] }}
        transition={
          prefersReducedMotion ? {} : { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
        className="absolute top-1/4 left-1/6 w-[32rem] h-[32rem] bg-[#D4AF37] rounded-full blur-[160px] pointer-events-none"
      />
      <motion.div
        animate={prefersReducedMotion ? {} : { scale: [1.2, 1, 1.2], opacity: [0.05, 0.12, 0.05] }}
        transition={
          prefersReducedMotion ? {} : { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }
        className="absolute bottom-1/6 right-1/4 w-[28rem] h-[28rem] bg-[#8C6D4F] rounded-full blur-[170px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center space-x-4 mb-6 sm:mb-10"
        >
          <span
            className="text-xs sm:text-[13px] font-semibold tracking-[0.3em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            01 / ABOUT DEEPAK
          </span>
          <div className="w-16 sm:w-20 h-[1.5px] bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/50 to-transparent" />
        </motion.div>

        {/* Main Grid: Content + Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* ================= LEFT CONTENT (7 COLS) ================= */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12, margin: "0px 0px -4% 0px" }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Cinematic Headline with High-Contrast Luminous Gradients */}
            <motion.div variants={fadeUpVariants} className="relative mb-5 sm:mb-6 select-none">
              <h2
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] tracking-tight uppercase leading-[0.9] sm:leading-[0.88]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}

                aria-label="10 Years in IT. 7+ Years in Azure Security."
              >
                <span
                  aria-hidden="true"
                  className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F4EFEA] to-[#D8CEC4] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
                >
                  10 YEARS IN IT
                </span>
                <span
                  aria-hidden="true"
                  className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5DC] via-[#F5D59A] to-[#D4A95D] drop-shadow-[0_8px_25px_rgba(212,169,93,0.4)]"
                >
                  AZURE SECURITY.
                </span>
              </h2>
            </motion.div>

            <motion.ul
              variants={fadeUpVariants}
              className="mb-8 grid max-w-2xl gap-2.5 text-sm leading-snug text-[#E8DCD0] sm:mb-10 sm:grid-cols-2 sm:text-[15px]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {[
                "Pune, India · Senior Cloud Security Engineer",
                "10 years in IT · 7+ years in Azure",
                "Entra ID · cloud and network security · endpoint defense",
                "230–240 users · 260+ endpoints · 20 shared devices · 5 on-prem servers",
                "TISAX Assessment Level 2 · security governance",
                "PowerShell and Python security reporting automation",
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-[0.42em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]"
                  />
                  <RevealText>{item}</RevealText>
                </li>
              ))}
            </motion.ul>

            {/* Concise 4-Item Achievement Metrics Grid */}
            <motion.div
              variants={fadeUpVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-5 sm:pt-6 pb-2 border-t border-[#8C6D4F]/40"
            >
              {/* Stat 1 */}
              <div className="flex flex-col">
                <span
                  className="text-3xl sm:text-5xl font-normal text-[#FFFFFF] tracking-tight"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  10
                </span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-[#F0E6DC] mt-1">
                  Years in IT
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col">
                <span
                  className="text-3xl sm:text-5xl font-normal text-[#F5D59A] tracking-tight"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  7+
                </span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-[#F0E6DC] mt-1">
                  Years Azure
                </span>
              </div>

              {/* Stat 3 */}
              <a
                href="#certification"
                aria-label="View SC-500 certification details"
                className="flex flex-col transition-opacity hover:opacity-80"
              >
                <span
                  className="text-3xl sm:text-5xl font-normal text-[#FFFFFF] tracking-tight"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  SC-500
                </span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-[#F0E6DC] mt-1">
                  Microsoft Certified ↓
                </span>
              </a>

              {/* Stat 4 */}
              <div className="flex flex-col">
                <span
                  className="text-3xl sm:text-5xl font-normal text-[#F5D59A] tracking-tight"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  B.E.
                </span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-[#F0E6DC] mt-1">
                  SPPU First Class
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT PORTRAIT FRAME (PERFECT LOCKED GEOMETRY) ================= */}
          <div className="lg:col-span-5 flex items-center justify-center relative perspective-[1400px]">
            {/* Ambient Animated Gold Glow Ring Behind Frame */}
            <motion.div
              animate={{
                scale: isCardHovered ? 1.15 : 1,
                opacity: isCardHovered ? 0.35 : 0.15,
                rotate: isCardHovered ? 180 : 0,
              }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="absolute -inset-6 bg-[conic-gradient(from_0deg,#D4AF37_0%,#8C6D4F_30%,transparent_60%,#D4AF37_100%)] blur-2xl rounded-3xl pointer-events-none"
            />

            {/* Drifting Gold Spark Embers on Hover */}
            {isCardHovered && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10, x: -20 }}
                  animate={{ opacity: [0, 1, 0], y: -50, x: -30 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute top-1/4 -left-6 w-1.5 h-1.5 bg-[#F3DBB3] rounded-full blur-[1px] shadow-[0_0_8px_#D4AF37] pointer-events-none z-30"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20, x: 20 }}
                  animate={{ opacity: [0, 1, 0], y: -60, x: 40 }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                  className="absolute bottom-1/3 -right-6 w-2 h-2 bg-[#D4AF37] rounded-full blur-[1px] shadow-[0_0_10px_#D4AF37] pointer-events-none z-30"
                />
              </>
            )}

            {/* 3D Holographic Main Card Container */}
            <motion.div
              ref={cardRef}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-3.5 border border-[#8C6D4F]/40 rounded-sm bg-[#120F0C]/80 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] cursor-pointer group transition-colors duration-500 hover:border-[#D4AF37]/80"
            >
              {/* Dynamic Laser Border Pulse on Card Perimeter */}
              <div className="absolute inset-0 rounded-sm pointer-events-none overflow-hidden">
                <motion.div
                  animate={
                    !prefersReducedMotion && isCardHovered
                      ? { x: ["-100%", "200%"] }
                      : { x: "-100%" }
                  }
                  transition={
                    !prefersReducedMotion ? { duration: 1.8, repeat: Infinity, ease: "linear" } : {}
                  }
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent skew-x-12"
                />
              </div>

              {/* Locked Corner Gold Accent Brackets */}
              <div className="pointer-events-none">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37] transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37] transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.5 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
              </div>

              {/* Portrait Image Canvas */}
              <div className="relative overflow-hidden w-full max-w-[390px] aspect-[4/5] bg-black rounded-sm">
                {/* Main Portrait */}
                <img
                  src="/deepak-portrait.webp"
                  alt="Portrait of Deepak Dongare, Senior Cloud Security Engineer"
                  width={390}
                  height={488}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top filter brightness-[0.94] contrast-[1.06] saturate-[1.02] group-hover:brightness-105 group-hover:contrast-[1.12] transition-all duration-700 ease-out"
                />

                {/* Mouse-Tracked Holographic Glass Spotlight Sweep */}
                <motion.div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
                  style={{
                    background: spotlightBg,
                    opacity: isCardHovered ? 1 : 0,
                  }}
                />

                {/* Bottom Film Noir Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Monoline Signature */}
                <div className="absolute bottom-4 right-4 z-20 select-none">
                  <span
                    className="text-3xl text-[#F2D8A7] drop-shadow-[0_0_12px_rgba(242,216,167,0.5)] transition-colors duration-300 group-hover:text-white"
                    style={{ fontFamily: "'Herr Von Muellerhoff', cursive" }}
                  >
                    Deepak Dongare
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
