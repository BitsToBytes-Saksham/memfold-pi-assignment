"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import InputArea from "../components/InputArea";
import ChatBubble from "../components/chat/ChatBubble";
import TypingIndicator from "../components/chat/TypingIndicator";
import Discover from "../components/discover/Discover";
import { AnimatePresence, motion } from "framer-motion";
import { useChatHistory } from "@/hooks/useChatHistory";
import { Message } from "@/types/chat";

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // ✅ Sidebar collapse state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ✅ Discover panel state
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);

  const endRef = useRef<HTMLDivElement | null>(null);

  const {
    currentChatId,
    setCurrentChatId,
    createNewChat,
    updateChat,
    deleteChat,
    loadChat,
    getAllChats,
    isLoaded,
  } = useChatHistory();

  useEffect(() => {
    if (endRef.current && messages.length > 0) {
      // Wait for DOM to update, then scroll
      const timer = setTimeout(() => {
        endRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest"
        });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [messages, isLoading]);

  const handleSend = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      // Only create chat when user actually sends first message
      let activeId = currentChatId;
      if (!activeId || messages.length === 0) {
        activeId = createNewChat();
        setCurrentChatId(activeId);
      }

      if (!hasStarted) setHasStarted(true);

      const userMsg: Message = { role: "user", content: text };
      const updatedHistory = [...messages, userMsg];

      setMessages(updatedHistory);
      updateChat(activeId, updatedHistory);
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history: updatedHistory }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        // Read streaming response
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error("No response body");
        }

        let assistantContent = "";
        let isFirstChunk = true;
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          // Decode chunk and add to buffer
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");

          // Keep last partial line in buffer
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6).trim();

              if (data === "[DONE]") {
                continue;
              }

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;

                if (content) {
                  assistantContent += content;

                  if (isFirstChunk) {
                    // First token: create message, hide TypingIndicator
                    isFirstChunk = false;
                    setIsLoading(false);
                    setMessages((prev) => [
                      ...prev,
                      { role: "assistant", content: assistantContent },
                    ]);
                  } else {
                    // Subsequent tokens: update last message only
                    setMessages((prev) => {
                      const newMessages = [...prev];
                      newMessages[newMessages.length - 1] = {
                        role: "assistant",
                        content: assistantContent,
                      };
                      return newMessages;
                    });
                  }
                }
              } catch (parseError) {
                // Skip invalid JSON chunks
                console.warn("Failed to parse SSE chunk:", parseError);
              }
            }
          }
        }

        // Stream complete: save final message to localStorage
        if (assistantContent) {
          const assistantMsg: Message = {
            role: "assistant",
            content: assistantContent,
          };
          const finalHistory = [...updatedHistory, assistantMsg];
          updateChat(activeId, finalHistory);
        } else {
          // No content received - show error
          throw new Error("No content received from stream");
        }
      } catch (error) {
        console.error("Streaming error:", error);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Error connecting to Pi." },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [currentChatId, createNewChat, setCurrentChatId, hasStarted, messages, updateChat]
  );

  const handleNewChat = () => {
    // Don't create chat until user sends first message
    setCurrentChatId(null);
    setMessages([]);
    setHasStarted(false);
  };

  const handleDiscover = () => {
    setIsDiscoverOpen((prev) => !prev);
  };

  const handleDiscoverSelect = (prompt: string) => {
    setIsDiscoverOpen(false);
    handleSend(prompt);
  };

  const handleChatSelect = (chatId: string) => {
    const chatMessages = loadChat(chatId);
    setCurrentChatId(chatId);
    setMessages(chatMessages);
    setHasStarted(chatMessages.length > 0);
  };

  const handleChatDelete = (chatId: string) => {
    deleteChat(chatId);
    if (chatId === currentChatId) {
      setCurrentChatId(null);
      setMessages([]);
      setHasStarted(false);
    }
  };

  const handleContinueInNewChat = useCallback(
    (content: string) => {
      // Don't create chat until message is sent
      setCurrentChatId(null);
      setMessages([]);
      setHasStarted(false);
      // Send the content as first message in new chat
      setTimeout(() => handleSend(content), 100);
    },
    [setCurrentChatId, handleSend]
  );

  const handleReport = useCallback(
    (content: string) => {
      const confirmed = window.confirm(
        "Report this message?\n\nThis will flag the message for review."
      );
      if (confirmed) {
        console.log("Message reported:", content);
        alert("Message reported successfully. Thank you for your feedback.");
      }
    },
    []
  );

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F3F0E7]">
        <div className="text-lg">Loading chats...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#F3F0E7] text-[#0D3C26] overflow-hidden">
      {/* ✅ COLLAPSIBLE SIDEBAR */}
      <div
        className={`
          ${isSidebarOpen ? "w-[300px] min-w-[300px]" : "w-16 min-w-16"}
          h-full shrink-0 border-r border-[#E6E2D6] bg-[#F3F0E7]
          transition-all duration-300 ease-in-out
        `}
      >
        <Sidebar
          chats={getAllChats()}
          currentChatId={currentChatId}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((v) => !v)}
          onNewChat={handleNewChat}
          onDiscover={handleDiscover}
          onChatSelect={handleChatSelect}
          onChatDelete={handleChatDelete}
        />
      </div>

      {/* DISCOVER PANEL - Narrow toggleable window */}
      <AnimatePresence>
        {isDiscoverOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-full shrink-0 border-r border-[#E6E2D6] bg-white overflow-hidden"
          >
            <div className="h-full overflow-y-auto">
              <Discover onSelect={handleDiscoverSelect} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col relative h-full min-w-0">
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden pr-8 lg:pr-40 pl-8 lg:pl-16 pt-16 lg:pt-32"
          style={{ paddingBottom: '400px' }}
        >
          {messages.length === 0 ? (
            <div className="max-w-4xl mx-auto h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <h1 className="font-serif text-5xl font-semibold text-[#1A1A1A] tracking-tight">
                  Welcome to Pi
                </h1>
                <p className="text-[17px] text-[#6B6B6B] font-light">
                  How can I help you today?
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
              {messages.map((m, idx) => (
                <ChatBubble
                  key={idx}
                  role={m.role}
                  content={m.content}
                  onContinueInNewChat={handleContinueInNewChat}
                  onReport={handleReport}
                />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}
              <div ref={endRef} style={{ height: '200px' }} />
            </div>
          )}
        </div>

        <InputArea onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
}
