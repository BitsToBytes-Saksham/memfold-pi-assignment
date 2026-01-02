"use client";

import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import InputArea from "../components/InputArea";
import ChatBubble from "../components/chat/ChatBubble";
import TypingIndicator from "../components/chat/TypingIndicator";
import Discover from "../components/discover/Discover";
import { AnimatePresence, motion } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    if (!hasStarted) setHasStarted(true);

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: [...messages, userMsg],
        }),
      });
      const data = await res.json();
      
      const assistantText = data.reply || data.choices?.[0]?.message?.content || "I couldn't connect.";
      
      setMessages((prev) => [...prev, { role: "assistant", content: assistantText }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error connecting to Pi." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-screen w-full bg-[#F3F0E7] text-[#0D3C26] overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:block w-[280px] h-full border-r border-[#E6E2D6] flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full w-full">
          
          {/* Mobile Header */}
          <div className="md:hidden flex items-center p-4 bg-[#F3F0E7] sticky top-0 z-10 border-b border-[#E6E2D6]/50">
             <span className="font-serif font-bold text-xl"></span>
          </div>

          <AnimatePresence mode="wait">
            {!hasStarted && messages.length === 0 ? (
              <motion.div
                key="discover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 overflow-y-auto px-6 md:px-32 py-10 pb-56"
              >
                <div className="max-w-3xl mx-auto h-full flex flex-col justify-center">
                   <Discover onSelect={handleSend} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 overflow-y-auto px-6 md:px-32 pt-10 md:pt-20 pb-56 w-full scroll-smooth"
              >
                <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                  {messages.map((m, idx) => (
                    <ChatBubble key={idx} role={m.role} content={m.content} />
                  ))}

                  {isLoading && (
                    <div className="flex justify-start px-2">
                      <TypingIndicator />
                    </div>
                  )}
                  
                  <div ref={endRef} className="h-4" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Input Area - OUTSIDE the flex container so it floats at screen bottom */}
      <InputArea onSend={handleSend} disabled={isLoading} />
    </>
  );
}