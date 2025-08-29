// types/data.types.ts

import { LucideIcon } from "lucide-react";

export type TTask = {
    id: number;
    name: string;
    priority: "High" | "Medium" | "Low";
    priorityColor: string;
    dueDate: string;
    dueDateColor: string;
    status: "IN PROGRESS" | "TO DO" | "UPCOMING";
};

export type TReminder = {
    id: number;
    text: string;
    completed: boolean;
};

export type TReminderSection = 'today' | 'tomorrow' | 'dayAfter';

export type TRemindersData = {
    today: TReminder[];
    tomorrow: TReminder[];
    dayAfter: TReminder[];
};

export type TProjectDetail = {
    id: number;
    name: string;
    status: "In Progress" | "Planning" | "Completed";
    progress: number;
    team: string[];
    color: string;
};

export type TStat = {
    icon: LucideIcon;
    iconColor: string;
    bg: string;
    value: string;
    label: string;
};

export type TProjectIcon = {
    IconComponent: LucideIcon;
    color: string;
    className: string;
    transform: string;
};

export type TProject = {
    id: number;
    name: string;
    icon: TProjectIcon;
    tasks: number;
    teammates: number;
    color: string;
};

export type TGoal = {
    id: number;
    title: string;
    project: string;
    progress: number;
    colorClass: string;
};

export type TDateItem = {
    day: string;
    date: string;
    active?: boolean;
};

export type TExpandedSections<T extends string = string> = Record<T, boolean>;

// Specific expanded section types using the generic
export type TTaskExpandedSections = TExpandedSections<'inProgress' | 'todo' | 'upcoming'>;
export type TReminderExpandedSections = TExpandedSections<'today' | 'tomorrow' | 'dayAfter'>;