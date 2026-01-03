"use client";

import React from "react";
import { Trash2 } from "lucide-react";
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
      whileHover={{ x: 2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        group relative flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200
        ${isActive
          ? "bg-[#E6E2D6] shadow-[0_1px_8px_rgba(13,60,38,0.08)]"
          : "hover:bg-[#E6E2D6]/50"
        }
      `}
    >
      <span
        className={`text-[14px] font-medium truncate pr-10 w-full transition-colors ${
          isActive ? "text-[#0D3C26]" : "text-[#0D3C26]/70 group-hover:text-[#0D3C26]/90"
        }`}
      >
        {title}
      </span>

      {/* Delete button (Visible on Hover or Active) */}
      <motion.button
        onClick={onDelete}
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`
          absolute right-2.5 p-1.5 rounded-lg text-[#0D3C26]/40
          hover:text-rose-600 hover:bg-rose-50/80
          transition-all duration-200
          ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `}
        aria-label="Delete chat"
      >
        <Trash2 size={13} strokeWidth={2} />
      </motion.button>
    </motion.div>
  );
}