"use client";

import { motion } from "framer-motion";
import PromptCard from "./PromptCard";

const PROMPTS = [
  {
    emoji: "🧠",
    title: "Think through a problem",
    description: "Break down complex ideas step by step",
  },
  {
    emoji: "📚",
    title: "Learn something new",
    description: "Explore topics, concepts, or skills",
  },
  {
    emoji: "✍️",
    title: "Write something",
    description: "Draft messages, essays, or thoughts",
  },
  {
    emoji: "💡",
    title: "Get advice",
    description: "Talk through decisions or situations",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function Discover({
  onSelect,
}: {
  onSelect: (text: string) => void;
}) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 pb-12">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-[2.75rem] md:text-5xl font-light text-center mb-4 leading-tight tracking-tight"
      >
        What would you like to talk about?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-[#56736A] text-center text-base mb-12 max-w-md"
      >
        Choose a starting point or ask Pi anything.
      </motion.p>

      {/* Prompt Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl w-full"
      >
        {PROMPTS.map((p) => (
          <PromptCard
            key={p.title}
            {...p}
            onClick={() => onSelect(p.title)}
          />
        ))}
      </motion.div>
    </div>
  );
}