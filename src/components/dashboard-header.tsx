"use client";

import { Button } from "./ui/button";

const actionButtons = [
    { label: "Get tasks updates" },
    { label: "Create workspace" },
    { label: "Connect apps" }
];

const DashboardHeader = () => {
    return (
        <div className="max-w-screen mx-auto">
            <div className="mb-3">
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">Mon, July 7</p>
            </div>

            <div className="flex flex-col justify-start space-y-3 lg:space-y-0">
                <h1 className="text-lg sm:text-xl lg:text-3xl font-semibold text-foreground mb-1">
                    Hello, Courtney
                </h1>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-sround space-y-3 lg:space-y-0">
                    <div className="mr-25">
                        <p className="text-lg sm:text-xl lg:text-3xl font-medium bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
                            How can I help you today?
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            className="bg-gradient-to-br from-accent-purple to-accent-purple-light text-white px-3 sm:px-4 py-2 rounded-3xl flex gap-1 font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity"
                        >
                            <img src="/ai-logo.png" alt="chat-bot" width={11} height={20} className="transform rotate-[45deg]"/>
                            Ask AI
                        </Button>

                        {/* Gradient Border Buttons */}
                        {actionButtons.map((button, index) => (
                            <div key={index} className="relative inline-flex rounded-3xl p-[1.5px] bg-gradient-to-r from-accent-cyan to-accent-purple">
                                <Button
                                    variant="ghost"
                                    className="bg-card hover:bg-accent rounded-3xl font-medium text-xs sm:text-sm px-3 sm:px-4 py-1.5 text-foreground transition-colors"
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