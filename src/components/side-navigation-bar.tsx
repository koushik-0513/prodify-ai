"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Calendar,
  ChartBarBig,
  ChevronDown,
  ClipboardList,
  Home,
  Inbox,
  Settings,
  Sparkle,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const AIIcon = ({ className }: { className: string }) => (
  <Sparkle
    className={cn(
      className,
      "rotate-[45deg] transform fill-black transition-all duration-300"
    )}
  />
);

const menuItems = [
  { id: "wt-home-nav-link", icon: Home, label: "Home", path: "/home" },
  {
    id: "wt-prodify-ai-nav-link",
    icon: AIIcon,
    label: "Prodify AI",
    path: "/prodify-ai",
  },
  {
    id: "wt-my-tasks-nav-link",
    icon: ClipboardList,
    label: "My tasks",
    path: "/my-tasks",
  },
  { id: "wt-inbox-nav-link", icon: Inbox, label: "Inbox", path: "/inbox" },
  {
    id: "wt-calendar-nav-link",
    icon: Calendar,
    label: "Calendar",
    path: "/calendar",
  },
  {
    id: "wt-reports-and-analytics-nav-link",
    icon: ChartBarBig,
    label: "Reports & Analytics",
    path: "/reports-and-analytics",
  },
];

const projectItems = [
  { name: "Product launch", color: "bg-project-purple" },
  { name: "Team brainstorm", color: "bg-project-indigo" },
  { name: "Branding launch", color: "bg-project-teal" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed hidden h-screen w-65 flex-col border-none bg-white p-3 lg:flex">
      {/* User Profile Section */}
      <div
        className="border-border mb-4 rounded-lg border-1"
        id="wt-profile-nav-link"
      >
        <Link
          href="/profile"
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
            <p className="text-muted-foreground text-modern-light truncate text-xs">
              Online
            </p>
          </div>
          <ChevronDown size={16} className="text-muted-foreground" />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1" id="wt-sidebar-nav">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "group flex items-center space-x-3 rounded-lg px-3 py-2.5 transition-all duration-300",
                isActive
                  ? "bg-purple-50"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-800 hover:shadow-sm"
              )}
              id={item.id}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-all duration-300",
                  isActive ? "text-purple-600" : "group-hover:text-slate-700"
                )}
              />
              <span className="text-modern text-foreground text-sm font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}

        <div className="border-border absolute mt-2 -ml-2 w-full border-b-2"></div>

        <div className="mx-4 mt-8 mb-4 flex flex-row items-center justify-between">
          <h2 className="bold text-sidebar-foreground text-modern text-sm font-medium">
            My Projects
          </h2>
          <Button className="bg-prodify-light text-prodify-secondary h-7 rounded-2xl px-2 py-1 text-xs hover:bg-slate-300">
            <p className="flex items-center gap-1">+ Add</p>
          </Button>
        </div>

        {/* Project List */}
        <div className="space-y-1 px-2">
          {projectItems.map((project, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center gap-3 p-2 text-slate-600 transition-colors hover:rounded-md hover:bg-slate-100/80 hover:text-slate-800 hover:shadow-sm"
            >
              <div className={cn("h-3 w-3 rounded", project.color)}></div>
              <span className="text-foreground text-sm">{project.name}</span>
            </div>
          ))}
        </div>
      </nav>

      <div className="flex flex-col">
        <Link
          href="/settings"
          className="group flex items-center space-x-3 rounded-md px-3 py-2.5 text-slate-600 transition-all duration-300 hover:bg-slate-100/80 hover:text-slate-800 hover:shadow-sm"
        >
          <Settings size={16} />
          <p className="text-sidebar-foreground text-modern truncate text-sm font-medium">
            Settings
          </p>
        </Link>
      </div>

      <div className="bg-gradient-invite from-accent-purple to-accent-purple-light m-2 mb-4 flex flex-col gap-1 rounded-lg bg-gradient-to-r p-2">
        <label className="text-sidebar-foreground text-modern flex items-center pt-2 pl-3 text-sm font-medium">
          <Image
            src="/assets/ai-logo.png"
            alt="chat-bot"
            width={25}
            height={25}
            className="mr-1 mb-1 size-3 rotate-[45deg] transform fill-white text-white"
          />
          <span className="text-lg font-medium text-white">prodify</span>
        </label>
        <p className="text-modern ml-3 p-1 text-sm text-white">
          New members will gain access to public Spaces, Docs and Dashboards
        </p>
        <Button className="bg-card text-foreground mb-2 ml-3 h-8 w-25 cursor-pointer rounded-2xl text-center text-xs font-medium hover:bg-slate-200">
          <span>+ Invite people</span>
        </Button>
      </div>
    </div>
  );
};
