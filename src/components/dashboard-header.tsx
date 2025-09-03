"use client";

import Image from "next/image";

import { Button } from "./ui/button";

const actionButtons = [
  { label: "Get tasks updates" },
  { label: "Create workspace" },
  { label: "Connect apps" },
];

export const DashboardHeader = () => {
  return (
    <div className="mx-2 max-w-screen">
      <p className="text-md text-foreground mb-3 font-medium">Mon, July 7</p>

      <div className="flex flex-col justify-start space-y-3 lg:space-y-0">
        <h1 className="mb-1 text-2xl font-semibold lg:text-4xl">
          Hello, Courtney
        </h1>
        <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0">
          <p className="from-accent-cyan to-accent-purple mr-20 bg-gradient-to-r bg-clip-text text-2xl font-medium text-transparent lg:text-4xl">
            How can I help you today?
          </p>
          <div className="flex flex-wrap gap-2">
            <Button className="from-accent-purple to-accent-purple-light text-md flex cursor-pointer gap-1 rounded-3xl bg-gradient-to-br px-3 py-2 font-medium text-white transition-opacity hover:opacity-90 sm:text-sm">
              <Image
                src="/assets/ai-logo.png"
                alt="chat-bot"
                width={11}
                height={20}
                className="rotate-[45deg] transform"
              />
              Ask AI
            </Button>

            {/* Gradient Border Buttons */}
            {actionButtons.map((button, index) => (
              <div
                key={index}
                className="from-accent-cyan to-accent-purple relative inline-flex rounded-3xl bg-gradient-to-r p-[1.5px]"
              >
                <Button
                  variant="ghost"
                  className="bg-card hover:bg-accent text-md text-foreground cursor-pointer rounded-3xl px-3 py-1.5 font-medium transition-colors sm:text-sm"
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
