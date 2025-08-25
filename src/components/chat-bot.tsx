"use client";

import { Sparkle } from "lucide-react";
import Image from "next/image";

// Color palette
const colors = {
    glow: {
        outer: "bg-gradient-to-r from-purple-400 to-blue-300",
        inner: "bg-gradient-to-r from-purple-300 to-blue-200"
    },
    button: {
        gradient: "bg-gradient-to-bl from-[#8B3EFF]/90 to-[#B7A6F5]/80",
        overlay: "before:bg-gradient-to-tr before:from-white/40 before:via-white/20 before:to-transparent"
    },
    border: {
        white: "border-white/80"
    },
    glass: {
        backdrop: "backdrop-blur-md bg-white/20"
    },
    shadow: {
        button: "shadow-2xl"
    }
};

const FloatingActionButton = () => {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Outer glow rings */}
            <div className={`absolute inset-0 rounded-full ${colors.glow.outer} opacity-30 blur-xl scale-150 animate-pulse`}></div>
            <div className={`absolute inset-0 rounded-full ${colors.glow.inner} opacity-40 blur-lg scale-125`}></div>
            
            {/* Glass button with border */}
            <div className={`relative border-4 ${colors.border.white} rounded-full ${colors.glass.backdrop}`}>
                <button className={`w-10 h-10 ${colors.button.gradient} flex items-center justify-center rounded-full backdrop-blur-sm relative overflow-hidden ${colors.shadow.button} before:absolute before:inset-0 before:rounded-full ${colors.button.overlay} before:pointer-events-none`}>
                    <Image 
                        src="/ai-logo.png" 
                        alt="chat-bot" 
                        width={30} 
                        height={30} 
                        className="transform rotate-[45deg] relative z-10" 
                    />
                </button>
            </div>
        </div>
    );
};

export default FloatingActionButton;