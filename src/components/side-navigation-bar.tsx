"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button"
import {
    ClipboardList,
    Settings,
    Calendar,
    ChartBarBig,
    Inbox,
    Home,
    ChevronDown,
    Sparkle
} from "lucide-react";

const AIIcon = ({ className }: { className: string }) => (
    <Sparkle className={`${className} transition-all duration-300 transform rotate-[45deg] fill-black`} />
);

const menuItems = [
    { id: 'wt-home-nav-link', icon: Home, label: "Home", path: "/home" },
    { id: 'wt-prodify-ai-nav-link', icon: AIIcon, label: "Prodify AI", path: "/prodify-ai" },
    { id: 'wt-my-tasks-nav-link', icon: ClipboardList, label: "My tasks", path: "/my-tasks" },
    { id: 'wt-inbox-nav-link', icon: Inbox, label: "Inbox", path: "/inbox" },
    { id: 'wt-calendar-nav-link', icon: Calendar, label: "Calendar", path: "/calendar" },
    { id: 'wt-reports-and-analytics-nav-link', icon: ChartBarBig, label: "Reports & Analytics", path: "/reports-and-analytics" },
];

const projectItems = [
    { name: "Product launch", color: "bg-project-purple" },
    { name: "Team brainstorm", color: "bg-project-indigo" },
    { name: "Branding launch", color: "bg-project-teal" }
];

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="hidden lg:flex flex-col h-screen w-65 fixed p-3 bg-white border-none">
            {/* User Profile Section */}
            <div className="mb-4 border-border border-2 rounded-lg" id="wt-profile-nav-link">
                <Link
                    href="/profile"
                    className="flex items-center space-x-3 hover:bg-slate-100/80 p-3 rounded-lg transition-all duration-300 group"
                >
                    <div className="relative">
                        <Avatar className="h-9 w-9 ring-2 ring-slate-200 group-hover:ring-purple-200 transition-all duration-300">
                            <AvatarImage
                                src="/profile-pick.png"
                                alt="Courtney Henry"
                            />
                            <AvatarFallback className="bg-gradient-avatar text-white font-medium">
                                CH
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 right-0.5">
                            <div className="w-2 h-2 bg-status-online rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-sidebar-foreground truncate text-modern">
                            Courtney Henry
                        </p>
                        <p className="text-xs text-muted-foreground truncate text-modern-light">
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
                            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-300 group ${
                                isActive 
                                    ? "bg-purple-50" 
                                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-800 hover:shadow-sm"
                            }`}
                            id={item.id}
                        >
                            <item.icon
                                className={`h-5 w-5 transition-all duration-300 ${
                                    isActive 
                                        ? "text-purple-600" 
                                        : "group-hover:text-slate-700"
                                }`}
                            />
                            <span className="font-medium text-sm text-modern text-foreground">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
                
                <div className="absolute border-border border-b-2 w-full -ml-2 mt-2"></div>
                
                <div className="flex flex-row justify-between items-center mx-4 mt-8 mb-4">
                    <h2 className="text-sm font-medium bold text-sidebar-foreground text-modern">My Projects</h2>
                    <Button className="bg-prodify-light text-prodify-secondary rounded-2xl hover:bg-slate-300 px-2 py-1 h-7 text-xs"> 
                        <p className="flex items-center gap-1">+ Add</p>
                    </Button>
                </div>
                
                {/* Project List */}
                <div className="space-y-1 px-2">
                    {projectItems.map((project, index) => (
                        <div 
                            key={index}
                            className="flex items-center gap-3 p-2 rounded hover:bg-slate-100/80 cursor-pointer transition-colors"
                        >
                            <div className={`w-3 h-3 ${project.color} rounded`}></div>
                            <span className="text-sm text-foreground">{project.name}</span>
                        </div>
                    ))}
                </div>
            </nav>

            <div className="flex flex-col">
                <Link 
                    href="/settings" 
                    className="flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-300 group"
                >
                    <Settings size={16} />
                    <p className="text-sm font-medium text-sidebar-foreground truncate text-modern">Settings</p>
                </Link>
            </div>

            <div className="flex flex-col gap-1 m-2 mb-4 bg-gradient-invite rounded-lg p-2 bg-gradient-to-r from-accent-purple to-accent-purple-light">
                <label className="text-sm font-medium text-sidebar-foreground text-modern flex items-center pt-2 pl-3">
                    <img 
                        src="/ai-logo.png" 
                        alt="chat-bot" 
                        width={25} 
                        height={25} 
                        className="transform rotate-[45deg] mb-1 mr-1 text-white fill-white size-3" 
                    />
                    <span className="font-medium text-lg text-white">prodify</span>
                </label>
                <p className="text-sm text-white text-modern p-1 ml-3">
                    New members will gain access to public Spaces, Docs and Dashboards
                </p>
                <Button className="bg-card text-foreground rounded-2xl hover:bg-slate-200 font-medium w-25 h-8 text-xs text-center mb-2 ml-3"> 
                    <span>+ Invite people</span>
                </Button> 
            </div>
        </div>
    );
};
