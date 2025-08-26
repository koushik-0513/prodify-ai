"use client";

import { Goal as GoalIcon } from "lucide-react";
import { goals } from "@/data/data";
import { Goal } from "@/types/types";

const GoalsCard = () => {
    return (
        <div className="bg-card p-4 sm:p-4 lg:p-6 rounded-2xl border border-border">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <GoalIcon className="size-4 sm:size-5 text-prodify-primary" />
                <h2 className="text-base sm:text-lg font-medium text-foreground">My Goals</h2>
            </div>

            <div className="space-y-3">
                {goals.map((goal: Goal) => (
                    <div key={goal.id} className="space-y-1 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div className="flex-1 min-w-0 pr-2">
                            <h3 className="font-medium text-md text-foreground break-words leading-tight">
                                {goal.title}
                            </h3>
                            <p className="text-xs text-muted-foreground break-words leading-tight mt-1">
                                {goal.project}
                            </p>
                        </div>
                        <div className="flex flex-row justify-between items-center p-1 flex-shrink-0 mt-2 sm:mt-0">
                            <div className="w-14 sm:w-16 md:w-20 bg-muted rounded-full h-2 mr-2 sm:mr-3">
                                <div
                                    className={`h-2 rounded-full ${goal.colorClass}`}
                                    style={{ width: `${goal.progress}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-foreground font-bold whitespace-nowrap">
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