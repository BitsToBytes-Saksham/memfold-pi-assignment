"use client";

import React from "react";
import { motion } from "framer-motion";
import { Chat } from "@/types/chat";
import ChatHistoryItem from "./ChatHistoryItem";

type Props = {
  chats: Chat[];
  currentChatId: string | null;
  onChatSelect: (id: string) => void;
  onChatDelete: (id: string) => void;
};

export default function ChatHistory({ chats, currentChatId, onChatSelect, onChatDelete }: Props) {
  // BULLETPROOF EMPTY CHECK - handles undefined/null/non-array/empty
  if (!chats || !Array.isArray(chats) || chats.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="px-4 py-12 text-center"
      >
        <p className="text-[13px] font-medium text-[#0D3C26]/50">No conversations yet</p>
        <p className="text-[12px] text-[#0D3C26]/30 mt-1.5">Start a new chat to see history</p>
      </motion.div>
    );
  }

  // Simple sort by most recent first
  const sortedChats = [...chats].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="px-1.5 py-2 space-y-1"
    >
      {sortedChats.map((chat, index) => (
        <motion.div
          key={chat.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.2 + index * 0.03,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <ChatHistoryItem
            title={chat.title}
            isActive={chat.id === currentChatId}
            onClick={() => onChatSelect(chat.id)}
            onDelete={(e) => {
              e.stopPropagation();
              onChatDelete(chat.id);
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
