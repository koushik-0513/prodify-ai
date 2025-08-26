"use client";

import Image from "next/image";

const FloatingActionButton = () => {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Outer glow rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan opacity-30 blur-xl scale-150 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-purple-light to-accent-cyan-light opacity-40 blur-lg scale-125"></div>
            
            {/* Glass button with border */}
            <div className="relative border-4 border-white/80 rounded-full backdrop-blur-md bg-white/20">
                <button className="w-10 h-10 bg-gradient-to-bl from-accent-purple/90 to-accent-purple-light/80 flex items-center justify-center rounded-full backdrop-blur-sm relative overflow-hidden shadow-2xl before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-tr before:from-white/40 before:via-white/20 before:to-transparent before:pointer-events-none">
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