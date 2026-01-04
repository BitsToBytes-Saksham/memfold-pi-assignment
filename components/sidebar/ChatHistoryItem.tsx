"use client";

import React from "react";
import { Trash2, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  isActive: boolean;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
};

export default function ChatHistoryItem({ title, isActive, onClick, onDelete }: Props) {
  return (
    <motion.div
      whileHover={{ x: 3, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className={`
        group relative flex items-center gap-4 pl-6 pr-5 py-5 rounded-2xl cursor-pointer transition-all duration-250 mb-2
        border-[2px]
        ${isActive
          ? "bg-gradient-to-br from-[#0D3C26]/[0.12] to-[#0D3C26]/[0.08] shadow-[0_2px_8px_rgba(13,60,38,0.15),0_4px_16px_rgba(13,60,38,0.08)] border-[#0D3C26]/[0.25]"
          : "bg-gradient-to-br from-white/60 to-white/40 border-[#0D3C26]/[0.14] hover:from-white/70 hover:to-white/50 hover:bg-[#0D3C26]/[0.06] hover:border-[#0D3C26]/[0.22] hover:shadow-[0_2px_10px_rgba(13,60,38,0.12)]"
        }
      `}
    >
      {/* Chat Icon Container */}
      <div className={`
        relative flex items-center justify-center w-10 h-10 rounded-2xl
        transition-all duration-250
        ${isActive
          ? "bg-gradient-to-br from-[#0D3C26]/[0.15] to-[#0D3C26]/[0.10] shadow-[inset_0_2px_4px_rgba(13,60,38,0.15),0_2px_6px_rgba(13,60,38,0.1)]"
          : "bg-gradient-to-br from-[#0D3C26]/[0.08] to-[#0D3C26]/[0.04] group-hover:from-[#0D3C26]/[0.12] group-hover:to-[#0D3C26]/[0.08] shadow-[inset_0_1px_2px_rgba(13,60,38,0.08),0_1px_3px_rgba(13,60,38,0.05)] group-hover:shadow-[inset_0_2px_4px_rgba(13,60,38,0.12),0_2px_6px_rgba(13,60,38,0.08)]"
        }
      `}>
        <MessageSquare
          size={23}
          strokeWidth={2.75}
          className={`transition-all duration-250 drop-shadow-sm ${
            isActive
              ? "text-[#0D3C26]/90"
              : "text-[#0D3C26]/60 group-hover:text-[#0D3C26]/80 group-hover:scale-105"
          }`}
        />
      </div>

      {/* Title Text */}
      <span
        className={`text-[15px] font-black truncate pr-12 flex-1 transition-colors duration-250 tracking-wide ${
          isActive ? "text-[#0D3C26]" : "text-[#0D3C26]/75 group-hover:text-[#0D3C26]/95"
        }`}
      >
        {title}
      </span>

      {/* Delete button (Visible on Hover or Active) */}
      <motion.button
        onClick={onDelete}
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        className={`
          absolute right-3 p-2.5 rounded-xl text-[#0D3C26]/40
          hover:text-rose-600 hover:bg-rose-50 hover:shadow-sm
          transition-all duration-250 border border-transparent hover:border-rose-200
          ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `}
        aria-label="Delete chat"
      >
        <Trash2 size={16} strokeWidth={2.5} />
      </motion.button>
    </motion.div>
  );
}