"use client";

import { motion, Variants } from "framer-motion";

type Props = {
  emoji: string;
  title: string;
  description: string;
  onClick: () => void;
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
};

export default function PromptCard({
  emoji,
  title,
  description,
  onClick,
}: Props) {
  return (
    <motion.button
      variants={cardVariants}
      whileHover={{
        y: -6,
        scale: 1.02,
        boxShadow: "0px 12px 32px rgba(13, 60, 38, 0.12)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="
        w-full text-left bg-white rounded-2xl p-6
        border border-[#E6E2D6]
        focus:outline-none focus:ring-2 focus:ring-[#0D3C26]/20
        transition-shadow duration-200
        shadow-sm hover:shadow-md
      "
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <div className="font-serif text-[1.125rem] mb-2 font-normal leading-snug">
        {title}
      </div>
      <div className="text-[0.9375rem] text-[#56736A] leading-relaxed">
        {description}
      </div>
    </motion.button>
  );
}