import React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

type RevealTextProps = { children: string; className?: string };

/** A single calm reveal per content item; avoids choppy word-by-word motion. */
export const RevealText: React.FC<RevealTextProps> = ({ children, className = '' }) => {
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: Boolean(reduceMotion), amount: 0.15, margin: '0px 0px -4% 0px' });

  return (
    <motion.span
      ref={ref}
      className={`block ${className}`.trim()}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={reduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  );
};

export default RevealText;
