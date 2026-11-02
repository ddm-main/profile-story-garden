// @ts-nocheck -- imported portfolio code written for a less strict TS config
import React from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const easedProgress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[#E6C27D] shadow-[0_0_12px_rgba(230,194,125,0.7)]"
      style={{ scaleX: reduceMotion ? scrollYProgress : easedProgress }}
    />
  );
};

export default ScrollProgress;
