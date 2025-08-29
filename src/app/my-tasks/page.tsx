"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Clock,
  CheckCircle,
  Circle,
  AlertCircle,
  MoreHorizontal,
  Edit3,
  Archive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tasks } from "@/data/data";
import { TTask } from "@/types/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "IN PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "TO DO":
        return "bg-gray-100 text-gray-800";
      case "UPCOMING":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const TaskItem = ({ task }: { task: TTask }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 flex-1">
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

        <div className="flex-1 min-w-0">
          <Link
            className={cn(
              "font-medium text-gray-900 truncate",
              completedTasks.has(task.id) && "line-through text-gray-500",
            )}
            href={`/my-tasks/${task.id}`}
          >
            {task.name}
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={cn(
                "text-xs px-2 py-1 rounded-full",
                getStatusColor(task.status),
              )}
            >
              {task.status}
            </span>
            <span className="text-xs text-gray-500">•</span>
            <span className={cn("text-xs", task.dueDateColor)}>
              {task.dueDate}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {getPriorityIcon(task.priority)}
          <span
            className={cn(
              "text-xs px-2 py-1 rounded-sm font-medium",
              task.priorityColor,
            )}
          >
            {task.priority}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Edit3 size={14} />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
      <div className="flex items-center justify-between">
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
        <div className="space-y-2">
          {sectionTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Circle size={48} className="mx-auto mb-2 text-gray-300" />
          <p>No tasks in this section</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
              <p className="text-gray-600 mt-1">
                Manage and track your tasks efficiently
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as
                      | "ALL"
                      | "IN PROGRESS"
                      | "TO DO"
                      | "UPCOMING",
                  )
                }
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Status</option>
                <option value="IN PROGRESS">In Progress</option>
                <option value="TO DO">To Do</option>
                <option value="UPCOMING">Upcoming</option>
              </select>

              {/* Priority Filter */}
              <select
                value={priorityFilter}
                onChange={(e) =>
                  setPriorityFilter(
                    e.target.value as "ALL" | "High" | "Medium" | "Low",
                  )
                }
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tasks.length}
                </p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <CheckCircle size={20} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">
                  {groupedTasks["IN PROGRESS"].length}
                </p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Clock size={20} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">To Do</p>
                <p className="text-2xl font-bold text-gray-600">
                  {groupedTasks["TO DO"].length}
                </p>
              </div>
              <div className="bg-gray-100 p-2 rounded-lg">
                <Circle size={20} className="text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {completedTasks.size}
                </p>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle size={20} className="text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Task Sections */}
        <div className="space-y-8">
          <TaskSection
            title="In Progress"
            tasks={groupedTasks["IN PROGRESS"]}
            color="text-blue-600"
          />
          <TaskSection
            title="To Do"
            tasks={groupedTasks["TO DO"]}
            color="text-gray-600"
          />
          <TaskSection
            title="Upcoming"
            tasks={groupedTasks["UPCOMING"]}
            color="text-orange-600"
          />
        </div>
      </div>
    </div>
  );
};

export default MyTasksPage;
