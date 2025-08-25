"use client";

import { ChevronLeft, ChevronRight, ChevronDown, Calendar, Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import Image from "next/image";

// Color palette
const colors = {
    primary: {
        icon: "#736FC3",
        gradient: "bg-gradient-to-br from-[#736FC3] to-[#8B7FE8]",
        avatar: "bg-[#6A39DA]"
    },
    text: {
        primary: "text-gray-900",
        secondary: "text-gray-500",
        muted: "text-slate-500",
        white: "text-white",
        dark: "text-gray-800"
    },
    background: {
        white: "bg-white",
        hover: "hover:bg-gray-50",
        hoverButton: "hover:bg-gray-100",
        meeting: "bg-[#F5F6FF]",
        avatarContainer: "bg-[#FFFEFA]"
    },
    border: {
        default: "border-gray-200",
        white: "border-white"
    },
    shadow: {
        default: "shadow-sm",
        medium: "shadow-md",
        large: "shadow-lg"
    }
};

const dates = [
    { day: "Fri", date: "04" },
    { day: "Sat", date: "05" },
    { day: "Sun", date: "06" },
    { day: "Mon", date: "07", active: true },
    { day: "Tue", date: "08" },
    { day: "Wed", date: "09" },
    { day: "Thu", date: "10" }
];

const CalendarCard = () => {
    return (
        <div className={`${colors.background.white} p-4 sm:p-6 rounded-2xl border ${colors.border.default}`}>
            {/* Header Grid */}
            <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="flex items-center gap-4 ml-3">
                    <div className="flex items-center gap-2">
                        <Calendar size={20} style={{ color: colors.primary.icon }} />
                        <h2 className={`text-lg sm:text-xl font-medium ${colors.text.primary}`}>Calendar</h2>
                    </div>
                    <Button 
                        variant="ghost" 
                        className={`flex items-center gap-1 ${colors.text.dark} ${colors.background.hoverButton} px-3 py-2 rounded-lg transition-colors`}
                    >
                        <span className="text-sm">July</span>
                        <ChevronDown size={16} />
                    </Button>
                </div>
            </div>

            {/* Date Navigation Grid */}
            <div className="grid grid-cols-[auto_1fr_auto] gap-2 mb-6 items-center">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`p-1 sm:p-1.5 ${colors.background.hoverButton} rounded-lg transition-colors`}
                >
                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>

                {/* Dates Grid - Responsive with limited items on small screens */}
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-4 md:gap-4 sm:truncate min-w-0">
                    {dates.map((date, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-center px-2 py-2 sm:py-2.5 sm:px-1 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200 lg:max-w-14 ${
                                index > 3 ? "hidden sm:flex" : "flex"
                            } ${
                                date.active
                                    ? `${colors.primary.gradient} ${colors.text.white} ${colors.shadow.large} transform scale-105`
                                    : `${colors.background.hover} hover:${colors.shadow.medium}`
                            }`}
                        >
                            <span className={`text-[10px] sm:text-xs md:text-sm font-medium ${
                                date.active ? colors.text.white : colors.text.muted
                            }`}>
                                {date.day}
                            </span>
                            <span className="text-sm md:text-lg">
                                {date.date}
                            </span>
                        </div>
                    ))}
                </div>

                <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`p-1.5 sm:p-2 ${colors.background.hoverButton} rounded-lg transition-colors`}
                >
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
            </div>

            {/* Meeting Details Grid */}
            <div className={`${colors.background.meeting} p-4 sm:p-5 m-2 rounded-2xl`}>
                {/* Meeting Header Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 mb-4">
                    <div className="min-w-0">
                        <h3 className={`font-semibold ${colors.text.primary} text-base lg:text-lg truncate`}>
                            Meeting with VP
                        </h3>
                        <p className={`text-sm ${colors.text.secondary}`}>Today • 10:00 - 11:00 am</p>
                    </div>
                    <div className="flex justify-end">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`p-2 ${colors.background.hoverButton} rounded-lg transition-colors`}
                        >
                            <Ellipsis size={20} className={colors.text.secondary} />
                        </Button>
                    </div>
                </div>

                {/* Meeting Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <Button className={`${colors.background.white} ${colors.background.hover} ${colors.text.primary} px-4 py-3 rounded-3xl text-sm flex items-center gap-2 justify-center ${colors.shadow.default} border ${colors.border.default} transition-all duration-200 hover:${colors.shadow.medium}`}>
                        <Image
                            src="/google-meet.png"
                            alt="Google Meet"
                            width={18}
                            height={18}
                            className="w-[18px] h-[18px] flex-shrink-0"
                        />
                        <span className="font-medium">Google Meet</span>
                    </Button>

                    <div className="flex justify-center md:justify-end">
                        <div className={`${colors.background.avatarContainer} rounded-full p-1 ${colors.shadow.default}`}>
                            <div className="flex items-center">
                                <Avatar className={`h-7 w-7 lg:h-8 lg:w-8 relative z-10 ${colors.shadow.default} border-2 ${colors.border.white}`}>
                                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" alt="Attendee 1" />
                                </Avatar>
                                <Avatar className={`h-7 w-7 lg:h-8 lg:w-8 relative z-20 -ml-2 ${colors.shadow.default} border-2 ${colors.border.white}`}>
                                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="Attendee 2" />
                                </Avatar>
                                <Avatar className={`h-7 w-7 lg:h-8 lg:w-8 relative z-30 -ml-2 ${colors.shadow.default} border-2 ${colors.border.white}`}>
                                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" alt="Attendee 3" />
                                </Avatar>
                                <Avatar className={`h-7 w-7 lg:h-8 lg:w-8 relative z-40 -ml-2 ${colors.shadow.default} border-2 ${colors.border.white}`}>
                                    <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" alt="Attendee 4" />
                                </Avatar>
                                <div className={`h-7 w-7 lg:h-8 lg:w-8 ${colors.primary.avatar} rounded-full flex items-center justify-center relative z-50 -ml-2 ${colors.shadow.default}`}>
                                    <span className={`text-sm ${colors.text.white} font-medium`}>+2</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarCard;