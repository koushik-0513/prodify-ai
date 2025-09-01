"use client";

import { useState } from "react";

import Link from "next/link";

import { TTask, TTaskExpandedSections } from "@/types/types";
import {
  ChevronDown,
  ChevronUp,
  Maximize2,
  MoreHorizontal,
  NotepadText,
  Plus,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { tasks } from "@/data/data";

import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type TaskSectionProps = {
  status: string;
  sectionKey: keyof TTaskExpandedSections;
  label: string;
  bgColor: string;
  textColor?: string;
  isExpanded: boolean;
  onToggle: (section: keyof TTaskExpandedSections) => void;
  tasks: TTask[];
};

const TaskRow = ({ task }: { task: TTask }) => (
  <TableRow className="hover:bg-accent-alt">
    <TableCell className="flex items-center justify-start gap-2 py-2">
      <ChevronDown size={16} className="text-muted-foreground" />
      <div className="bg-accent-cyan-light h-3 w-3 rounded"></div>
      <Link className="text-[16px]" href={`/my-tasks/${task.id}`}>
        {task.name}
      </Link>
    </TableCell>
    <TableCell className="pr-15">
      <span
        className={cn(
          "cursor-pointer rounded-sm px-2 py-1 text-xs font-medium whitespace-nowrap",
          task.priorityColor
        )}
      >
        {task.priority}
      </span>
    </TableCell>
    <TableCell className="px-3 py-3 text-right">
      <span className={cn("text-sm whitespace-nowrap", task.dueDateColor)}>
        {task.dueDate}
      </span>
    </TableCell>
  </TableRow>
);

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
        className="hover:bg-accent mb-3 ml-3 flex cursor-pointer items-center gap-2 rounded px-2 py-2"
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
            "rounded-sm px-2 py-1 text-xs font-medium"
          )}
        >
          {label}
        </span>
        <span className="text-foreground text-sm">
          • {tasks.length} task{status !== "IN PROGRESS" ? "s" : ""}
        </span>
      </div>

      {isExpanded && tasks.length > 0 && (
        <div className="mb-2 overflow-x-auto px-3">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="border-border border-b">
                <TableHead className="text-muted-foreground px-3 py-2 text-left text-xs font-normal">
                  Name
                </TableHead>
                <TableHead className="text-muted-foreground px-2 py-2 text-left text-xs font-normal">
                  Priority
                </TableHead>
                <TableHead className="text-muted-foreground px-3 py-2 text-right text-xs font-normal">
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
          className="text-foreground hover:text-foreground mb-2 ml-2 h-auto px-4 text-sm hover:bg-transparent"
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
    <div className="bg-card border-border rounded-2xl border p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="ml-3 flex items-center gap-2">
          <NotepadText size={20} className="text-prodify-primary" />
          <h2 className="text-lg font-medium">My Tasks</h2>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="hover:bg-accent p-1.5">
            <Plus size={16} />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-accent p-1.5">
            <Maximize2 size={16} />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-accent p-1.5">
            <MoreHorizontal size={16} />
          </Button>
        </div>
      </div>

      {/* All Sections */}
      {sectionConfigs.map((config) => (
        <TaskSection
          status={config.status}
          key={config.key}
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
