"use client";

import { Plus, ChevronDown, Briefcase, Sparkle } from "lucide-react";
import { Button } from "./ui/button";
import { projects } from "@/data/data";
import { Project } from "@/types/types";

const ProjectsCard = () => {
    return (
        <div className="bg-card p-3 sm:p-4 lg:p-5 rounded-2xl border border-border">
            <div className="flex items-center mb-4 pl-4">
                <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: 'var(--color-prodify-primary)' }} />
                    <h2 className="text-base sm:text-lg font-medium text-foreground">Projects</h2>
                </div>
                <Button 
                    variant="ghost" 
                    className="flex items-center gap-1 text-muted-foreground hover:text-foreground hover:bg-accent text-xs sm:text-sm px-3 py-2 rounded-lg transition-colors ml-4"
                >
                    Recents
                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-1">
                {/* Create new project card */}
                <div className="flex flex-row items-center gap-4">
                    <div className="flex flex-row items-center border-prodify-primary hover:border-accent-purple hover:shadow-md transition-all duration-200 cursor-pointer p-2 border-2 border-dashed rounded-xl ml-4">
                        <Plus className="h-6 w-6 sm:h-7 sm:w-7 text-prodify-primary flex-shrink-0" />
                    </div>
                    <p className="font-semibold text-foreground text-sm sm:text-base truncate">Create new project</p>
                </div>

                {/* Existing project cards */}
                {projects.map((project: Project) => (
                    <div key={project.id} className="rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-200 cursor-pointer">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className={`h-12 w-12 ${project.color} rounded-lg flex items-center justify-center shadow-sm p-2 overflow-hidden`}>
                                {project.icon ? (
                                    <div 
                                        className="flex items-center justify-center" 
                                        style={{ 
                                            transform: project.icon.transform,
                                            filter: project.icon.color ? `drop-shadow(0 0 8px ${project.icon.color}40)` : undefined
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
                                    <Sparkle 
                                        size={17}
                                        fill="currentColor"
                                        stroke="none"
                                    />
                                )}
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground text-sm sm:text-base">{project.name}</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground font-medium whitespace-nowrap">
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