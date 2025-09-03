import {
  TDateItem,
  TGoal,
  TProject,
  TProjectDetail,
  TRemindersData,
  TStat,
  TTask,
} from "@/types/types";
import {
  Calendar,
  ChartBarBig,
  ClipboardList,
  Clock,
  Home,
  Inbox,
  Sparkle,
  TrendingUp,
  Users,
} from "lucide-react";

import { AIIcon } from "@/components/ui/ai-icon";

export const tasks: TTask[] = [
  {
    id: 1,
    name: "One-on-One Meeting",
    description: "This is a description of the task",
    priority: "High",
    priorityColor: "bg-priority-high",
    dueDate: "Today",
    dueDateColor: "text-due-urgent",
    status: "IN PROGRESS",
  },
  {
    id: 2,
    name: "Send a summary email to stakeholders",
    description: "This is a description of the task",
    priority: "Low",
    priorityColor: "bg-priority-low",
    dueDate: "3 days left",
    dueDateColor: "text-due-normal",
    status: "IN PROGRESS",
  },
  {
    id: 3,
    name: "Review quarterly budget proposal",
    description: "This is a description of the task",
    priority: "Medium",
    priorityColor: "bg-priority-medium text-due-soon",
    dueDate: "Next week",
    dueDateColor: "text-due-normal",
    status: "TO DO",
  },
  {
    id: 4,
    name: "Prepare presentation for client meeting",
    description: "This is a description of the task",
    priority: "High",
    priorityColor: "bg-priority-high text-due-urgent",
    dueDate: "5 days left",
    dueDateColor: "text-due-soon",
    status: "TO DO",
  },
  {
    id: 5,
    name: "Update project documentation",
    description: "This is a description of the task",
    priority: "Low",
    priorityColor: "bg-priority-low text-due-future",
    dueDate: "2 weeks",
    dueDateColor: "text-due-normal",
    status: "TO DO",
  },
  {
    id: 6,
    name: "Team building workshop planning",
    description: "This is a description of the task",
    priority: "Medium",
    priorityColor: "bg-priority-medium text-due-soon",
    dueDate: "3 weeks",
    dueDateColor: "text-due-future",
    status: "UPCOMING",
  },
  {
    id: 7,
    name: "Annual performance reviews",
    description: "This is a description of the task",
    priority: "High",
    priorityColor: "bg-priority-high text-due-urgent",
    dueDate: "1 month",
    dueDateColor: "text-due-future",
    status: "UPCOMING",
  },
];

export const initialReminders: TRemindersData = {
  today: [
    {
      id: 1,
      text: "Assess any new risks identified in the morning meeting.",
      completed: false,
    },
    {
      id: 2,
      text: "Outline key points for tomorrow's stand-up meeting.",
      completed: true,
    },
    {
      id: 3,
      text: "Review and approve quarterly budget proposals.",
      completed: false,
    },
    {
      id: 4,
      text: "Call client about contract renewal discussion.",
      completed: false,
    },
    {
      id: 5,
      text: "Update project timeline in management system.",
      completed: true,
    },
  ],
  tomorrow: [
    {
      id: 6,
      text: "Prepare presentation slides for board meeting.",
      completed: false,
    },
    {
      id: 7,
      text: "Schedule team building activity for next month.",
      completed: false,
    },
    {
      id: 8,
      text: "Review candidate resumes for developer position.",
      completed: false,
    },
  ],
  dayAfter: [
    {
      id: 9,
      text: "Submit expense reports for business trip.",
      completed: false,
    },
    {
      id: 10,
      text: "Follow up on pending vendor negotiations.",
      completed: false,
    },
    {
      id: 11,
      text: "Conduct performance review with Sarah.",
      completed: false,
    },
    {
      id: 12,
      text: "Finalize marketing campaign for Q4 launch.",
      completed: false,
    },
  ],
};

