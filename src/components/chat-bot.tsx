"use client";

import Image from "next/image";

export const FloatingActionButton = () => {
  return (
    <div className="fixed right-6 bottom-6 z-50">
      {/* Outer glow rings */}
      <div className="from-accent-purple to-accent-cyan absolute inset-0 scale-150 animate-pulse rounded-full bg-gradient-to-r opacity-30 blur-xl"></div>
      <div className="from-accent-purple-light to-accent-cyan-light absolute inset-0 scale-125 rounded-full bg-gradient-to-r opacity-40 blur-lg"></div>

      {/* Glass button with border */}
      <div className="relative rounded-full border-4 border-white/80 bg-white/20 backdrop-blur-md">
        <button className="from-chat-bot-bg1 to-chat-bot-bg2 relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br shadow-2xl backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-tr before:from-white/40 before:via-white/20 before:to-transparent">
          <Image
            src="/assets/ai-logo.png"
            alt="chat-bot"
            width={30}
            height={30}
            className="relative z-10 rotate-[45deg] transform"
          />
        </button>
      </div>
    </div>
  );
};
