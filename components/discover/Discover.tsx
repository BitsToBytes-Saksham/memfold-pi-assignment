"use client";

import { motion } from "framer-motion";
import GreetingHeader from "./GreetingHeader";
import PromptCard from "./PromptCard";

const DISCOVER_CARDS = [
  {
    title: "Reflect on your year",
    prompt: "Help me reflect on my recent wins and growth this year",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&q=85",
    size: "medium" as const,
  },
  {
    title: "Set an intention",
    prompt: "Help me set one meaningful intention for the year ahead",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop&q=85",
    size: "medium" as const,
  },
  {
    title: "Something to let go of",
    prompt: "Help me identify something I'm ready to let go of",
    image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&h=400&fit=crop&q=85",
    size: "wide" as const,
  },
  {
    title: "Improve your sleep",
    prompt: "Help me create a better sleep routine and improve my rest",
    image: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=800&h=500&fit=crop&q=85",
    size: "large" as const,
  },
  {
    title: "Meaningful conversation",
    prompt: "Let's have a deep conversation about something important to me",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop&q=85",
    size: "medium" as const,
  },
  {
    title: "Work through a decision",
    prompt: "Help me think through a difficult decision I'm facing",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&h=400&fit=crop&q=85",
    size: "medium" as const,
  },
];

type Props = {
  onSelect: (prompt: string) => void;
  userName?: string;
};

export default function Discover({ onSelect, userName }: Props) {
  return (
    <div className="h-full w-full bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full px-6 py-8 space-y-8"
      >
        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] tracking-tight">
            Discover
          </h2>
          <p className="text-[14px] text-[#6B6B6B] font-light">
            Explore conversation starters
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 gap-3"
        >
          {DISCOVER_CARDS.map((card, idx) => (
            <PromptCard
              key={card.title}
              title={card.title}
              image={card.image}
              size="medium"
              index={idx}
              onClick={() => onSelect(card.prompt)}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
