"use client";

import Image from "next/image";

import { TDateItem } from "@/types/types";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
} from "lucide-react";

import { dates } from "@/data/data";

import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export const CalendarCard = () => {
  return (
    <div className="bg-card border-border rounded-2xl border p-4 sm:p-6">
      <div className="mb-6 flex items-center">
        <div className="mr-3 ml-3 flex items-center gap-2">
          <Calendar size={20} className="text-prodify-primary" />
          <h2 className="text-lg font-medium sm:text-xl">Calendar</h2>
        </div>
        <Button
          variant="ghost"
          className="hover:bg-accent flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2 transition-colors"
        >
          <span className="text-md">July</span>
          <ChevronDown size={16} />
        </Button>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-accent cursor-pointer rounded-lg p-1 transition-colors sm:p-1.5"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>

        <div className="grid flex-1 grid-cols-4 gap-1.5 sm:grid-cols-7 sm:gap-4 md:grid-cols-7 lg:grid-cols-7">
          {dates.map((date: TDateItem, index: number) => (
            <div
              key={index}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-lg py-2 transition-all duration-200 sm:rounded-xl sm:px-1 sm:py-2 lg:max-w-14 ${
                index > 3 ? "hidden sm:flex md:flex lg:flex" : "flex"
              } ${
                date.active
                  ? "from-prodify-primary to-accent-purple scale-105 transform bg-gradient-to-br text-white shadow-lg"
                  : "hover:bg-accent hover:shadow-md"
              }`}
            >
              <span
                className={`text-[10px] font-medium sm:text-xs md:text-sm ${
                  date.active ? "text-white" : "text-muted-foreground"
                }`}
              >
                {date.day}
              </span>
              <span className="text-roboto text-lg md:text-xl">
                {date.date}
              </span>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-accent cursor-pointer rounded-lg p-1.5 transition-colors sm:p-2"
        >
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>

      <div className="bg-meeting-bg m-2 rounded-2xl p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium lg:text-lg">
              Meeting with VP
            </h3>
            <p className="text-muted-foreground text-sm">
              Today • 10:00 - 11:00 am
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-accent cursor-pointer rounded-lg p-2 transition-colors"
          >
            <Ellipsis size={20} className="text-foreground" />
          </Button>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row lg:flex-row">
          <Button className="bg-card hover:bg-accent text-foreground text-md border-border flex cursor-pointer items-center justify-center gap-1 rounded-2xl border px-3 py-2 shadow-md transition-all duration-200 hover:shadow-md md:w-35">
            <Image
              src="/assets/google-meet.png"
              alt="Google Meet"
              width={16}
              height={16}
              className="h-4 w-4 flex-shrink-0"
            />
            <span className="font-medium">Google Meet</span>
          </Button>

          <div className="bg-avatar-bg rounded-full p-0.5 shadow-md">
            <div className="flex items-center">
              <Avatar className="relative z-10 h-7 w-7 border-2 border-white shadow-sm lg:h-8 lg:w-8">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                  alt="Attendee 1"
                />
              </Avatar>
              <Avatar className="relative z-20 -ml-2 h-7 w-7 border-2 border-white shadow-sm lg:h-8 lg:w-8">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                  alt="Attendee 2"
                />
              </Avatar>
              <Avatar className="relative z-30 -ml-2 h-7 w-7 border-2 border-white shadow-sm lg:h-8 lg:w-8">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                  alt="Attendee 3"
                />
              </Avatar>
              <Avatar className="relative z-40 -ml-2 h-7 w-7 border-2 border-white shadow-sm lg:h-8 lg:w-8">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
                  alt="Attendee 4"
                />
              </Avatar>
              <div className="bg-accent-purple-dark relative z-50 -ml-2 flex h-7 w-7 items-center justify-center rounded-full shadow-sm lg:h-8 lg:w-8">
                <span className="text-sm font-medium text-white">+2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
