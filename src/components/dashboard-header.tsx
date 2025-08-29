"use client";

import { Button } from "./ui/button";
import Image from "next/image";

const actionButtons = [
  { label: "Get tasks updates" },
  { label: "Create workspace" },
  { label: "Connect apps" },
];

export const DashboardHeader = () => {
  return (
    <div className="max-w-screen mx-2 ">
      <p className="text-md text-foreground font-medium mb-3">Mon, July 7</p>

      <div className="flex flex-col justify-start space-y-3 lg:space-y-0">
        <h1 className="text-2xl lg:text-4xl font-semibold mb-1">
          Hello, Courtney
        </h1>
        <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0">
          <p className="text-2xl lg:text-4xl font-medium bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent mr-20">
            How can I help you today?
          </p>
          <div className="flex flex-wrap gap-2">
            <Button className="bg-gradient-to-br from-accent-purple to-accent-purple-light text-white px-3 py-2 rounded-3xl flex gap-1 font-medium text-md sm:text-sm hover:opacity-90 transition-opacity cursor-pointer">
              <Image
                src="/assets/ai-logo.png"
                alt="chat-bot"
                width={11}
                height={20}
                className="transform rotate-[45deg]"
              />
              Ask AI
            </Button>

            {/* Gradient Border Buttons */}
            {actionButtons.map((button, index) => (
              <div
                key={index}
                className="relative inline-flex rounded-3xl p-[1.5px] bg-gradient-to-r from-accent-cyan to-accent-purple"
              >
                <Button
                  variant="ghost"
                  className="bg-card hover:bg-accent rounded-3xl font-medium text-md sm:text-sm px-3 py-1.5 text-foreground transition-colors cursor-pointer"
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
