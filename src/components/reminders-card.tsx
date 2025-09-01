"use client";

import { useState } from "react";

import {
  TReminder,
  TReminderExpandedSections,
  TReminderSection,
  TRemindersData,
} from "@/types/types";
import {
  Bell,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  EllipsisVertical,
  Trash2,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { initialReminders } from "@/data/data";

type ReminderSectionProps = {
  section: TReminderSection;
  reminders: TReminder[];
  isExpanded: boolean;
  expandedReminders: number[];
  onToggleSection: (section: TReminderSection) => void;
  onToggleReminder: (id: number) => void;
  onCompleteReminder: (section: TReminderSection, id: number) => void;
  onDeleteReminder: (section: TReminderSection, id: number) => void;
  handleReminderAlert: (id: number) => void;
};

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
          className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded p-1 transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="text-muted-foreground h-3 w-3 cursor-pointer sm:h-4 sm:w-4" />
          ) : (
            <ChevronDown className="text-muted-foreground h-3 w-3 cursor-pointer sm:h-4 sm:w-4" />
          )}
          <span className="text-foreground text-sm font-semibold">
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
              className="relative flex items-start justify-between sm:p-2.5"
            >
              <p className="text-md min-w-0 flex-1 truncate pr-2 leading-tight break-words">
                {reminder.text}
              </p>

              {/* Mobile: Ellipsis button */}
              <div className="ml-2 flex-shrink-0 sm:hidden">
                <button
                  className="hover:bg-accent cursor-pointer rounded-sm p-1 transition-colors"
                  onClick={() => onToggleReminder(reminder.id)}
                >
                  <EllipsisVertical size={16} className="text-foreground" />
                </button>
              </div>

              {/* Mobile: Expanded action buttons */}
              {expandedReminders.includes(reminder.id) && (
                <div className="bg-card border-border absolute right-4 z-10 mt-8 rounded-lg border p-2 shadow-lg sm:hidden">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleReminderAlert(reminder.id)}
                      className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-sm p-2 text-sm transition-colors"
                    >
                      <Bell size={16} className="text-foreground" />
                      <span>Remind</span>
                    </button>
                    <button
                      onClick={() => onDeleteReminder(section, reminder.id)}
                      className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-sm p-2 text-sm transition-colors"
                    >
                      <Trash2 size={16} className="text-foreground" />
                      <span>Delete</span>
                    </button>
                    <button
                      onClick={() => onCompleteReminder(section, reminder.id)}
                      className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-sm p-2 text-sm transition-colors"
                    >
                      <Check
                        size={16}
                        className={cn(
                          "rounded",
                          reminder.completed
                            ? "bg-accent-cyan text-white"
                            : "text-muted-foreground bg-gray-200"
                        )}
                      />
                      <span>{reminder.completed ? "Undo" : "Complete"}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Desktop: Always visible action buttons */}
              <div className="ml-2 hidden flex-shrink-0 items-center justify-center gap-4 sm:flex">
                <button
                  onClick={() => handleReminderAlert(reminder.id)}
                  className={cn(
                    "hover:bg-accent h-5 w-4 cursor-pointer rounded-sm bg-white transition-colors"
                  )}
                  title="Set reminder alert"
                >
                  <Bell size={16} className="text-foreground" />
                </button>
                <button
                  onClick={() => onDeleteReminder(section, reminder.id)}
                  className={cn(
                    "hover:bg-accent h-5 w-4 cursor-pointer rounded-sm bg-white transition-colors"
                  )}
                  title="Delete reminder"
                >
                  <Trash2 size={16} className="text-foreground" />
                </button>
                <button
                  onClick={() => onCompleteReminder(section, reminder.id)}
                  className={cn(
                    "flex h-5 w-5 cursor-pointer items-center justify-center rounded-xl transition-colors",
                    reminder.completed
                      ? "bg-accent-cyan hover:bg-accent-cyan-alt"
                      : "bg-gray-200 hover:bg-gray-300"
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
                </button>
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
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
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
          : reminder
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
    <div className="bg-card border-border rounded-2xl border p-3 sm:p-4 lg:p-7">
      <div className="mb-3 ml-1 flex items-center gap-2 sm:mb-4">
        <Clock className="text-prodify-primary size-4 sm:size-5" />
        <h2 className="text-base font-medium sm:text-lg">Reminders</h2>
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
