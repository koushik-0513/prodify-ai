"use client";

import { Briefcase, ChevronDown, Plus, Sparkle } from "lucide-react";

import { cn } from "@/lib/utils";

import { projects } from "@/data/data";

import { Button } from "./ui/button";

export const ProjectsCard = () => {
  return (
    <div className="bg-card border-border rounded-2xl border p-3 sm:p-4 lg:p-5">
      <div className="mb-4 flex items-center">
        <div className="mr-3 ml-3 flex items-center gap-2">
          <Briefcase className="text-prodify-primary size-4 sm:size-5" />
          <h2 className="text-base font-medium sm:text-lg">Projects</h2>
        </div>
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground hover:bg-accent flex items-center gap-1 rounded-lg px-3 py-2 text-xs transition-colors sm:text-sm"
        >
          Recents
          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-1">
        {/* Create new project card */}
        <div className="ml-3 flex items-center gap-4">
          <div className="border-prodify-primary hover:border-accent-purple flex cursor-pointer items-center rounded-xl border-2 border-dashed p-2 transition-all duration-200 hover:shadow-md">
            <Plus className="text-prodify-primary h-6 w-6 sm:h-7 sm:w-7" />
          </div>
          <p className="truncate text-sm font-semibold sm:text-base">
            Create new project
          </p>
        </div>

        {/* Existing project cards */}
        {projects.map((project) => (
          <div
            key={project.id}
            className="cursor-pointer rounded-xl p-3 transition-all duration-200 hover:shadow-lg sm:p-4"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg p-2 shadow-sm",
                  project.color
                )}
              >
                {project.icon ? (
                  <div
                    className="flex items-center justify-center"
                    style={{
                      transform: project.icon.transform,
                      filter: project.icon.color
                        ? `drop-shadow(0 0 8px ${project.icon.color}40)`
                        : undefined,
                    }}
                  >
                    <project.icon.IconComponent
                      size={17}
                      className={project.icon.className}
                      fill={project.icon.color}
                      stroke="none"
                    />
                  </div>
                ) : (
                  <Sparkle size={17} fill="currentColor" stroke="none" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold sm:text-base">
                  {project.name}
                </h3>
                <p className="text-muted-foreground text-xs font-medium tracking-wide sm:text-sm">
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
