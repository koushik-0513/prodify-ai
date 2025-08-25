"use client";

import { Plus, ChevronDown, Briefcase, Sparkle } from "lucide-react";
import { Button } from "./ui/button";

// Color palette
const colors = {
    primary: {
        icon: "#736FC3",
        border: "border-[#736FC3]",
        borderHover: "hover:border-purple-400"
    },
    text: {
        primary: "text-gray-900",
        secondary: "text-gray-800",
        muted: "text-gray-400",
        button: "text-[#736FC3]"
    },
    background: {
        white: "bg-white",
        hover: "hover:bg-gray-100",
        project1: "bg-[#F7E6FE]",
        project2: "bg-[#E8E7FF]",
        project3: "bg-[#DCF2FA]"
    },
    border: {
        default: "border-gray-200"
    },
    icons: {
        project1: "#8B5CF6",
        project2: "#5B5FC7",
        project3: "#3B9EBD"
    }
};

const projects = [
    {
        id: 1,
        name: "Product launch",
        icon: {
            color: colors.icons.project1,
            element: <Sparkle className="w-17 h-17 overflow-hidden" fill={colors.icons.project1} stroke="none" />,
            style: "rotate(34deg) translate(12px, -11px)"
        },
        tasks: 6,
        teammates: 12,
        color: colors.background.project1
    },
    {
        id: 2,
        name: "Team brainstorm",
        icon: {
            color: colors.icons.project2,
            element: <Sparkle className="w-17 h-17 overflow-hidden" fill={colors.icons.project2} stroke="none" />,
            style: "translate(-10px, 10px) rotate(5deg)"
        },
        tasks: 2,
        teammates: 32,
        color: colors.background.project2
    },
    {
        id: 3,
        name: "Branding launch",
        icon: {
            color: colors.icons.project3,
            element: <Sparkle className="w-17 h-17 overflow-hidden" fill={colors.icons.project3} stroke="none" />,
            style: "translate(-8px, -7px)"
        },
        tasks: 4,
        teammates: 9,
        color: colors.background.project3
    }
];

const ProjectsCard = () => {
    return (
        <div className={`${colors.background.white} p-3 sm:p-4 lg:p-5 rounded-2xl border ${colors.border.default}`}>
            <div className="flex items-center mb-4 pl-4">
                <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: colors.primary.icon }} />
                    <h2 className={`text-base sm:text-lg font-medium ${colors.text.secondary}`}>Projects</h2>
                </div>
                <Button 
                    variant="ghost" 
                    className={`flex items-center gap-1 ${colors.text.muted} hover:text-gray-800 ${colors.background.hover} text-xs sm:text-sm px-3 py-2 rounded-lg transition-colors ml-4`}
                >
                    Recents
                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-1">
                {/* Create new project card */}
                <div className="flex flex-row items-center gap-4">
                    <div className={`flex flex-row items-center ${colors.primary.border} ${colors.primary.borderHover} hover:shadow-md transition-all duration-200 cursor-pointer p-2 border-2 border-dashed rounded-xl ml-4`}>
                        <Plus className={`h-6 w-6 sm:h-7 sm:w-7 ${colors.text.button} flex-shrink-0`} />
                    </div>
                    <p className={`font-semibold ${colors.text.primary} text-sm sm:text-base truncate`}>Create new project</p>
                </div>

                {/* Existing project cards */}
                {projects.map((project) => (
                    <div key={project.id} className="rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-200 cursor-pointer">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className={`h-12 w-12 ${project.color} rounded-lg flex items-center justify-center shadow-sm p-2 overflow-hidden`}>
                                {project.icon ? (
                                    <div 
                                        className="flex items-center justify-center" 
                                        style={{ 
                                            transform: project.icon.style,
                                            filter: project.icon.color ? `drop-shadow(0 0 8px ${project.icon.color}40)` : undefined
                                        }}
                                    >
                                        {project.icon.element}
                                    </div>
                                ) : (
                                    <Sparkle 
                                        size={28}
                                        fill="currentColor"
                                        stroke="none"
                                    />
                                )}
                            </div>
                            <div>
                                <h3 className={`font-semibold ${colors.text.primary} text-sm sm:text-base`}>{project.name}</h3>
                                <p className={`text-xs sm:text-sm ${colors.text.muted} font-medium whitespace-nowrap`}>
                                    {project.tasks} tasks • {project.teammates} teammates
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsCard;