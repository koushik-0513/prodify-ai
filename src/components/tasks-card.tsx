"use client";

import {
  Plus,
  Maximize2,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  NotepadText,
} from "lucide-react";
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
import { TTask, TTaskExpandedSections } from "@/types/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
interface TaskRowProps {
  task: TTask;
}

const TaskRow = ({ task }: TaskRowProps) => (
  <TableRow className="hover:bg-accent-alt">
    <TableCell className="flex justify-start items-center gap-2 py-2">
      <ChevronDown size={16} className="text-muted-foreground" />
      <div className="w-3 h-3 bg-accent-cyan-light rounded"></div>
      <Link className="text-[16px]" href={`/my-tasks/${task.id}`}>
        {task.name}
      </Link>
    </TableCell>
    <TableCell className="pr-15">
      <span
        className={cn(
          "text-xs px-2 py-1 rounded-sm font-medium whitespace-nowrap cursor-pointer",
          task.priorityColor,
        )}
      >
        {task.priority}
      </span>
    </TableCell>
    <TableCell className="py-3 px-3 text-right">
      <span className={cn("text-sm whitespace-nowrap", task.dueDateColor)}>
        {task.dueDate}
      </span>
    </TableCell>
  </TableRow>
);

interface TaskSectionProps {
  status: string;
  sectionKey: keyof TTaskExpandedSections;
  label: string;
  bgColor: string;
  textColor?: string;
  isExpanded: boolean;
  onToggle: (section: keyof TTaskExpandedSections) => void;
  tasks: TTask[];
}

const TaskSection = ({
  status,
  sectionKey,
  label,
  bgColor,
  textColor = "text-foreground",
  isExpanded,
  onToggle,
  tasks,
}: TaskSectionProps) => {
  return (
    <div className="mb-1">
      <div
        className="flex items-center gap-2 ml-5 mb-3 cursor-pointer hover:bg-accent hover:py-1 rounded"
        onClick={() => onToggle(sectionKey)}
      >
        {isExpanded ? (
          <ChevronUp size={16} className="text-foreground" />
        ) : (
          <ChevronDown size={16} className="text-foreground" />
        )}
        <span
          className={cn(
            bgColor,
            textColor,
            "font-medium text-xs px-2 py-1 rounded-sm",
          )}
        >
          {label}
        </span>
        <span className="text-sm text-foreground">
          • {tasks.length} task{tasks.length !== 1 ? "s" : ""}
        </span>
      </div>

      {isExpanded && tasks.length > 0 && (
        <div className="overflow-x-auto mb-2 px-3">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead className="text-muted-foreground font-normal text-xs py-2 px-3 text-left">
                  Name
                </TableHead>
                <TableHead className="text-muted-foreground font-normal text-xs py-2 px-2 text-left">
                  Priority
                </TableHead>
                <TableHead className="text-muted-foreground font-normal text-xs py-2 px-3 text-right">
                  Due date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {isExpanded && (
        <Button
          variant="ghost"
          className="text-foreground px-4 h-auto text-sm mb-2 ml-2 hover:bg-transparent hover:text-foreground"
        >
          + Add task
        </Button>
      )}
    </div>
  );
};

export const TasksCard = () => {
  const [expandedSections, setExpandedSections] =
    useState<TTaskExpandedSections>({
      inProgress: true,
      todo: false,
      upcoming: false,
    });

  const toggleSection = (section: keyof TTaskExpandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status);
  };

  const sectionConfigs = [
    {
      key: "inProgress" as keyof TTaskExpandedSections,
      status: "IN PROGRESS",
      label: "IN PROGRESS",
      bgColor: "bg-accent-cyan-light",
      textColor: "text-foreground",
    },
    {
      key: "todo" as keyof TTaskExpandedSections,
      status: "TO DO",
      label: "TO DO",
      bgColor: "bg-muted",
      textColor: "text-foreground",
    },
    {
      key: "upcoming" as keyof TTaskExpandedSections,
      status: "UPCOMING",
      label: "UPCOMING",
      bgColor: "bg-accent-orange-warm",
      textColor: "text-foreground",
    },
  ];

  return (
    <div className="bg-card p-4 rounded-2xl border border-border">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 ml-3">
          <NotepadText size={20} className="text-prodify-primary" />
          <h2 className="text-lg font-medium">My Tasks</h2>
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
      {sectionConfigs.map((config) => (
        <TaskSection
          key={config.key}
          status={config.status}
          sectionKey={config.key}
          label={config.label}
          bgColor={config.bgColor}
          textColor={config.textColor}
          isExpanded={expandedSections[config.key]}
          onToggle={toggleSection}
          tasks={getTasksByStatus(config.status)}
        />
      ))}
    </div>
  );
};
