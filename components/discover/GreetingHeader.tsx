"use client";

import { motion } from "framer-motion";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return "Good morning";
  if (hour >= 11 && hour < 17) return "Good afternoon";
  return "Good evening";
}

type Props = {
  userName?: string;
};

export default function GreetingHeader({ userName }: Props) {
  const greeting = getGreeting();

  return (
    <div className="space-y-3">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif text-5xl font-semibold text-[#1A1A1A] tracking-tight leading-[1.1]"
      >
        {greeting}
        {userName && (
          <>
            ,{" "}
            <span className="text-[#666666] font-light italic">
              {userName}
            </span>
          </>
        )}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-[17px] text-[#6B6B6B] font-light leading-relaxed"
      >
        What would you like to explore?
      </motion.p>
    </div>
  );
}