export const projectsDetails: TProjectDetail[] = [
  {
    id: 1,
    name: "Product Launch",
    status: "In Progress",
    progress: 68,
    team: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    ],
    color: "bg-prodify-primary",
  },
  {
    id: 2,
    name: "Website Redesign",
    status: "Planning",
    progress: 23,
    team: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    ],
    color: "bg-accent-orange",
  },
  {
    id: 3,
    name: "Mobile App",
    status: "Completed",
    progress: 100,
    team: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    ],
    color: "bg-accent-cyan-alt",
  },
];

export const stats: TStat[] = [
  {
    icon: TrendingUp,
    iconColor: "#736FC3", // Using hex instead of CSS variable
    bg: "bg-accent-purple-lighter",
    value: "3",
    label: "Active",
  },
  {
    icon: Users,
    iconColor: "#FDA95E", // Using hex instead of CSS variable
    bg: "bg-accent-orange-light",
    value: "12",
    label: "Members",
  },
  {
    icon: Clock,
    iconColor: "#2BD3D1", // Using hex instead of CSS variable
    bg: "bg-accent-cyan-lighter",
    value: "8",
    label: "Due Today",
  },
];

export const projects: TProject[] = [
  {
    id: 1,
    name: "Product launch",
    icon: {
      IconComponent: Sparkle, // Store component reference
      color: "#8B5CF6", // Store color as hex
      className: "text-project-purple size-17",
      transform: "rotate(34deg) translate(12px, -11px)",
    },
    tasks: 6,
    teammates: 12,
    color: "bg-project-purple-light",
  },
  {
    id: 2,
    name: "Team brainstorm",
    icon: {
      IconComponent: Sparkle,
      color: "#5B5FC7",
      className: "text-project-indigo size-17",
      transform: "translate(-10px, 10px) rotate(5deg)",
    },
    tasks: 2,
    teammates: 32,
    color: "bg-project-indigo-light",
  },
  {
    id: 3,
    name: "Branding launch",
    icon: {
      IconComponent: Sparkle,
      color: "#3B9EBD",
      className: "text-project-teal size-17",
      transform: "translate(-8px, -7px)",
    },
    tasks: 4,
    teammates: 9,
    color: "bg-project-teal-light",
  },
];

export const goals: TGoal[] = [
  {
    id: 1,
    title: "Check Emails and Messages",
    project: "Product launch • My Projects",
    progress: 73,
    colorClass: "bg-accent-cyan",
  },
  {
    id: 2,
    title: "Prepare a brief status update to the client",
    project: "Product launch • My Projects",
    progress: 11,
    colorClass: "bg-accent-orange",
  },
  {
    id: 3,
    title: "Update project documentation",
    project: "Team brainstorm • My Projects",
    progress: 63,
    colorClass: "bg-accent-cyan-alt",
  },
];

export const dates: TDateItem[] = [
  { day: "Fri", date: "04" },
  { day: "Sat", date: "05" },
  { day: "Sun", date: "06" },
  { day: "Mon", date: "07", active: true },
  { day: "Tue", date: "08" },
  { day: "Wed", date: "09" },
  { day: "Thu", date: "10" },
];

export const menuItems = [
  { id: "wt-home-nav-link", Icon: Home, label: "Home", path: "/home" },
  {
    id: "wt-prodify-ai-nav-link",
    Icon: AIIcon,
    label: "Prodify AI",
    path: "/prodify-ai",
  },
  {
    id: "wt-my-tasks-nav-link",
    Icon: ClipboardList,
    label: "My tasks",
    path: "/my-tasks",
  },
  { id: "wt-inbox-nav-link", Icon: Inbox, label: "Inbox", path: "/inbox" },
  {
    id: "wt-calendar-nav-link",
    Icon: Calendar,
    label: "Calendar",
    path: "/calendar",
  },
  {
    id: "wt-reports-and-analytics-nav-link",
    Icon: ChartBarBig,
    label: "Reports & Analytics",
    path: "/reports-and-analytics",
  },
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case "IN PROGRESS":
      return "bg-blue-100 text-blue-800";
    case "TO DO":
      return "bg-gray-100 text-gray-800";
    case "UPCOMING":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
