"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronDown, Menu, Settings, Sparkle, X } from "lucide-react";

// Import menuItems from data
import { cn } from "@/lib/utils";

import { menuItems } from "@/data/data";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const projectItems = [
  { name: "Product launch", color: "bg-project-purple" },
  { name: "Team brainstorm", color: "bg-project-indigo" },
  { name: "Branding launch", color: "bg-project-teal" },
];

export const MobileTopNavigation = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMenuOpen]);

  return (
    <>
      <div className="bg-card border-border flex items-center justify-between border-b px-4 py-3 lg:hidden">
        <Link
          href="/profile"
          className="group flex items-center space-x-3"
          id="wt-profile-nav-link"
        >
          <div className="relative">
            <Avatar className="h-9 w-9 ring-2 ring-slate-200 transition-all duration-300 group-hover:ring-purple-200">
              <AvatarImage
                src="/assets/profile-pick.png"
                alt="Courtney Henry"
              />
              <AvatarFallback className="bg-gradient-avatar font-medium text-white">
                CH
              </AvatarFallback>
            </Avatar>
            <div className="absolute right-0.5 bottom-0">
              <div className="bg-status-online h-2 w-2 rounded-full"></div>
            </div>
          </div>
        </Link>

        <Link
          href="/home"
          className="group flex items-center space-x-1"
          id="wt-home-nav-link"
        >
          <Sparkle className="text-prodify-primary fill-prodify-primary size-4 rotate-45 transform" />
          <span className="text-prodify-primary">Prodify</span>
        </Link>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMenu}
          className="hover:bg-accent p-2"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="bg-opacity-30 fixed inset-0 z-50 bg-black lg:hidden">
          <div className="bg-sidebar absolute top-0 right-0 h-full w-80 shadow-xl">
            {/* Single scrollable container for ALL content */}
            <div className="h-full overflow-y-auto overscroll-contain">
              <div className="min-h-full space-y-4 p-3">
                {/* Close button */}
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMenu}
                    className="hover:bg-accent p-2"
                  >
                    <X size={20} />
                  </Button>
                </div>

                {/* Profile section */}
                <div
                  className="border-border rounded-lg border-2"
                  id="wt-profile-nav-link-menu"
                >
                  <Link
                    href="/profile"
                    onClick={toggleMenu}
                    className="group flex items-center space-x-3 rounded-lg p-3 transition-all duration-300 hover:bg-slate-100/80"
                  >
                    <div className="relative">
                      <Avatar className="h-9 w-9 ring-2 ring-slate-200 transition-all duration-300 group-hover:ring-purple-200">
                        <AvatarImage
                          src="/assets/profile-pick.png"
                          alt="Courtney Henry"
                        />
                        <AvatarFallback className="bg-gradient-avatar font-medium text-white">
                          CH
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute right-0.5 bottom-0">
                        <div className="bg-status-online h-2 w-2 rounded-full"></div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sidebar-foreground text-modern truncate text-sm font-medium">
                        Courtney Henry
                      </p>
                      <p className="text-sidebar-accent-foreground text-modern-light truncate text-xs">
                        Online
                      </p>
                    </div>
                    <ChevronDown size={16} />
                  </Link>
                </div>

                {/* Navigation menu */}
                <nav className="space-y-1" id="wt-sidebar-nav">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.path;

                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={toggleMenu}
                        className={`group flex items-center space-x-3 rounded-lg px-3 py-2.5 transition-all duration-300 ${
                          isActive
                            ? "bg-purple-50"
                            : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-800 hover:shadow-sm"
                        }`}
                        id={item.id}
                      >
                        <item.Icon
                          className={cn(
                            "h-5 w-5 transition-all duration-300",
                            isActive
                              ? "text-purple-600"
                              : "group-hover:text-slate-700"
                          )}
                        />
                        <span className="text-modern text-black-700 text-sm font-medium">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Divider */}
                <div className="border-border w-full border-b-2"></div>

                {/* Projects section */}
                <div>
                  <div className="mb-4 flex flex-row items-center justify-between">
                    <h2 className="bold text-sidebar-foreground text-modern text-sm font-medium">
                      My Projects
                    </h2>
                    <Button className="bg-prodify-light text-prodify-secondary h-7 rounded-2xl px-2 py-1 text-xs hover:bg-slate-300">
                      <p className="flex items-center gap-1">+ Add</p>
                    </Button>
                  </div>

                  <div className="space-y-1">
                    {projectItems.map((project, index) => (
                      <div
                        key={index}
                        className="flex cursor-pointer items-center gap-3 rounded p-2 transition-colors hover:bg-slate-100/80"
                      >
                        <div
                          className={cn("h-3 w-3 rounded", project.color)}
                        ></div>
                        <span className="text-muted-foreground text-sm">
                          {project.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Settings section */}
                <div>
                  <Link
                    href="/settings"
                    onClick={toggleMenu}
                    className="group flex items-center space-x-3 rounded-lg px-3 py-2.5 transition-all duration-300 hover:bg-slate-100/80"
                  >
                    <Settings size={16} />
                    <p className="text-sidebar-foreground text-modern truncate text-sm font-medium">
                      Settings
                    </p>
                  </Link>
                </div>

                {/* Invite section */}
                <div className="bg-gradient-invite from-accent-purple to-accent-purple-light flex flex-col gap-1 rounded-lg bg-gradient-to-r p-2">
                  <label className="text-sidebar-foreground text-modern flex items-center pt-2 pl-3 text-sm font-medium">
                    <Image
                      src="/assets/ai-logo.png"
                      alt="chat-bot"
                      width={25}
                      height={25}
                      className="mr-1 mb-1 size-3 rotate-[45deg] transform fill-white text-white"
                    />
                    <span className="text-lg font-medium text-white">
                      prodify
                    </span>
                  </label>
                  <p className="text-modern ml-3 p-1 text-sm text-white">
                    New members will gain access to public Spaces, Docs and
                    Dashboards
                  </p>
                  <Button className="bg-card text-foreground mb-2 ml-3 h-8 w-25 rounded-2xl text-center text-xs font-medium hover:bg-slate-200">
                    <span>+ Invite people</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
