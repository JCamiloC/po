"use client";
import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 right-0 h-1.5 z-[60] bg-gradient-to-r from-blue-500/80 via-purple-500/80 to-pink-500/80 origin-left"
      style={{ scaleX: scrollYProgress, top: 56 }}
    />
  );
}
