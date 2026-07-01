"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: "10vh",
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.5, 0, 0, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0.5,
    y: "10vh",
    scale: 0.9,
    transition: {
      duration: 0.75,
      ease: [0.5, 0, 0, 1] as [number, number, number, number],
    },
  },
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="page-transition-wrapper"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
