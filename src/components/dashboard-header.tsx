"use client";

import { Button } from "./ui/button";
import { Sparkle } from "lucide-react";

// Color palette
const colors = {
    text: {
        primary: "text-gray-900",
        secondary: "text-gray-600",
        white: "text-white"
    },
    background: {
        white: "bg-white",
        hover: "hover:bg-gray-50",
        gradient: {
            button: "bg-gradient-to-br from-[#674EE6] to-[#C2B7F3]",
            border: "bg-gradient-to-r from-[#5AD7CB] to-[#6877CF]",
            text: "bg-gradient-to-r from-[#1EE7C9] to-[#7C7CE7]"
        }
    },
    hover: {
        opacity: "hover:opacity-90"
    }
};

const actionButtons = [
    { label: "Get tasks updates" },
    { label: "Create workspace" },
    { label: "Connect apps" }
];

const DashboardHeader = () => {
    return (
        <div className="max-w-screen mx-auto">
            <div className="mb-3">
                <p className={`text-xs sm:text-sm ${colors.text.secondary} font-medium`}>Mon, July 7</p>
            </div>

            <div className="flex flex-col justify-start space-y-3 lg:space-y-0">
                <h1 className={`text-lg sm:text-xl lg:text-3xl font-semibold ${colors.text.primary} mb-1`}>
                    Hello, Courtney
                </h1>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-sround space-y-3 lg:space-y-0">
                    <div className="mr-25">
                        <p className={`text-lg sm:text-xl lg:text-3xl font-medium ${colors.background.gradient.text} bg-clip-text text-transparent`}>
                            How can I help you today?
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            className={`${colors.background.gradient.button} ${colors.text.white} px-3 sm:px-4 py-2 rounded-3xl flex gap-1 font-medium text-xs sm:text-sm ${colors.hover.opacity} transition-opacity`}
                        >
                            <img src="/ai-logo.png" alt="chat-bot" width={11} height={20} className="transform rotate-[45deg]"/>
                            Ask AI
                        </Button>

                        {/* Gradient Border Buttons */}
                        {actionButtons.map((button, index) => (
                            <div key={index} className={`relative inline-flex rounded-3xl p-[1.5px] ${colors.background.gradient.border}`}>
                                <Button
                                    variant="ghost"
                                    className={`${colors.background.white} ${colors.background.hover} rounded-3xl font-medium text-xs sm:text-sm px-3 sm:px-4 py-1.5 ${colors.text.primary} transition-colors`}
                                >
                                    {button.label}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;