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
    <aside className="flex flex-col h-full w-full bg-[#FAF9F7] text-[#0D3C26] border-r border-[#0D3C26]/[0.06]">
      {/* HEADER - Refined */}
      <div className="flex justify-between items-center px-6 py-6 shrink-0">
        <motion.h1
          animate={{
            fontSize: isOpen ? "1.875rem" : "1.5rem",
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-bold tracking-tight text-[#0D3C26]"
        >
          Pi
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggle}
          className="p-3 rounded-2xl hover:bg-gradient-to-br hover:from-[#0D3C26]/[0.10] hover:to-[#0D3C26]/[0.06] active:bg-[#0D3C26]/[0.14] transition-all duration-200 shadow-[0_2px_8px_rgba(13,60,38,0.08)] hover:shadow-[0_4px_12px_rgba(13,60,38,0.15)] border border-transparent hover:border-[#0D3C26]/[0.12]"
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <PanelRight
            size={22}
            strokeWidth={2.75}
            className={`text-[#0D3C26]/70 hover:text-[#0D3C26]/90 drop-shadow-[0_2px_4px_rgba(13,60,38,0.15)] transition-all duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </motion.button>
      </div>

      {/* NAVIGATION - Professional buttons */}
      <motion.nav
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-2.5 px-4 mb-6 shrink-0"
      >
        {/* New Chat - Primary action with solid background */}
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewChat}
          className="relative flex items-center gap-4 px-6 py-5 rounded-2xl bg-gradient-to-br from-[#0F4A30] via-[#0D3C26] to-[#0A2F1E] text-white shadow-[0_4px_16px_rgba(13,60,38,0.35),0_10px_32px_rgba(13,60,38,0.2),0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_24px_rgba(13,60,38,0.45),0_16px_48px_rgba(13,60,38,0.3),0_2px_6px_rgba(0,0,0,0.15)] transition-all duration-250 overflow-hidden group"
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/12 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Multi-layer radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,255,255,0.15)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(76,175,80,0.1)_0%,transparent_70%)] opacity-50 group-hover:opacity-70 transition-opacity duration-300" />

          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-white/25 to-white/10 group-hover:from-white/30 group-hover:to-white/15 shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),inset_0_-2px_4px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.2)] group-hover:shadow-[inset_0_2px_6px_rgba(255,255,255,0.35),inset_0_-2px_6px_rgba(0,0,0,0.15),0_6px_16px_rgba(0,0,0,0.25)] transition-all duration-200 backdrop-blur-sm">
            <SquarePen
              size={23}
              strokeWidth={2.75}
              className="text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transition-all"
            />
          </div>
          {isOpen && (
            <span className="relative text-[17px] font-extrabold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              New chat
            </span>
          )}
        </motion.button>

        {/* Discover - Secondary action */}
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDiscover}
          className="relative flex items-center gap-4 px-6 py-5 rounded-2xl bg-gradient-to-br from-[#E8F5E9] via-[#F1F8E9] to-[#F9FBE7] hover:from-[#C8E6C9] hover:via-[#DCEDC8] hover:to-[#E6EE9C] active:from-[#AED581] active:via-[#C5E1A5] active:to-[#DCE775] transition-all duration-250 group border-[2px] border-[#0D3C26]/[0.18] hover:border-[#0D3C26]/[0.28] shadow-[0_2px_10px_rgba(13,60,38,0.12),0_6px_20px_rgba(139,195,74,0.08),inset_0_1px_2px_rgba(255,255,255,0.8)] hover:shadow-[0_4px_16px_rgba(13,60,38,0.18),0_10px_32px_rgba(139,195,74,0.15),inset_0_1px_2px_rgba(255,255,255,0.9)] overflow-hidden"
        >
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

          {/* Multi-layer radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(139,195,74,0.15)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,60,38,0.04)_0%,transparent_70%)] opacity-50 group-hover:opacity-80 transition-opacity duration-300" />

          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#66BB6A]/20 via-[#81C784]/15 to-[#AED581]/10 group-hover:from-[#66BB6A]/30 group-hover:via-[#81C784]/25 group-hover:to-[#AED581]/20 shadow-[inset_0_2px_4px_rgba(139,195,74,0.2),inset_0_-2px_4px_rgba(13,60,38,0.08),0_3px_10px_rgba(13,60,38,0.12)] group-hover:shadow-[inset_0_2px_6px_rgba(139,195,74,0.3),inset_0_-2px_6px_rgba(13,60,38,0.12),0_4px_14px_rgba(13,60,38,0.18)] transition-all duration-200 backdrop-blur-sm">
            <Sparkles
              size={23}
              strokeWidth={2.75}
              className="text-[#0D3C26]/85 group-hover:text-[#0D3C26] transition-colors drop-shadow-[0_3px_6px_rgba(13,60,38,0.25)] group-hover:drop-shadow-[0_4px_8px_rgba(13,60,38,0.35)]"
            />
          </div>
          {isOpen && (
            <span className="relative text-[17px] font-extrabold text-[#0D3C26]/90 group-hover:text-[#0D3C26] transition-colors tracking-wide drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              Discover
            </span>
          )}
        </motion.button>
      </motion.nav>

      {/* DIVIDER - More subtle */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="h-px bg-[#0D3C26]/[0.1] mx-5 mb-4"
        />
      )}

      {/* SECTION HEADER */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="px-6 mb-3"
        >
          <h2 className="text-[11px] font-bold text-[#0D3C26]/40 uppercase tracking-wider">
            Chats
          </h2>
        </motion.div>
      )}

      {/* CHAT HISTORY */}
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          display: isOpen ? "block" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="flex-1 overflow-y-auto min-h-0 px-3"
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
