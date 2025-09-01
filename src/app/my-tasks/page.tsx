"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { TTask } from "@/types/types";
import {
  AlertCircle,
  Archive,
  CheckCircle,
  Circle,
  Clock,
  Edit3,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import { getStatusColor, tasks } from "@/data/data";

const MyTasksPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "IN PROGRESS" | "TO DO" | "UPCOMING"
  >("ALL");
  const [priorityFilter, setPriorityFilter] = useState<
    "ALL" | "High" | "Medium" | "Low"
  >("ALL");
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === "ALL" || task.priority === priorityFilter;
      const isNotCompleted = !completedTasks.has(task.id);

      return (
        matchesSearch && matchesStatus && matchesPriority && isNotCompleted
      );
    });
  }, [searchQuery, statusFilter, priorityFilter, completedTasks]);

  // Group tasks by status
  const groupedTasks = useMemo(() => {
    const groups = {
      "IN PROGRESS": [] as TTask[],
      "TO DO": [] as TTask[],
      UPCOMING: [] as TTask[],
    };

    filteredTasks.forEach((task) => {
      groups[task.status].push(task);
    });

    return groups;
  }, [filteredTasks]);

  const toggleTaskCompletion = (taskId: number) => {
    setCompletedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "High":
        return <AlertCircle size={16} className="text-red-500" />;
      case "Medium":
        return <Clock size={16} className="text-yellow-500" />;
      case "Low":
        return <Circle size={16} className="text-green-500" />;
      default:
        return <Circle size={16} className="text-gray-400" />;
    }
  };

  const TaskItem = ({ task }: { task: TTask }) => (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
      {/* Checkbox */}
      <button
        onClick={() => toggleTaskCompletion(task.id)}
        className="flex-shrink-0"
      >
        {completedTasks.has(task.id) ? (
          <CheckCircle size={20} className="text-green-500" />
        ) : (
          <Circle size={20} className="text-gray-400 hover:text-green-500" />
        )}
      </button>

      {/* Task Details */}
      <div className="min-w-0">
        <Link
          className={cn(
            "block truncate font-medium text-gray-900",
            completedTasks.has(task.id) && "text-gray-500 line-through"
          )}
          href={`/my-tasks/${task.id}`}
        >
          {task.name}
        </Link>
        <div className="mt-1 grid grid-cols-[auto_auto_1fr] items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2 py-1 text-xs whitespace-nowrap",
              getStatusColor(task.status)
            )}
          >
            {task.status}
          </span>
          <span className="text-xs text-gray-500">•</span>
          <span className={cn("truncate text-xs", task.dueDateColor)}>
            {task.dueDate}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-[auto_auto] items-center gap-2">
        <div className="flex items-center gap-1">
          {getPriorityIcon(task.priority)}
          <span
            className={cn(
              "hidden rounded-sm px-2 py-1 text-xs font-medium sm:inline-block",
              task.priorityColor
            )}
          >
            {task.priority}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Edit3 size={14} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hidden h-8 w-8 p-0 sm:flex"
          >
            <Archive size={14} />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal size={14} />
          </Button>
        </div>
      </div>
    </div>
  );

  const TaskSection = ({
    title,
    tasks: sectionTasks,
    color,
  }: {
    title: string;
    tasks: TTask[];
    color: string;
  }) => (
    <div className="space-y-3">
      <div className="grid grid-cols-[1fr_auto] items-center gap-4">
        <h2 className={cn("text-lg font-semibold", color)}>
          {title} ({sectionTasks.length})
        </h2>
        {sectionTasks.length > 0 && (
          <Button variant="ghost" size="sm" className="text-xs">
            View All
          </Button>
        )}
      </div>

      {sectionTasks.length > 0 ? (
        <div className="grid gap-2">
          {sectionTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          <Circle size={48} className="mx-auto mb-2 text-gray-300" />
          <p>No tasks in this section</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto]">
            <div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                My Tasks
              </h1>
              <p className="mt-1 text-sm text-gray-600 sm:text-base">
                Manage and track your tasks efficiently
              </p>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 sm:w-auto">
              <Plus size={16} className="mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
        {/* Filters and Search */}
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
            {/* Search */}
            <div className="relative">
              <Search
                size={16}
                className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
              />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-[auto_auto]">
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as
                      | "ALL"
                      | "IN PROGRESS"
                      | "TO DO"
                      | "UPCOMING"
                  )
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="ALL">All Status</option>
                <option value="IN PROGRESS">In Progress</option>
                <option value="TO DO">To Do</option>
                <option value="UPCOMING">Upcoming</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) =>
                  setPriorityFilter(
                    e.target.value as "ALL" | "High" | "Medium" | "Low"
                  )
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="ALL">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4">
            <div className="grid grid-cols-[1fr_auto] items-center gap-2">
              <div>
                <p className="text-xs text-gray-600 sm:text-sm">Total Tasks</p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {tasks.length}
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-2">
                <CheckCircle size={20} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4">
            <div className="grid grid-cols-[1fr_auto] items-center gap-2">
              <div>
                <p className="text-xs text-gray-600 sm:text-sm">In Progress</p>
                <p className="text-xl font-bold text-blue-600 sm:text-2xl">
                  {groupedTasks["IN PROGRESS"].length}
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-2">
                <Clock size={20} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4">
            <div className="grid grid-cols-[1fr_auto] items-center gap-2">
              <div>
                <p className="text-xs text-gray-600 sm:text-sm">To Do</p>
                <p className="text-xl font-bold text-gray-600 sm:text-2xl">
                  {groupedTasks["TO DO"].length}
                </p>
              </div>
              <div className="rounded-lg bg-gray-100 p-2">
                <Circle size={20} className="text-gray-600" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4">
            <div className="grid grid-cols-[1fr_auto] items-center gap-2">
              <div>
                <p className="text-xs text-gray-600 sm:text-sm">Completed</p>
                <p className="text-xl font-bold text-green-600 sm:text-2xl">
                  {completedTasks.size}
                </p>
              </div>
              <div className="rounded-lg bg-green-100 p-2">
                <CheckCircle size={20} className="text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Task Sections - Main Grid Container */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 xl:gap-8">
          <div className="xl:col-span-1">
            <TaskSection
              title="In Progress"
              tasks={groupedTasks["IN PROGRESS"]}
              color="text-blue-600"
            />
          </div>

          <div className="xl:col-span-1">
            <TaskSection
              title="To Do"
              tasks={groupedTasks["TO DO"]}
              color="text-gray-600"
            />
          </div>

          <div className="xl:col-span-1">
            <TaskSection
              title="Upcoming"
              tasks={groupedTasks["UPCOMING"]}
              color="text-orange-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTasksPage;
