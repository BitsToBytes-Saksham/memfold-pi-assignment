"use client";

import React, { useState } from "react";
import { Copy, ThumbsUp, ThumbsDown, RefreshCw, Flag, Check } from "lucide-react";

type Props = {
  content: string;
  onContinueInNewChat: () => void;
  onReport: () => void;
};

export default function MessageActions({ content, onContinueInNewChat, onReport }: Props) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"good" | "bad" | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleFeedback = (type: "good" | "bad") => {
    setFeedback(feedback === type ? null : type);
  };

  const buttonClass = `
    p-2 rounded-lg
    hover:bg-[#E6E2D6]/60 active:bg-[#E6E2D6]
    transition-all duration-150
    focus:outline-none
  `;
  const iconSize = 16;

  return (
    <div className="flex items-center gap-1">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className={buttonClass}
        title="Copy"
        aria-label="Copy message"
      >
        {copied ? (
          <Check size={iconSize} className="text-emerald-600" strokeWidth={2} />
        ) : (
          <Copy size={iconSize} className="text-[#0D3C26]/60" strokeWidth={2} />
        )}
      </button>

      {/* Good Response */}
      <button
        onClick={() => handleFeedback("good")}
        className={`${buttonClass} ${feedback === "good" ? "bg-emerald-50" : ""}`}
        title="Good response"
        aria-label="Mark as good response"
      >
        <ThumbsUp
          size={iconSize}
          strokeWidth={2}
          className={feedback === "good" ? "text-emerald-600 fill-emerald-600" : "text-[#0D3C26]/60"}
        />
      </button>

      {/* Bad Response */}
      <button
        onClick={() => handleFeedback("bad")}
        className={`${buttonClass} ${feedback === "bad" ? "bg-rose-50" : ""}`}
        title="Bad response"
        aria-label="Mark as bad response"
      >
        <ThumbsDown
          size={iconSize}
          strokeWidth={2}
          className={feedback === "bad" ? "text-rose-600 fill-rose-600" : "text-[#0D3C26]/60"}
        />
      </button>

      {/* Divider */}
      <div className="w-px h-4 bg-[#0D3C26]/10 mx-1" />

      {/* Continue in New Chat */}
      <button
        onClick={onContinueInNewChat}
        className={buttonClass}
        title="Continue in a new chat"
        aria-label="Continue in a new chat"
      >
        <RefreshCw size={iconSize} className="text-[#0D3C26]/60" strokeWidth={2} />
      </button>

      {/* Report Message */}
      <button
        onClick={onReport}
        className={buttonClass}
        title="Report message"
        aria-label="Report message"
      >
        <Flag size={iconSize} className="text-[#0D3C26]/60" strokeWidth={2} />
      </button>
    </div>
  );
}
