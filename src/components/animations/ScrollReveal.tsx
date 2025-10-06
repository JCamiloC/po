"use client";
import { motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  delay?: number;
  y?: number;
  once?: boolean;
}>;

export default function ScrollReveal({ children, delay = 0, y = 16, once = true }: Props) {
  const reduce = useReducedMotion();
  const d = reduce ? 0 : delay;
  const offset = reduce ? 0 : y;
  return (
    <motion.div
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0% -10% 0%" }}
      transition={{ duration: 0.6, delay: d, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
