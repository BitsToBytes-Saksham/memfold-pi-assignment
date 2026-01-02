"use client";

import { motion } from "framer-motion";
import React from "react";

type Props = {
  role: "user" | "assistant";
  content: string;
};

const ChatBubble = React.memo(({ role, content }: Props) => {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`
          max-w-[72ch] px-6 py-4 rounded-2xl shadow-sm
          ${
            isUser
              ? "bg-[#E6EFEA] rounded-br-sm"
              : "bg-white border border-[#E6E2D6] rounded-bl-sm"
          }
        `}
      >
        <div
          style={{
            color: "#0D3C26",
            fontSize: "0.9375rem",
            lineHeight: "1.75",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {content}
        </div>
      </div>
    </motion.div>
  );
});

ChatBubble.displayName = "ChatBubble";

export default ChatBubble;
