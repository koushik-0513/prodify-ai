"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
    ClipboardList,
    Settings,
    Sparkle,
    Calendar,
    ChartBarBig,
    Inbox,
    Home,
    Menu,
    X,
    Plus
} from "lucide-react";
import { useState, useEffect } from "react";

// Color palette
const colors = {
    primary: {
        bg: "bg-purple-50",
        text: "text-purple-700",
        icon: "text-purple-600",
        button: "bg-[#F8F4FF]",
        buttonText: "text-[#6B60BE]"
    },
    text: {
        primary: "text-gray-800",
        secondary: "text-slate-700",
        muted: "text-slate-600",
        white: "text-white",
        black: "text-black"
    },
    background: {
        white: "bg-white",
        hover: "hover:bg-slate-100/80",
        buttonHover: "hover:bg-slate-300",
        whiteHover: "hover:bg-slate-200",
        overlay: "bg-black bg-opacity-30",
        gradient: "bg-gradient-to-br from-[#726CDB] to-purple-600",
        inviteGradient: "bg-gradient-to-br from-[#5C4CE1] to-white"
    },
    border: {
        default: "border-gray-200",
        subtle: "border-gray-100"
    },
    ring: {
        default: "ring-slate-200"
    },
    projects: {
        purple: "bg-purple-500",
        blue: "bg-blue-600",
        teal: "bg-teal-500"
    }
};

const menuItems = [
    { id: 'wt-home-nav-link', icon: Home, label: "Home", path: "/home" },
    { id: 'wt-prodify-ai-nav-link', icon: Sparkle, label: "Prodify AI", path: "/prodify-ai" },
    { id: 'wt-my-tasks-nav-link', icon: ClipboardList, label: "My tasks", path: "/my-tasks" },
    { id: 'wt-inbox-nav-link', icon: Inbox, label: "Inbox", path: "/inbox" },
    { id: 'wt-calendar-nav-link', icon: Calendar, label: "Calendar", path: "/calendar" },
    { id: 'wt-reports-and-analytics-nav-link', icon: ChartBarBig, label: "Reports & Analytics", path: "/reports-and-analytics" },
];

const projectsList = [
    { name: "Product launch", color: colors.projects.purple },
    { name: "Team brainstorm", color: colors.projects.blue },
    { name: "Branding launch", color: colors.projects.teal }
];

const MobileTopNavigation = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            const scrollY = window.scrollY;
            
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
            
            return () => {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [isMenuOpen]);

    return (
        <div className="lg:hidden">
            {/* Top Navigation Bar */}
            <div className={`fixed top-0 left-0 right-0 z-50 ${colors.background.white} border-b ${colors.border.default} shadow-sm`}>
                <div className="flex items-center justify-between px-4 py-3">
                    <Link href="/profile" className="flex items-center space-x-2">
                        <Avatar className={`h-8 w-8 ring-2 ${colors.ring.default}`}>
                            <AvatarImage src="" alt="Profile Avatar" />
                            <AvatarFallback>CH</AvatarFallback>
                        </Avatar>
                    </Link>
                    
                    {/* Logo/Brand */}
                    <div className="flex items-center space-x-2">
                        <div className={`${colors.background.gradient} rounded-md p-2`}>
                            <Sparkle size={20} className={colors.text.white} />
                        </div>
                        <span className={`font-bold text-lg ${colors.text.primary}`}>Prodify</span>
                    </div>

                    {/* Menu Toggle Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleMenu}
                        className="p-2"
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div 
                    className={`fixed inset-0 z-40 ${colors.background.overlay} backdrop-blur-sm`}
                    onClick={toggleMenu}
                >
                    <div
                        className={`fixed top-0 right-0 h-full w-72 ${colors.background.white} shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button area - fixed at top */}
                        <div className={`h-14 flex items-center justify-end px-4 border-b ${colors.border.subtle}`}>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleMenu}
                                className="p-2"
                            >
                                <X size={20} />
                            </Button>
                        </div>

                        {/* Scrollable content area */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden">
                            <div className="p-3">
                                {/* Navigation Menu */}
                                <nav className="space-y-1 mb-4">
                                    {menuItems.map((item) => {
                                        const isActive = pathname === item.path;
                                        return (
                                            <Link
                                                key={item.path}
                                                href={item.path}
                                                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-300 group ${
                                                    isActive
                                                        ? `${colors.primary.bg} ${colors.primary.text}`
                                                        : `${colors.text.muted} ${colors.background.hover} hover:text-slate-800 hover:shadow-sm`
                                                }`}
                                                id={item.id}
                                                onClick={toggleMenu}
                                            >
                                                <item.icon
                                                    size={20}
                                                    className={`transition-all duration-300 ${
                                                        isActive ? colors.primary.icon : "group-hover:text-slate-700"
                                                    }`}
                                                />
                                                <span className={`font-medium text-modern ${
                                                    isActive ? colors.primary.text : colors.text.secondary
                                                }`}>
                                                    {item.label}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </nav>

                                <hr className="mb-3" />

                                {/* Projects Section */}
                                <div className="mb-4">
                                    <div className="flex flex-row justify-between items-center mb-2">
                                        <h2 className={`text-sm font-medium ${colors.text.primary}`}>My Projects</h2>
                                        <Button className={`${colors.primary.button} ${colors.primary.buttonText} rounded-2xl ${colors.background.buttonHover} text-xs px-2 py-1 h-7`}>
                                            <Plus size={12} className="mr-1" />
                                            Add
                                        </Button>
                                    </div>

                                    <div className="space-y-1">
                                        {projectsList.map((project, index) => (
                                            <div key={index} className={`flex items-center gap-3 p-2 rounded-md ${colors.background.hover} cursor-pointer transition-colors`}>
                                                <div className={`w-3 h-3 ${project.color} rounded-sm`}></div>
                                                <span className={`text-sm ${colors.text.secondary}`}>{project.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Settings */}
                                <div className="mb-4">
                                    <Link
                                        href="/settings"
                                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-300 group ${colors.background.hover}`}
                                        onClick={toggleMenu}
                                    >
                                        <Settings size={20} />
                                        <p className={`text-sm font-medium ${colors.text.primary}`}>Settings</p>
                                    </Link>
                                </div>

                                {/* Invite Section */}
                                <div className={`${colors.background.inviteGradient} rounded-lg p-3 mb-4`}>
                                    <label className="text-sm font-medium flex items-center mb-2">
                                        <Sparkle size={12} className={`mr-1 ${colors.text.white} fill-white`} />
                                        <span className={`font-bold text-lg ${colors.text.white}`}>Prodify</span>
                                    </label>
                                    <p className={`text-xs font-medium ${colors.text.white} mb-2`}>
                                        New members will gain access to public Spaces, Docs and Dashboards
                                    </p>
                                    <Button className={`${colors.background.white} ${colors.text.black} rounded-2xl ${colors.background.whiteHover} font-bold text-xs w-full h-8`}>
                                        <Plus size={12} className="mr-1" />
                                        Invite people
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileTopNavigation;