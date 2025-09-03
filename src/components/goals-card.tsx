"use client";

import { Goal as GoalIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { goals } from "@/data/data";

export const GoalsCard = () => {
  return (
    <div className="bg-card border-border rounded-2xl border p-4 sm:p-4 lg:p-6">
      <div className="mb-3 flex items-center gap-2 sm:mb-4">
        <GoalIcon className="text-prodify-primary size-4 sm:size-5" />
        <h2 className="text-base font-medium sm:text-lg">My Goals</h2>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 flex-1 pr-2">
              <h3 className="sm:text-md leading-tight font-medium break-words md:text-lg">
                {goal.title}
              </h3>
              <p className="text-muted-foreground mt-1 text-sm leading-tight break-words">
                {goal.project}
              </p>
            </div>
            {/* Progress bar and percentage side by side */}
            <div className="mt-2 flex flex-shrink-0 flex-row items-center gap-4 sm:mt-0">
              {/* Progress bar - full width on mobile, fixed width on larger screens */}
              <div className="bg-muted h-2 w-full rounded-full sm:w-20 lg:w-24">
                <div
                  className={cn("h-2 rounded-full", goal.colorClass)}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              {/* Percentage */}
              <p className="md:text-md font-bold whitespace-nowrap sm:text-sm">
                {goal.progress}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
