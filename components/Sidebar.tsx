"use client";

import React from "react";
import { SquarePen, Sparkles, PanelRight } from "lucide-react";
import { motion } from "framer-motion";
import ChatHistory from "./sidebar/ChatHistory";
import { Chat } from "@/types/chat";

type Props = {
  chats: Chat[];
  currentChatId: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  onDiscover: () => void;
  onChatSelect: (id: string) => void;
  onChatDelete: (id: string) => void;
};

export default function Sidebar({
  chats,
  currentChatId,
  isOpen,
  onToggle,
  onNewChat,
  onDiscover,
  onChatSelect,
  onChatDelete,
}: Props) {
  return (
    <aside className="flex flex-col h-full w-full bg-[#F3F0E7] text-[#0D3C26] border-r border-[#E6E2D6]/50">
      {/* HEADER */}
      <div className="flex justify-between items-center px-6 pt-6 pb-4 shrink-0">
        <motion.h1
          animate={{
            fontSize: isOpen ? "2.25rem" : "1.5rem",
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-bold tracking-tight text-[#0D3C26]"
        >
          Pi
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "rgba(230, 226, 214, 0.8)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggle}
          className="p-2.5 rounded-xl hover:bg-[#E6E2D6]/60 transition-all duration-200"
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <PanelRight
            size={20}
            strokeWidth={2}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </motion.button>
      </div>

      {/* NAVIGATION */}
      <motion.nav
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-1.5 px-3 mb-6 shrink-0"
      >
        <motion.button
          whileHover={{ scale: 1.02, x: 2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewChat}
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#E6E2D6]/60 transition-all duration-200 group"
        >
          <SquarePen
            size={19}
            strokeWidth={2}
            className="text-[#0D3C26]/70 group-hover:text-[#0D3C26] transition-colors"
          />
          {isOpen && (
            <span className="text-[15px] font-medium text-[#0D3C26]/90 group-hover:text-[#0D3C26] transition-colors">
              New chat
            </span>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02, x: 2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDiscover}
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#E6E2D6]/60 transition-all duration-200 group"
        >
          <Sparkles
            size={19}
            strokeWidth={2}
            className="text-[#0D3C26]/70 group-hover:text-[#0D3C26] transition-colors"
          />
          {isOpen && (
            <span className="text-[15px] font-medium text-[#0D3C26]/90 group-hover:text-[#0D3C26] transition-colors">
              Discover
            </span>
          )}
        </motion.button>
      </motion.nav>

      {/* DIVIDER */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="h-px bg-[#0D3C26]/10 mx-6 mb-4"
        />
      )}

      {/* CHAT HISTORY */}
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          display: isOpen ? "block" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="flex-1 overflow-y-auto min-h-0 px-2"
      >
        <ChatHistory
          chats={chats}
          currentChatId={currentChatId}
          onChatSelect={onChatSelect}
          onChatDelete={onChatDelete}
        />
      </motion.div>
    </aside>
  );
}
