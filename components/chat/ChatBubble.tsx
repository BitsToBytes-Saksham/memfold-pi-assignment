"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import MessageActions from "./MessageActions";

type Props = {
  role: "user" | "assistant";
  content: string;
  onContinueInNewChat?: (content: string) => void;
  onReport?: (content: string) => void;
};

const ChatBubble = React.memo(({ role, content, onContinueInNewChat, onReport }: Props) => {
  const isUser = role === "user";
  const [isHovered, setIsHovered] = useState(false);

  const handleContinueInNewChat = () => {
    if (onContinueInNewChat) {
      onContinueInNewChat(content);
    }
  };

  const handleReport = () => {
    if (onReport) {
      onReport(content);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} group`}
      onMouseEnter={() => !isUser && setIsHovered(true)}
      onMouseLeave={() => !isUser && setIsHovered(false)}
    >
      <div className="flex flex-col max-w-[640px] w-full">
        <div
          className={`
            px-6 py-4 rounded-2xl shadow-sm
            transition-all duration-200
            ${
              isUser
                ? "bg-[#E6EFEA] text-[#0D3C26] rounded-br-sm"
                : "bg-white text-[#0D3C26] shadow-[0_2px_20px_rgba(0,0,0,0.08)] rounded-bl-sm border border-[#E6E2D6]"
            }
            ${!isUser && "group-hover:shadow-[0_4px_28px_rgba(0,0,0,0.12)]"}
          `}
        >
          <div
            style={{
              color: "#0D3C26",
              fontSize: "1rem",
              lineHeight: "1.6",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {content}
          </div>
        </div>

        {/* Message Actions - Show on hover for assistant messages */}
        {!isUser && (
          <div
            className={`px-2 mt-2 transition-opacity duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <MessageActions
              content={content}
              onContinueInNewChat={handleContinueInNewChat}
              onReport={handleReport}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
});

ChatBubble.displayName = "ChatBubble";

export default ChatBubble;
