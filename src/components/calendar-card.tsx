"use client";

import { ChevronLeft, ChevronRight, ChevronDown, Calendar, Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { dates } from "@/data/data";

const CalendarCard = () => {
    return (
        <div className="bg-card p-4 sm:p-6 rounded-2xl border border-border">
            {/* Header Grid */}
            <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="flex items-center gap-4 ml-3">
                    <div className="flex items-center gap-2">
                        <Calendar size={20} style={{ color: 'var(--color-prodify-primary)' }} />
                        <h2 className="text-lg sm:text-xl font-medium text-foreground">Calendar</h2>
                    </div>
                    <Button 
                        variant="ghost" 
                        className="flex items-center gap-1 text-foreground hover:bg-accent px-3 py-2 rounded-lg transition-colors"
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
                    className="p-1 sm:p-1.5 hover:bg-accent rounded-lg transition-colors"
                >
                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>

                {/* Dates Grid - Responsive with limited items on small screens */}
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-4 md:gap-4 sm:truncate min-w-0">
                    {dates.map((date, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-center py-2 sm:py-2 sm:px-1  rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200 lg:max-w-14 ${
                                index > 3 ? "hidden sm:flex" : "flex"
                            } ${
                                date.active
                                    ? "bg-gradient-to-br from-prodify-primary to-accent-purple text-white shadow-lg transform scale-105"
                                    : "hover:bg-accent hover:shadow-md"
                            }`}
                        >
                            <span className={`text-[10px] sm:text-xs md:text-sm font-medium ${
                                date.active ? "text-white" : "text-muted-foreground"
                            }`}>
                                {date.day}
                            </span>
                            <span className="text-lg md:text-xl">
                                {date.date}
                            </span>
                        </div>
                    ))}
                </div>

                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-1.5 sm:p-2 hover:bg-accent rounded-lg transition-colors"
                >
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
            </div>

            {/* Meeting Details Grid */}
            <div className="bg-meeting-bg p-4 sm:p-5 m-2 rounded-2xl">
                {/* Meeting Header Grid */}
                <div className="grid grid-cols-2 xs:grid-cols-1 gap-4 mb-4">
                    <div className="min-w-0">
                        <h3 className="font-medium text-foreground text-base lg:text-lg">
                            Meeting with VP
                        </h3>
                        <p className="text-sm text-muted-foreground">Today • 10:00 - 11:00 am</p>
                    </div>
                    <div className="flex justify-end">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-2 hover:bg-accent rounded-lg transition-colors"
                        >
                            <Ellipsis size={20} className="text-muted-foreground" />
                        </Button>
                    </div>
                </div>

                {/* Meeting Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <Button className="bg-card hover:bg-accent text-foreground px-3 py-2 rounded-2xl text-md flex items-center gap-1.5 justify-center shadow-md border border-border transition-all duration-200 hover:shadow-md w-40">
                        <Image
                            src="/google-meet.png"
                            alt="Google Meet"
                            width={16}
                            height={16}
                            className="w-4 h-4 flex-shrink-0"
                        />
                        <span className="font-medium">Google Meet</span>
                    </Button>

                    <div className="flex justify-center md:justify-end">
                        <div className="bg-avatar-bg rounded-full p-1 shadow-sm">
                            <div className="flex items-center">
                                <Avatar className="h-7 w-7 lg:h-8 lg:w-8 relative z-10 shadow-sm border-2 border-white">
                                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" alt="Attendee 1" />
                                </Avatar>
                                <Avatar className="h-7 w-7 lg:h-8 lg:w-8 relative z-20 -ml-2 shadow-sm border-2 border-white">
                                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="Attendee 2" />
                                </Avatar>
                                <Avatar className="h-7 w-7 lg:h-8 lg:w-8 relative z-30 -ml-2 shadow-sm border-2 border-white">
                                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" alt="Attendee 3" />
                                </Avatar>
                                <Avatar className="h-7 w-7 lg:h-8 lg:w-8 relative z-40 -ml-2 shadow-sm border-2 border-white">
                                    <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" alt="Attendee 4" />
                                </Avatar>
                                <div className="h-7 w-7 lg:h-8 lg:w-8 bg-accent-purple-dark rounded-full flex items-center justify-center relative z-50 -ml-2 shadow-sm">
                                    <span className="text-sm text-white font-medium">+2</span>
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