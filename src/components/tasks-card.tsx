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

// Color palette
const colors = {
    primary: {
        icon: "#736FC3",
        accent: "#ACEDEE"
    },
    status: {
        inProgress: "bg-[#ACEDEE]",
        todo: "bg-gray-100",
        upcoming: "bg-[#FCD2AC]"
    },
    priority: {
        high: "bg-red-200 text-black-800",
        medium: "bg-yellow-200 text-black-800",
        low: "bg-gray-100 text-black-600"
    },
    dueDate: {
        urgent: "text-red-400",
        soon: "text-orange-500",
        normal: "text-black-600",
        future: "text-gray-500"
    },
    text: {
        primary: "text-gray-900",
        secondary: "text-gray-600",
        muted: "text-gray-400",
        dark: "text-black",
        icon: "text-black-400"
    },
    hover: {
        row: "hover:bg-gray-50",
        button: "hover:bg-gray-100",
        ghost: "hover:bg-transparent hover:text-gray-900"
    }
};

const tasks = [
    {
        id: 1,
        name: "One-on-One Meeting",
        priority: "High",
        priorityColor: colors.priority.high,
        dueDate: "Today",
        dueDateColor: colors.dueDate.urgent,
        status: "IN PROGRESS"
    },
    {
        id: 2,
        name: "Send a summary email to stakeholders",
        priority: "Low",
        priorityColor: colors.priority.low,
        dueDate: "3 days left",
        dueDateColor: colors.dueDate.normal,
        status: "IN PROGRESS"
    },
    {
        id: 3,
        name: "Review quarterly budget proposal",
        priority: "Medium",
        priorityColor: colors.priority.medium,
        dueDate: "Next week",
        dueDateColor: colors.dueDate.normal,
        status: "TO DO"
    },
    {
        id: 4,
        name: "Prepare presentation for client meeting",
        priority: "High",
        priorityColor: colors.priority.high,
        dueDate: "5 days left",
        dueDateColor: colors.dueDate.soon,
        status: "TO DO"
    },
    {
        id: 5,
        name: "Update project documentation",
        priority: "Low",
        priorityColor: colors.priority.low,
        dueDate: "2 weeks",
        dueDateColor: colors.dueDate.normal,
        status: "TO DO"
    },
    {
        id: 6,
        name: "Team building workshop planning",
        priority: "Medium",
        priorityColor: colors.priority.medium,
        dueDate: "3 weeks",
        dueDateColor: colors.dueDate.future,
        status: "UPCOMING"
    },
    {
        id: 7,
        name: "Annual performance reviews",
        priority: "High",
        priorityColor: colors.priority.high,
        dueDate: "1 month",
        dueDateColor: colors.dueDate.future,
        status: "UPCOMING"
    }
];

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

    const renderTaskRow = (task: any) => (
        <TableRow key={task.id} className={colors.hover.row}>
            <TableCell className="py-2 px-3 pr-1">
                <div className="flex items-center gap-2">
                    <ChevronDown size={16} className={`${colors.text.icon} flex-shrink-0`} />
                    <div className={`w-3 h-3 bg-[${colors.primary.accent}] rounded flex-shrink-0`}></div>
                    <span className={`${colors.text.primary} font-medium text-sm`}>{task.name}</span>
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
        textColor: string = colors.text.dark
    ) => {
        const sectionTasks = getTasksByStatus(status);
        const isExpanded = expandedSections[sectionKey];

        return (
            <div className="mb-4">
                <div 
                    className={`flex items-center gap-2 ml-2 mb-3 cursor-pointer ${colors.hover.row} p-1 rounded`}
                    onClick={() => toggleSection(sectionKey)}
                >
                    {isExpanded ? (
                        <ChevronUp size={16} className={colors.text.icon} />
                    ) : (
                        <ChevronDown size={16} className={colors.text.icon} />
                    )}
                    <span className={`${bgColor} ${textColor} font-medium text-xs px-2 py-1 rounded-sm`}>
                        {label}
                    </span>
                    <span className={`text-sm ${colors.text.secondary}`}>• {sectionTasks.length} task{sectionTasks.length !== 1 ? 's' : ''}</span>
                </div>

                {isExpanded && sectionTasks.length > 0 && (
                    <div className="overflow-x-auto mb-2">
                        <Table className="min-w-full">
                            <TableHeader>
                                <TableRow className="border-b border-gray-200">
                                    <TableHead className={`${colors.text.muted} font-normal text-xs py-2 px-3 text-left`}>Name</TableHead>
                                    <TableHead className={`${colors.text.muted} font-normal text-xs py-2 px-2 text-left`}>Priority</TableHead>
                                    <TableHead className={`${colors.text.muted} font-normal text-xs py-2 px-2 text-left`}>Due date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sectionTasks.map(task => renderTaskRow(task))}
                            </TableBody>
                        </Table>
                    </div>
                )}

                {isExpanded && (
                    <Button variant="ghost" className={`${colors.text.secondary} p-1 h-auto text-xs mb-2 ml-2 ${colors.hover.ghost}`}>
                        + Add task
                    </Button>
                )}
            </div>
        );
    };

    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 p-1">
                <div className="flex items-center gap-2 ml-1">
                    <NotepadText size={20} style={{ color: colors.primary.icon }} />
                    <h2 className="text-lg font-medium text-gray-800">My Tasks</h2>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className={`p-1.5 ${colors.hover.button}`}>
                        <Plus size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className={`p-1.5 ${colors.hover.button}`}>
                        <Maximize2 size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className={`p-1.5 ${colors.hover.button}`}>
                        <MoreHorizontal size={16} />
                    </Button>
                </div>
            </div>

            {/* All Sections */}
            {renderSection('inProgress', 'IN PROGRESS', 'IN PROGRESS', colors.status.inProgress, colors.text.dark)}
            {renderSection('todo', 'TO DO', 'TO DO', colors.status.todo, colors.text.dark)}
            {renderSection('upcoming', 'UPCOMING', 'UPCOMING', colors.status.upcoming, "text-black-800")}
        </div>
    );
};

export default TasksCard;