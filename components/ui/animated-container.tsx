"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  animation?: "fadeIn" | "slideUp" | "scale" | "none";
}

export function AnimatedContainer({
  children,
  delay = 0,
  className = "",
  animation = "fadeIn",
}: AnimatedContainerProps) {
  // Animation variants
  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
    scale: {
      hidden: { scale: 0.9, opacity: 0 },
      visible: { scale: 1, opacity: 1 },
    },
    none: {
      hidden: {},
      visible: {},
    },
  };

  const selectedAnimation = animations[animation];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={selectedAnimation}
      transition={{
        duration: 0.4,
        delay: delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}