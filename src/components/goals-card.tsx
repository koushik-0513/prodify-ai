"use client";

import { Goal } from "lucide-react";

// Color palette
const colors = {
    primary: {
        icon: "#736FC3"
    },
    text: {
        primary: "text-gray-900",
        secondary: "text-gray-600",
        muted: "text-gray-400"
    },
    background: {
        white: "bg-white",
        progress: "bg-gray-200"
    },
    border: {
        default: "border-gray-200"
    },
    progress: {
        cyan: "bg-[#2BD3D1]",
        orange: "bg-[#FDA95E]"
    }
};

const goals = [
    {
        id: 1,
        title: "Check Emails and Messages",
        project: "Product launch • My Projects",
        progress: 73,
        color: colors.progress.cyan
    },
    {
        id: 2,
        title: "Prepare a brief status update to the client",
        project: "Product launch • My Projects",
        progress: 11,
        color: colors.progress.orange
    },
    {
        id: 3,
        title: "Update project documentation",
        project: "Team brainstorm • My Projects",
        progress: 63,
        color: colors.progress.cyan
    }
];

const GoalsCard = () => {
    return (
        <div className={`${colors.background.white} p-4 sm:p-4 lg:p-6 rounded-2xl border ${colors.border.default}`}>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Goal className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: colors.primary.icon }} />
                <h2 className={`text-base sm:text-lg font-medium ${colors.text.primary}`}>My Goals</h2>
            </div>

            <div className="space-y-3">
                {goals.map((goal) => (
                    <div key={goal.id} className="space-y-1 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div className="flex-1 min-w-0 pr-2">
                            <h3 className={`font-medium text-md ${colors.text.primary} break-words leading-tight`}>
                                {goal.title}
                            </h3>
                            <p className={`text-xs ${colors.text.muted} break-words leading-tight mt-1`}>
                                {goal.project}
                            </p>
                        </div>
                        <div className="flex flex-row justify-between items-center p-1 flex-shrink-0 mt-2 sm:mt-0">
                            <div className={`w-14 sm:w-16 md:w-20 ${colors.background.progress} rounded-full h-2 mr-2 sm:mr-3`}>
                                <div
                                    className={`h-2 rounded-full ${goal.color}`}
                                    style={{ width: `${goal.progress}%` }}
                                ></div>
                            </div>
                            <p className={`text-sm ${colors.text.secondary} font-bold whitespace-nowrap`}>
                                {goal.progress}%
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GoalsCard;