"use client";

import { motion } from "framer-motion";

export default function TypingIndicator() {
  const dotVariants = {
    initial: { y: 0, opacity: 0.5 },
    animate: { y: -6, opacity: 1 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex max-w-[640px] w-full"
    >
      <div className="flex items-center gap-2 px-6 py-4 bg-white/90 backdrop-blur-sm border border-black/[0.04] rounded-[24px] rounded-bl-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]">
        <motion.span
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: [0.4, 0, 0.6, 1],
            delay: 0,
          }}
          className="w-2 h-2 bg-[#6B6B6B] rounded-full"
        />
        <motion.span
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: [0.4, 0, 0.6, 1],
            delay: 0.2,
          }}
          className="w-2 h-2 bg-[#6B6B6B] rounded-full"
        />
        <motion.span
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: [0.4, 0, 0.6, 1],
            delay: 0.4,
          }}
          className="w-2 h-2 bg-[#6B6B6B] rounded-full"
        />
      </div>
    </motion.div>
  );
}