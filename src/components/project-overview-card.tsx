"use client";

import { FolderOpen, TrendingUp, Users, Clock, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { stats, projectsDetails } from "@/data/data";
import { ProjectDetail } from "@/types/types";

const ProjectOverviewCard = () => {
    const getStatusColors = (status: string) => {
        switch(status) {
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
        <div className="bg-card p-4 sm:p-4 lg:p-6 rounded-2xl border border-border">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: 'var(--color-prodify-primary)' }} />
                    <h2 className="text-base sm:text-lg font-medium text-foreground">Project Overview</h2>
                </div>
                <Button variant="ghost" size="sm" className="p-2 hover:bg-accent rounded-lg transition-colors">
                    <Plus size={16} className="text-muted-foreground" />
                </Button>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                {stats.map((stat, index) => (
                    <div key={index} className={`text-center p-3 ${stat.bg} rounded-xl`}>
                        <div className="flex items-center justify-center mb-1">
                            <stat.icon size={16} style={{ color: stat.iconColor }} />
                        </div>
                        <p className="text-lg font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Project List */}
            <div className="space-y-3">
                {projectsDetails.map((project: ProjectDetail) => (
                    <div 
                        key={project.id} 
                        className="p-3 bg-muted rounded-xl hover:bg-accent transition-colors cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-sm text-foreground truncate">{project.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColors(project.status)}`}>
                                {project.status}
                            </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="flex -space-x-1">
                                    {project.team.map((avatar, index) => (
                                        <Avatar key={index} className="h-6 w-6 border-2 border-white">
                                            <AvatarImage src={avatar} alt={`Team member ${index + 1}`} />
                                        </Avatar>
                                    ))}
                                </div>
                                <span className="text-xs text-muted-foreground">{project.team.length} members</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                <div className="w-16 bg-muted rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${project.color}`}
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs font-medium text-muted-foreground">{project.progress}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectOverviewCard;