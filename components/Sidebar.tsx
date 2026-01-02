"use client";

import React from 'react';
import { Compass, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar() {
  return (
    <aside className="h-full flex flex-col p-6 border-r border-[#E6E2D6] bg-transparent text-[#0D3C26]">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-light mb-8"
      >
        Pi
      </motion.div>

      {/* Navigation */}
      <div className="flex-1 mt-2 space-y-1">
        <motion.button
          whileHover={{ x: 2 }}
          transition={{ duration: 0.15 }}
          className="w-full text-left flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-[#E6E2D6]/60 transition-colors duration-150 group"
        >
          <Compass size={18} className="text-[#56736A] group-hover:text-[#0D3C26] transition-colors" />
          <span className="text-[0.9375rem]">Discover</span>
        </motion.button>
      </div>

      {/* Bottom Section */}
      <div className="space-y-1">
        <motion.button
          whileHover={{ x: 2 }}
          transition={{ duration: 0.15 }}
          className="w-full text-left flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-[#E6E2D6]/60 transition-colors duration-150 group"
        >
          <User size={18} className="text-[#56736A] group-hover:text-[#0D3C26] transition-colors" />
          <span className="text-[0.9375rem]">Profile</span>
        </motion.button>
      </div>
    </aside>
  );
}