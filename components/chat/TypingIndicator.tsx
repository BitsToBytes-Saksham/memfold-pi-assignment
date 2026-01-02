"use client";

import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-1.5 px-6 py-4 bg-white border border-[#E6E2D6] rounded-2xl rounded-bl-sm shadow-sm"
    >
      <motion.span
        initial={{ y: 0 }}
        animate={{ y: -4 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0
        }}
        className="w-2 h-2 bg-[#56736A] rounded-full"
      />
      <motion.span
        initial={{ y: 0 }}
        animate={{ y: -4 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0.15
        }}
        className="w-2 h-2 bg-[#56736A] rounded-full"
      />
      <motion.span
        initial={{ y: 0 }}
        animate={{ y: -4 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0.3
        }}
        className="w-2 h-2 bg-[#56736A] rounded-full"
      />
    </motion.div>
  );
}