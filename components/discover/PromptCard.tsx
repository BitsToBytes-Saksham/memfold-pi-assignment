"use client";

import { motion } from "framer-motion";

type CardSize = "medium" | "wide" | "large";

type Props = {
  title: string;
  image: string;
  size: CardSize;
  index: number;
  onClick: () => void;
};

export default function PromptCard({ title, image, size, index, onClick }: Props) {
  const sizeClasses = {
    medium: "h-[140px]",
    wide: "h-[140px]",
    large: "h-[140px]",
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.3 + index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -2,
        scale: 1.01,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        group relative rounded-2xl overflow-hidden
        shadow-[0_2px_20px_rgba(0,0,0,0.08)]
        hover:shadow-[0_8px_40px_rgba(0,0,0,0.16)]
        transition-shadow duration-300
        ${sizeClasses[size]}
      `}
    >
      {/* Image with smooth loading - fills entire block */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Sophisticated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

      {/* Text with refined typography */}
      <div className="absolute inset-0 flex items-end p-4">
        <h3 className="font-serif text-[16px] leading-[1.2] font-medium text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
          {title}
        </h3>
      </div>

      {/* Subtle hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white/5 to-transparent" />
    </motion.button>
  );
}
