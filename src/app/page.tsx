"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#fbf9f8] text-[#1b1c1c] px-6 py-12 selection:bg-[#80543b] selection:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl w-full mx-auto text-center flex flex-col items-center justify-center"
      >
        {/* Subtle decorative accent line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-12 h-[1px] bg-[#80543b] mb-8"
        />

        <h1 className="font-[family-name:var(--font-headline-lg)] font-serif text-3xl sm:text-4xl md:text-[42px] font-semibold tracking-tight text-[#1b1c1c] leading-tight sm:leading-snug mb-6">
          Website Temporarily Unavailable
        </h1>

        <div className="space-y-2 font-[family-name:var(--font-body-md)] font-sans text-base sm:text-lg text-[#444748] font-normal leading-relaxed max-w-md mx-auto">
          <p>This website is temporarily unavailable.</p>
          <p>Please contact the website owner for any queries.</p>
        </div>

        {/* Subtle bottom accent line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="w-12 h-[1px] bg-[#e4e2e2] mt-8"
        />
      </motion.div>
    </main>
  );
}
