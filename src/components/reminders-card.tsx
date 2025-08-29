"use client";

import {
  Clock,
  Bell,
  Trash2,
  Check,
  ChevronUp,
  ChevronDown,
  EllipsisVertical,
} from "lucide-react";
import { useState } from "react";
import { initialReminders } from "@/data/data";
import {
  TReminder,
  TReminderExpandedSections,
  TReminderSection,
  TRemindersData,
} from "@/types/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface ReminderSectionProps {
  section: TReminderSection;
  reminders: TReminder[];
  isExpanded: boolean;
  expandedReminders: number[];
  onToggleSection: (section: TReminderSection) => void;
  onToggleReminder: (id: number) => void;
  onCompleteReminder: (section: TReminderSection, id: number) => void;
  onDeleteReminder: (section: TReminderSection, id: number) => void;
  handleReminderAlert: (id: number) => void;
}

const ReminderSection = ({
  section,
  reminders,
  isExpanded,
  expandedReminders,
  onToggleSection,
  onToggleReminder,
  onCompleteReminder,
  onDeleteReminder,
  handleReminderAlert,
}: ReminderSectionProps) => {
  const completedCount = reminders.filter((r) => r.completed).length;
  const totalCount = reminders.length;

  const getSectionTitle = (section: TReminderSection) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    };

    switch (section) {
      case "today":
        return `Today ${formatDate(today)}`;
      case "tomorrow":
        return `Tomorrow ${formatDate(tomorrow)}`;
      case "dayAfter":
        return formatDate(dayAfter);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <button
          onClick={() => onToggleSection(section)}
          className="flex items-center gap-2 hover:bg-accent p-1 rounded transition-colors cursor-pointer"
        >
          {isExpanded ? (
            <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground cursor-pointer" />
          ) : (
            <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground cursor-pointer" />
          )}
          <span className="text-sm font-semibold text-foreground">
            {getSectionTitle(section)}
            <span className="text-muted-foreground">
              {" "}
              • {completedCount}/{totalCount}
            </span>
          </span>
        </button>
      </div>

      {isExpanded && (
        <div className="ml-4 md:ml-0">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex items-start justify-between sm:p-2.5 relative"
            >
              <p className="text-md flex-1 pr-2 break-words leading-tight min-w-0">
                {reminder.text}
              </p>

              {/* Mobile: Ellipsis button */}
              <div className="sm:hidden flex-shrink-0 ml-2">
                <button
                  className="p-1 hover:bg-accent rounded-sm transition-colors cursor-pointer"
                  onClick={() => onToggleReminder(reminder.id)}
                >
                  <EllipsisVertical size={16} className="text-foreground" />
                </button>
              </div>

              {/* Mobile: Expanded action buttons */}
              {expandedReminders.includes(reminder.id) && (
                <div className="sm:hidden absolute right-4 mt-8 bg-card border border-border rounded-lg shadow-lg p-2 z-10">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleReminderAlert(reminder.id)}
                      className="flex items-center gap-2 p-2 hover:bg-accent rounded-sm transition-colors text-sm cursor-pointer"
                    >
                      <Bell size={16} className="text-foreground" />
                      <span>Remind</span>
                    </button>
                    <button
                      onClick={() => onDeleteReminder(section, reminder.id)}
                      className="flex items-center gap-2 p-2 hover:bg-accent rounded-sm transition-colors text-sm cursor-pointer"
                    >
                      <Trash2 size={16} className="text-foreground" />
                      <span>Delete</span>
                    </button>
                    <button
                      onClick={() => onCompleteReminder(section, reminder.id)}
                      className="flex items-center gap-2 p-2 hover:bg-accent rounded-sm transition-colors text-sm cursor-pointer"
                    >
                      <Check
                        size={16}
                        className={cn(
                          "rounded",
                          reminder.completed
                            ? "text-white bg-accent-cyan"
                            : "text-muted-foreground bg-gray-200",
                        )}
                      />
                      <span>{reminder.completed ? "Undo" : "Complete"}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Desktop: Always visible action buttons */}
              <div className="hidden sm:flex items-center justify-center gap-4 flex-shrink-0 ml-2">
                <Button
                  onClick={() => handleReminderAlert(reminder.id)}
                  className={cn(
                    "hover:bg-accent rounded-sm transition-colors cursor-pointer bg-white h-5 w-4",
                  )}
                  title="Set reminder alert"
                >
                  <Bell size={16} className="text-foreground" />
                </Button>
                <Button
                  onClick={() => onDeleteReminder(section, reminder.id)}
                  className={cn(
                    "hover:bg-accent rounded-sm transition-colors cursor-pointer bg-white h-5 w-4",
                  )}
                  title="Delete reminder"
                >
                  <Trash2 size={16} className="text-foreground" />
                </Button>
                <Button
                  onClick={() => onCompleteReminder(section, reminder.id)}
                  className={cn(
                    "rounded-md transition-colors cursor-pointer h-5 w-4",
                    reminder.completed
                      ? "bg-accent-cyan hover:bg-accent-cyan-alt"
                      : "bg-gray-200 hover:bg-gray-300",
                  )}
                  title={
                    reminder.completed
                      ? "Mark as incomplete"
                      : "Mark as complete"
                  }
                >
                  <Check
                    size={16}
                    className={
                      reminder.completed
                        ? "text-white"
                        : "text-muted-foreground"
                    }
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const RemindersCard = () => {
  const [reminders, setReminders] = useState(initialReminders);
  const [expandedReminders, setExpandedReminders] = useState<number[]>([]);
  const [expandedSections, setExpandedSections] =
    useState<TReminderExpandedSections>({
      today: true,
      tomorrow: false,
      dayAfter: false,
    });

  const toggleReminder = (id: number) => {
    setExpandedReminders((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSection = (section: TReminderSection) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const completeReminder = (section: TReminderSection, id: number) => {
    setReminders((prev: TRemindersData) => ({
      ...prev,
      [section]: prev[section].map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder,
      ),
    }));
    // Close mobile menu
    setExpandedReminders((prev) => prev.filter((i) => i !== id));
  };

  const deleteReminder = (section: TReminderSection, id: number) => {
    setReminders((prev) => ({
      ...prev,
      [section]: prev[section].filter((reminder) => reminder.id !== id),
    }));
    // Close mobile menu
    setExpandedReminders((prev) => prev.filter((i) => i !== id));
  };

  const handleReminderAlert = (id: number) => {
    alert(`Reminder alert set for reminder ID: ${id}`);
    // Close mobile menu
    setExpandedReminders((prev) => prev.filter((i) => i !== id));
  };

  const sectionConfigs = [
    {
      section: "today" as TReminderSection,
      reminders: reminders.today,
    },
    {
      section: "tomorrow" as TReminderSection,
      reminders: reminders.tomorrow,
    },
    {
      section: "dayAfter" as TReminderSection,
      reminders: reminders.dayAfter,
    },
  ];

  return (
    <div className="bg-card p-3 sm:p-4 lg:p-7 rounded-2xl border border-border">
      <div className="flex items-center gap-2 mb-3 sm:mb-4 ml-1">
        <Clock className="size-4 sm:size-5 text-prodify-primary" />
        <h2 className="text-base sm:text-lg font-medium">Reminders</h2>
      </div>

      <div className="space-y-4">
        {sectionConfigs.map((config) => (
          <ReminderSection
            key={config.section}
            section={config.section}
            reminders={config.reminders}
            isExpanded={expandedSections[config.section]}
            expandedReminders={expandedReminders}
            onToggleSection={toggleSection}
            onToggleReminder={toggleReminder}
            onCompleteReminder={completeReminder}
            onDeleteReminder={deleteReminder}
            handleReminderAlert={handleReminderAlert}
          />
        ))}
      </div>
    </div>
  );
};
