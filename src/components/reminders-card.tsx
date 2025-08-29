"use client";

import { Clock, Bell, Trash2, Check, ChevronUp, ChevronDown, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { initialReminders } from "@/data/data";
import { TReminder, TReminderExpandedSections, TReminderSection, TRemindersData } from "@/types/types";


export const RemindersCard = () => {
    const [reminders, setReminders] = useState(initialReminders);
    const [expandedReminders, setExpandedReminders] = useState<number[]>([]);
    const [expandedSections, setExpandedSections] = useState<TReminderExpandedSections>({
        today: true,
        tomorrow: false,
        dayAfter: false
    });

    const toggleReminder = (id: number) => {
        setExpandedReminders(prev => 
            prev.includes(id) 
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const toggleSection = (section: TReminderSection) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const completeReminder = (section: TReminderSection, id: number) => {
        setReminders((prev: TRemindersData) => ({
            ...prev,
            [section]: prev[section].map(reminder =>
                reminder.id === id 
                    ? { ...reminder, completed: !reminder.completed }
                    : reminder
            )
        }));
        // Close mobile menu
        setExpandedReminders(prev => prev.filter(i => i !== id));
    };

    const deleteReminder = (section: TReminderSection, id: number) => {
        setReminders((prev: TRemindersData) => ({
            ...prev,
            [section]: prev[section].filter(reminder => reminder.id !== id)
        }));
        // Close mobile menu
        setExpandedReminders(prev => prev.filter(i => i !== id));
    };

    const setReminderAlert = (id: number) => {
        alert(`Reminder alert set for reminder ID: ${id}`);
        // Close mobile menu
        setExpandedReminders(prev => prev.filter(i => i !== id));
    };

    const getSectionTitle = (section: TReminderSection) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfter = new Date(today);
        dayAfter.setDate(dayAfter.getDate() + 2);

        const formatDate = (date: Date) => {
            return date.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
            });
        };

        switch(section) {
            case 'today': return `Today ${formatDate(today)}`;
            case 'tomorrow': return `Tomorrow ${formatDate(tomorrow)}`;
            case 'dayAfter': return formatDate(dayAfter);
        }
    };

    const renderReminderSection = (section: TReminderSection, sectionReminders: TReminder[]) => {
        const completedCount = sectionReminders.filter(r => r.completed).length;
        const totalCount = sectionReminders.length;
        
        return (
            <div key={section} className="space-y-2">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => toggleSection(section)}
                        className="flex items-center gap-2 hover:bg-accent p-1 rounded transition-colors"
                    >
                        {expandedSections[section] ? (
                            <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                        ) : (
                            <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                        )}
                        <span className="text-xs sm:text-sm font-semibold text-foreground">
                            {getSectionTitle(section)} 
                            <span className="text-muted-foreground"> • {completedCount}/{totalCount}</span>
                        </span>
                    </button>
                </div>

                {expandedSections[section] && (
                    <div className="space-y-2 ml-4 md:ml-0">
                        {sectionReminders.map((reminder) => (
                            <div key={reminder.id} className="flex items-start justify-between sm:p-2.5 relative">
                                <p className={`text-md flex-1 pr-2 break-words leading-tight min-w-0`}>
                                    {reminder.text}
                                </p>
                                
                                {/* Mobile: Ellipsis button */}
                                <div className="sm:hidden flex-shrink-0 ml-2">
                                    <button 
                                        className="p-1 hover:bg-accent rounded-sm transition-colors"
                                        onClick={() => toggleReminder(reminder.id)}
                                    >
                                        <EllipsisVertical size={16} className="text-muted-foreground" />
                                    </button>
                                </div>

                                {/* Mobile: Expanded action buttons */}
                                {expandedReminders.includes(reminder.id) && (
                                    <div className="sm:hidden absolute right-4 mt-8 bg-card border border-border rounded-lg shadow-lg p-2 z-10">
                                        <div className="flex flex-col gap-2">
                                            <button 
                                                onClick={() => setReminderAlert(reminder.id)}
                                                className="flex items-center gap-2 p-2 hover:bg-accent rounded-sm transition-colors text-sm"
                                            >
                                                <Bell size={16} className="text-muted-foreground" />
                                                <span>Remind</span>
                                            </button>
                                            <button 
                                                onClick={() => deleteReminder(section, reminder.id)}
                                                className="flex items-center gap-2 p-2 hover:bg-accent rounded-sm transition-colors text-sm"
                                            >
                                                <Trash2 size={16} className="text-muted-foreground" />
                                                <span>Delete</span>
                                            </button>
                                            <button 
                                                onClick={() => completeReminder(section, reminder.id)}
                                                className="flex items-center gap-2 p-2 hover:bg-accent rounded-sm transition-colors text-sm"
                                            >
                                                <Check 
                                                    size={16} 
                                                    className={`rounded ${reminder.completed ? "text-white bg-accent-cyan" : "text-muted-foreground bg-gray-200"}`} 
                                                />
                                                <span>{reminder.completed ? 'Undo' : 'Complete'}</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Desktop: Always visible action buttons */}
                                <div className="hidden sm:flex items-center gap-4 flex-shrink-0 ml-2">
                                    <button 
                                        onClick={() => setReminderAlert(reminder.id)}
                                        className="p-1 hover:bg-accent rounded-sm transition-colors"
                                        title="Set reminder alert"
                                    >
                                        <Bell size={16} className="text-muted-foreground" />
                                    </button>
                                    <button 
                                        onClick={() => deleteReminder(section, reminder.id)}
                                        className="p-1 hover:bg-accent rounded-sm transition-colors"
                                        title="Delete reminder"
                                    >
                                        <Trash2 size={16} className="text-muted-foreground" />
                                    </button>
                                    <button 
                                        onClick={() => completeReminder(section, reminder.id)}
                                        className={`p-0.5 rounded-xl transition-colors ${
                                            reminder.completed 
                                                ? "bg-accent-cyan hover:bg-accent-cyan-alt" 
                                                : "bg-gray-200 hover:bg-gray-300"
                                        }`}
                                        title={reminder.completed ? 'Mark as incomplete' : 'Mark as complete'}
                                    >
                                        <Check 
                                            size={16} 
                                            className={reminder.completed ? 'text-white' : 'text-muted-foreground'} 
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

    return (
        <div className="bg-card p-3 sm:p-4 lg:p-7 rounded-2xl border border-border">
            <div className="flex items-center gap-2 mb-3 sm:mb-4 ml-1">
                <Clock className="size-4 sm:size-5 text-prodify-primary" />
                <h2 className="text-base sm:text-lg font-medium">Reminders</h2>
            </div>

            <div className="space-y-4">
                {renderReminderSection('today', reminders.today)}
                {renderReminderSection('tomorrow', reminders.tomorrow)}
                {renderReminderSection('dayAfter', reminders.dayAfter)}
            </div>
        </div>
    );
};

