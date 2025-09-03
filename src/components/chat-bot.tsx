"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChatPage } from "./sub-components/chat-page";

// Enhanced animation variants with proper typing
const buttonVariants = {
  initial: { 
    rotate: 0,
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  },
  hover: { 
    scale: 1.08,
    boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.1)",
    transition: { 
      type: "spring" as const,
      stiffness: 300,
      damping: 15
    }
  },
  tap: { 
    scale: 0.92,
    rotate: 8,
    transition: { 
      type: "spring" as const,
      stiffness: 800,
      damping: 25
    }
  },
  open: { 
    rotate: 0,
    scale: 1.05,
    transition: { 
      type: "spring" as const,
      stiffness: 300,
      damping: 20
    }
  },
  closed: { 
    rotate: 45,
    scale: 1,
    transition: { 
      type: "spring" as const,
      stiffness: 300,
      damping: 20
    }
  }
};

const glowVariants = {
  initial: { 
    opacity: 0.2,
    scale: 1.3
  },
  pulse: (i: number) => ({
    opacity: [0.2, 0.6, 0.2],
    scale: [1.3, 1.8, 1.3],
    transition: {
      duration: 4 + i * 0.5,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  })
};

const chatPageVariants = {
  initial: { 
    opacity: 0, 
    y: 30, 
    scale: 0.85,
    filter: "blur(10px)"
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 25,
      duration: 0.6
    }
  },
  exit: { 
    opacity: 0, 
    y: 20, 
    scale: 0.9,
    filter: "blur(5px)",
    transition: { 
      duration: 0.3,
      ease: "easeInOut" as const
    }
  }
};

export const FloatingActionButton = () => {
  const [isChatPageOpen, setIsChatPageOpen] = useState(false);
  
  return (
    <div className="fixed right-6 bottom-6 z-50">
      {/* Enhanced animated glow rings */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan blur-2xl"
        variants={glowVariants}
        initial="initial"
        animate={isChatPageOpen ? "pulse" : "initial"}
        custom={0}
      />
      <motion.div 
        className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-purple-light to-accent-cyan-light blur-xl"
        variants={glowVariants}
        initial="initial"
        animate={isChatPageOpen ? "pulse" : "initial"}
        custom={1}
      />
      <motion.div 
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-300 to-cyan-300 blur-lg"
        variants={glowVariants}
        initial="initial"
        animate={isChatPageOpen ? "pulse" : "initial"}
        custom={2}
      />

      {/* Enhanced glass button container */}
      <motion.div 
        className="relative rounded-full border-4 border-white/90 bg-white/30 backdrop-blur-xl"
        whileHover={{ 
          boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)',
          borderColor: "rgba(255, 255, 255, 0.95)"
        }}
        transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
      >
        {/* Chat page with enhanced animations */}
        <AnimatePresence mode="wait">
          {isChatPageOpen && (
            <motion.div
              variants={chatPageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute bottom-full right-0 mb-4"
            >
              <ChatPage />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Enhanced floating action button - further scaled down */}
        <motion.button
          className="from-chat-bot-bg1 to-chat-bot-bg2 relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br shadow-2xl backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-tr before:from-white/50 before:via-white/20 before:to-transparent"
          onClick={() => setIsChatPageOpen(!isChatPageOpen)}
          aria-label={isChatPageOpen ? "Close chat" : "Open chat"}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          animate={isChatPageOpen ? "open" : "closed"}
        >
          {/* Enhanced icon animation */}
          <motion.div
            animate={{ 
              rotate: isChatPageOpen ? 0 : 0,
              scale: isChatPageOpen ? 1.1 : 1
            }}
            transition={{ 
              type: 'spring' as const, 
              stiffness: 400, 
              damping: 25,
              duration: 0.3
            }}
            className="relative z-10"
          >
            <Image
              src="/assets/ai-logo.png"
              alt="chat-bot"
              width={20}
              height={20}
              className="drop-shadow-lg"
            />
          </motion.div>
          
          {/* Ripple effect on click */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20"
            initial={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>
    </div>
  );
};
