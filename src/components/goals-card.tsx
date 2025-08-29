"use client";

import { Goal as GoalIcon } from "lucide-react";
import { goals } from "@/data/data";
import { cn } from "@/lib/utils";

export const GoalsCard = () => {
  return (
    <div className="bg-card p-4 sm:p-4 lg:p-6 rounded-2xl border border-border">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <GoalIcon className="size-4 sm:size-5 text-prodify-primary" />
        <h2 className="text-base sm:text-lg font-medium">My Goals</h2>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="space-y-1 flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="font-medium md:text-lg sm:text-md  break-words leading-tight">
                {goal.title}
              </h3>
              <p className="text-sm text-muted-foreground break-words leading-tight mt-1">
                {goal.project}
              </p>
            </div>
            {/* Progress bar and percentage side by side */}
            <div className="flex flex-row items-center gap-4 flex-shrink-0 mt-2 sm:mt-0">
              {/* Progress bar - full width on mobile, fixed width on larger screens */}
              <div className="w-full sm:w-20 lg:w-24 bg-muted rounded-full h-2">
                <div
                  className={cn("h-2 rounded-full", goal.colorClass)}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              {/* Percentage */}
              <p className="md:text-md sm:text-sm font-bold whitespace-nowrap">
                {goal.progress}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
