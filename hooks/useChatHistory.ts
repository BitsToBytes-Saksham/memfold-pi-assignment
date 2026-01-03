"use client";

import { useState, useEffect, useCallback } from "react";
import { Chat, ChatHistory, Message } from "@/types/chat";

const STORAGE_KEY = "pi-chat-history";

export function useChatHistory() {
  const [chatHistory, setChatHistory] = useState<ChatHistory>({});
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          setChatHistory(parsed);
          const recentChats = (Object.values(parsed) as Chat[]).sort(
            (a: Chat, b: Chat) => b.timestamp - a.timestamp
          );
          if (recentChats.length > 0) {
            setCurrentChatId(recentChats[0].id);
          }
        }
      }
    } catch (e) {
      console.error("Failed to load history", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
    } catch (e) {
      console.error("Failed to save history", e);
    }
  }, [chatHistory, isLoaded]);

  const generateChatTitle = useCallback((messages: Message[]) => {
    const firstUserMsg = messages.find((m) => m.role === "user")?.content || "New Chat";
    const words = firstUserMsg.split(" ");
    return words.slice(0, 5).join(" ") + (words.length > 5 ? "..." : "");
  }, []);

  const createNewChat = useCallback(() => {
    const newId = `chat-${Date.now()}`;
    const now = Date.now();
    const newChat: Chat = {
      id: newId,
      title: "New Chat",
      messages: [],
      timestamp: now,
      lastMessage: "",
    };
    setChatHistory((prev) => ({ ...prev, [newId]: newChat }));
    setCurrentChatId(newId);
    return newId;
  }, []);

  const updateChat = useCallback((chatId: string, messages: Message[]) => {
    setChatHistory((prev) => {
      const existing = prev[chatId];
      const now = Date.now();
      const base: Chat = existing || {
        id: chatId,
        title: "New Chat",
        messages: [],
        timestamp: now,
        lastMessage: "",
      };
      const lastMsg = messages[messages.length - 1]?.content || base.lastMessage;
      return {
        ...prev,
        [chatId]: {
          ...base,
          messages,
          title: messages.length > 0 ? generateChatTitle(messages) : base.title,
          timestamp: now,
          lastMessage: lastMsg,
        },
      };
    });
  }, [generateChatTitle]);

  const deleteChat = useCallback((chatId: string) => {
    setChatHistory((prev) => {
      const copy = { ...prev };
      delete copy[chatId];
      return copy;
    });
  }, []);

  const loadChat = useCallback((chatId: string) => {
    return (chatHistory[chatId]?.messages || []) as Message[];
  }, [chatHistory]);

  const getAllChats = useCallback(() => {
    return (Object.values(chatHistory) as Chat[]).sort(
      (a: Chat, b: Chat) => b.timestamp - a.timestamp
    );
  }, [chatHistory]);

  return {
    chatHistory,
    currentChatId,
    setCurrentChatId,
    createNewChat,
    updateChat,
    deleteChat,
    loadChat,
    getAllChats,
    isLoaded,
  };
}
