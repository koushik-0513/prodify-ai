"use client";

import { FolderOpen, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

import { projectsDetails, stats } from "@/data/data";

import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export const ProjectOverviewCard = () => {
  const getStatusColors = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-status-completed text-status-completed-text";
      case "In Progress":
        return "bg-status-progress text-status-progress-text";
      case "Planning":
        return "bg-status-planning text-status-planning-text";
      default:
        return "";
    }
  };

  return (
    <div className="bg-card border-border rounded-2xl border p-4 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderOpen className="text-prodify-primary h-4 w-4 sm:h-5 sm:w-5" />
          <h2 className="text-base font-medium sm:text-lg">Project Overview</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-accent rounded-lg p-2 transition-colors"
        >
          <Plus size={16} className="text-muted-foreground" />
        </Button>
      </div>

      {/* Project Stats */}
      <div className="mb-4 grid grid-cols-3 gap-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={cn("rounded-xl p-3 text-center", stat.bg)}
          >
            <div className="mb-1 flex items-center justify-center">
              <stat.icon size={16} style={{ color: stat.iconColor }} />
            </div>
            <p className="text-lg font-bold">{stat.value}</p>
            <p className="text-muted-foreground text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Project List */}
      <div className="space-y-3">
        {projectsDetails.map((project) => (
          <div
            key={project.id}
            className="bg-muted hover:bg-accent cursor-pointer rounded-xl p-3 transition-colors"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="truncate text-sm font-medium">{project.name}</h3>
              <span
                className={cn(
                  "rounded-full px-2 py-1 text-xs",
                  getStatusColors(project.status)
                )}
              >
                {project.status}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  {project.team.map((avatar, index) => (
                    <Avatar
                      key={index}
                      className="h-6 w-6 border-2 border-white"
                    >
                      <AvatarImage
                        src={avatar}
                        alt={`Team member ${index + 1}`}
                      />
                    </Avatar>
                  ))}
                </div>
                <span className="text-muted-foreground text-xs">
                  {project.team.length} members
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <div className="bg-muted h-2 w-16 rounded-full">
                  <div
                    className={cn("h-2 rounded-full", project.color)}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="text-muted-foreground text-xs font-medium">
                  {project.progress}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
