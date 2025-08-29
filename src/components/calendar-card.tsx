"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  Ellipsis,
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { dates } from "@/data/data";
import { TDateItem } from "@/types/types";

export const CalendarCard = () => {
  return (
    <div className="bg-card p-4 sm:p-6 rounded-2xl border border-border">
      <div className="flex items-center mb-6">
        <div className="flex items-center gap-2 ml-3 mr-3">
          <Calendar size={20} className="text-prodify-primary" />
          <h2 className="text-lg sm:text-xl font-medium">Calendar</h2>
        </div>
        <Button
          variant="ghost"
          className="flex items-center gap-1 hover:bg-accent px-3 py-2 rounded-lg transition-colors cursor-pointer"
        >
          <span className="text-md">July</span>
          <ChevronDown size={16} />
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="p-1 sm:p-1.5 hover:bg-accent rounded-lg transition-colors cursor-pointer"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>

        <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-7 gap-1.5 sm:gap-4 flex-1">
          {dates.map((date: TDateItem, index: number) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center py-2 sm:py-2 sm:px-1  rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200 lg:max-w-14 ${
                index > 3 ? "hidden sm:flex md:flex lg:flex" : "flex"
              } ${
                date.active
                  ? "bg-gradient-to-br from-prodify-primary to-accent-purple text-white shadow-lg transform scale-105"
                  : "hover:bg-accent hover:shadow-md"
              }`}
            >
              <span
                className={`text-[10px] sm:text-xs md:text-sm font-medium ${
                  date.active ? "text-white" : "text-muted-foreground"
                }`}
              >
                {date.day}
              </span>
              <span className="text-lg md:text-xl text-roboto">
                {date.date}
              </span>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="p-1.5 sm:p-2 hover:bg-accent rounded-lg transition-colors cursor-pointer"
        >
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>

      <div className="bg-meeting-bg p-4 sm:p-5 m-2 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium text-base lg:text-lg">
              Meeting with VP
            </h3>
            <p className="text-sm text-muted-foreground">
              Today • 10:00 - 11:00 am
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-accent rounded-lg transition-colors cursor-pointer"
          >
            <Ellipsis size={20} className="text-foreground" />
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-row gap-2 items-center justify-between">
          <Button className="bg-card hover:bg-accent text-foreground px-3 py-2 rounded-2xl text-md flex items-center gap-1 justify-center shadow-md border border-border transition-all duration-200 hover:shadow-md md:w-35 cursor-pointer">
            <Image
              src="/assets/google-meet.png"
              alt="Google Meet"
              width={16}
              height={16}
              className="w-4 h-4 flex-shrink-0"
            />
            <span className="font-medium">Google Meet</span>
          </Button>

          <div className="bg-avatar-bg rounded-full p-0.5 shadow-md">
            <div className="flex items-center">
              <Avatar className="h-7 w-7 lg:h-8 lg:w-8 relative z-10 shadow-sm border-2 border-white">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                  alt="Attendee 1"
                />
              </Avatar>
              <Avatar className="h-7 w-7 lg:h-8 lg:w-8 relative z-20 -ml-2 shadow-sm border-2 border-white">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                  alt="Attendee 2"
                />
              </Avatar>
              <Avatar className="h-7 w-7 lg:h-8 lg:w-8 relative z-30 -ml-2 shadow-sm border-2 border-white">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                  alt="Attendee 3"
                />
              </Avatar>
              <Avatar className="h-7 w-7 lg:h-8 lg:w-8 relative z-40 -ml-2 shadow-sm border-2 border-white">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
                  alt="Attendee 4"
                />
              </Avatar>
              <div className="h-7 w-7 lg:h-8 lg:w-8 bg-accent-purple-dark rounded-full flex items-center justify-center relative z-50 -ml-2 shadow-sm">
                <span className="text-sm text-white font-medium">+2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
