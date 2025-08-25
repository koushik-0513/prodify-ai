"use client";

import { FolderOpen, TrendingUp, Users, Clock, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";

// Color palette
const colors = {
    primary: {
        icon: "#736FC3",
        bg: "bg-[#736FC3]"
    },
    secondary: {
        icon: "#FDA95E",
        bg: "bg-[#FDA95E]"
    },
    tertiary: {
        icon: "#2BD3D1",
        bg: "bg-[#2BD3D1]"
    },
    text: {
        primary: "text-gray-900",
        secondary: "text-gray-600",
        muted: "text-gray-500"
    },
    background: {
        white: "bg-white",
        hover: "hover:bg-gray-100",
        card: "bg-gray-50",
        primaryLight: "bg-[#F5F6FF]",
        secondaryLight: "bg-[#FFF5F0]",
        tertiaryLight: "bg-[#F0FFFD]"
    },
    border: {
        default: "border-gray-200",
        white: "border-white",
        progress: "bg-gray-200"
    },
    status: {
        completed: {
            bg: "bg-green-100",
            text: "text-green-700"
        },
        inProgress: {
            bg: "bg-blue-100",
            text: "text-blue-700"
        },
        planning: {
            bg: "bg-yellow-100",
            text: "text-yellow-700"
        }
    }
};

const projects = [
    {
        id: 1,
        name: "Product Launch",
        status: "In Progress",
        progress: 68,
        team: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
        ],
        color: colors.primary.bg
    },
    {
        id: 2,
        name: "Website Redesign",
        status: "Planning",
        progress: 23,
        team: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
        ],
        color: colors.secondary.bg
    },
    {
        id: 3,
        name: "Mobile App",
        status: "Completed",
        progress: 100,
        team: [
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
        ],
        color: colors.tertiary.bg
    }
];

const stats = [
    {
        icon: TrendingUp,
        iconColor: colors.primary.icon,
        bg: colors.background.primaryLight,
        value: "3",
        label: "Active"
    },
    {
        icon: Users,
        iconColor: colors.secondary.icon,
        bg: colors.background.secondaryLight,
        value: "12",
        label: "Members"
    },
    {
        icon: Clock,
        iconColor: colors.tertiary.icon,
        bg: colors.background.tertiaryLight,
        value: "8",
        label: "Due Today"
    }
];

const ProjectOverviewCard = () => {
    const getStatusColors = (status: string) => {
        switch(status) {
            case "Completed":
                return `${colors.status.completed.bg} ${colors.status.completed.text}`;
            case "In Progress":
                return `${colors.status.inProgress.bg} ${colors.status.inProgress.text}`;
            case "Planning":
                return `${colors.status.planning.bg} ${colors.status.planning.text}`;
            default:
                return "";
        }
    };

    return (
        <div className={`${colors.background.white} p-4 sm:p-4 lg:p-6 rounded-2xl border ${colors.border.default}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: colors.primary.icon }} />
                    <h2 className={`text-base sm:text-lg font-medium ${colors.text.primary}`}>Project Overview</h2>
                </div>
                <Button variant="ghost" size="sm" className={`p-2 ${colors.background.hover} rounded-lg transition-colors`}>
                    <Plus size={16} className={colors.text.secondary} />
                </Button>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                {stats.map((stat, index) => (
                    <div key={index} className={`text-center p-3 ${stat.bg} rounded-xl`}>
                        <div className="flex items-center justify-center mb-1">
                            <stat.icon size={16} style={{ color: stat.iconColor }} />
                        </div>
                        <p className={`text-lg font-bold ${colors.text.primary}`}>{stat.value}</p>
                        <p className={`text-xs ${colors.text.muted}`}>{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Project List */}
            <div className="space-y-3">
                {projects.map((project) => (
                    <div 
                        key={project.id} 
                        className={`p-3 ${colors.background.card} rounded-xl ${colors.background.hover} transition-colors cursor-pointer`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className={`font-medium text-sm ${colors.text.primary} truncate`}>{project.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColors(project.status)}`}>
                                {project.status}
                            </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="flex -space-x-1">
                                    {project.team.map((avatar, index) => (
                                        <Avatar key={index} className={`h-6 w-6 border-2 ${colors.border.white}`}>
                                            <AvatarImage src={avatar} alt={`Team member ${index + 1}`} />
                                        </Avatar>
                                    ))}
                                </div>
                                <span className={`text-xs ${colors.text.muted}`}>{project.team.length} members</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <div className={`w-16 ${colors.border.progress} rounded-full h-2`}>
                                    <div
                                        className={`h-2 rounded-full ${project.color}`}
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                                <span className={`text-xs font-medium ${colors.text.secondary}`}>{project.progress}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectOverviewCard;