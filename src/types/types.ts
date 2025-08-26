// types/data.types.ts

import { LucideIcon } from "lucide-react";

export interface Task {
    id: number;
    name: string;
    priority: "High" | "Medium" | "Low";
    priorityColor: string;
    dueDate: string;
    dueDateColor: string;
    status: "IN PROGRESS" | "TO DO" | "UPCOMING";
}

export interface Reminder {
    id: number;
    text: string;
    completed: boolean;
}

export interface RemindersData {
    today: Reminder[];
    tomorrow: Reminder[];
    dayAfter: Reminder[];
}

export interface ProjectDetail {
    id: number;
    name: string;
    status: "In Progress" | "Planning" | "Completed";
    progress: number;
    team: string[];
    color: string;
}

export interface Stat {
    icon: LucideIcon;
    iconColor: string;
    bg: string;
    value: string;
    label: string;
}

export interface ProjectIcon {
    IconComponent: LucideIcon;
    color: string;
    className: string;
    transform: string;
}

export interface Project {
    id: number;
    name: string;
    icon: ProjectIcon;
    tasks: number;
    teammates: number;
    color: string;
}

export interface Goal {
    id: number;
    title: string;
    project: string;
    progress: number;
    colorClass: string;
}

export interface DateItem {
    day: string;
    date: string;
    active?: boolean;
}