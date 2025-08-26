"use client";

import { Plus, Maximize2, MoreHorizontal, ChevronDown, ChevronUp, NotepadText } from "lucide-react";
import { Button } from "./ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { useState } from "react";
import { tasks } from "@/data/data";
import { Task } from "@/types/types";


const TasksCard = () => {
    const [expandedSections, setExpandedSections] = useState({
        inProgress: true,
        todo: false,
        upcoming: false
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const getTasksByStatus = (status: string) => {
        return tasks.filter(task => task.status === status);
    };

    const renderTaskRow = (task: Task) => (
        <TableRow key={task.id} className="hover:bg-accent">
            <TableCell className="py-2 px-3">
                <div className="flex items-center gap-2">
                    <ChevronDown size={16} className="text-muted-foreground" />
                    <div className="w-3 h-3 bg-accent-cyan-light rounded flex-shrink-0"></div>
                    <span className="text-foreground font-medium text-sm">{task.name}</span>
                </div>
            </TableCell>
            <TableCell className="pr-15">
                <span className={`text-xs px-2 py-1 rounded-sm font-medium whitespace-nowrap ${task.priorityColor}`}>
                    {task.priority}
                </span>             
            </TableCell>
            <TableCell className="py-2 px-2 pr-1">
                <span className={`text-sm whitespace-nowrap ${task.dueDateColor}`}>
                    {task.dueDate}
                </span>
            </TableCell>
        </TableRow>
    );

    const renderSection = (
        sectionKey: keyof typeof expandedSections,
        status: string,
        label: string,
        bgColor: string,
        textColor: string = "text-foreground"
    ) => {
        const sectionTasks = getTasksByStatus(status);
        const isExpanded = expandedSections[sectionKey];

        return (
            <div className="mb-4">
                <div 
                    className="flex items-center gap-2 ml-2 mb-3 cursor-pointer hover:bg-accent p-1 rounded"
                    onClick={() => toggleSection(sectionKey)}
                >
                    {isExpanded ? (
                        <ChevronUp size={16} className="text-muted-foreground" />
                    ) : (
                        <ChevronDown size={16} className="text-muted-foreground" />
                    )}
                    <span className={`${bgColor} ${textColor} font-medium text-xs px-2 py-1 rounded-sm`}>
                        {label}
                    </span>
                    <span className="text-sm text-muted-foreground">• {sectionTasks.length} task{sectionTasks.length !== 1 ? 's' : ''}</span>
                </div>

                {isExpanded && sectionTasks.length > 0 && (
                    <div className="overflow-x-auto mb-2">
                        <Table className="min-w-full">
                            <TableHeader>
                                <TableRow className="border-b border-border">
                                    <TableHead className="text-muted-foreground font-normal text-xs py-2 px-3 text-left">Name</TableHead>
                                    <TableHead className="text-muted-foreground font-normal text-xs py-2 px-2 text-left">Priority</TableHead>
                                    <TableHead className="text-muted-foreground font-normal text-xs py-2 px-2 text-left">Due date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sectionTasks.map(task => renderTaskRow(task))}
                            </TableBody>
                        </Table>
                    </div>
                )}

                {isExpanded && (
                    <Button variant="ghost" className="text-muted-foreground p-1 h-auto text-xs mb-2 ml-2 hover:bg-transparent hover:text-foreground">
                        + Add task
                    </Button>
                )}
            </div>
        );
    };

    return (
        <div className="bg-card p-4 rounded-2xl border border-border">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 p-1">
                <div className="flex items-center gap-2 ml-1">
                    <NotepadText size={20} style={{ color: 'var(--color-prodify-primary)' }} />
                    <h2 className="text-lg font-medium text-foreground">My Tasks</h2>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="p-1.5 hover:bg-accent">
                        <Plus size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1.5 hover:bg-accent">
                        <Maximize2 size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1.5 hover:bg-accent">
                        <MoreHorizontal size={16} />
                    </Button>
                </div>
            </div>

            {/* All Sections */}
            {renderSection('inProgress', 'IN PROGRESS', 'IN PROGRESS', 'bg-accent-cyan-light', 'text-foreground')}
            {renderSection('todo', 'TO DO', 'TO DO', 'bg-muted', 'text-foreground')}
            {renderSection('upcoming', 'UPCOMING', 'UPCOMING', 'bg-accent-orange-warm', 'text-foreground')}
        </div>
    );
};

export default TasksCard;