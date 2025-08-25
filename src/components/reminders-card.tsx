"use client";

import { Clock, Bell, Trash2, Check, ChevronUp, ChevronDown, EllipsisVertical } from "lucide-react";
import { useState } from "react";

// Color palette
const colors = {
    primary: {
        icon: "#736FC3",
        accent: "#34D1CB"
    },
    text: {
        primary: "text-gray-900",
        secondary: "text-gray-700",
        muted: "text-gray-500",
        light: "text-gray-400"
    },
    background: {
        white: "bg-white",
        hover: "hover:bg-gray-50",
        hoverButton: "hover:bg-gray-100",
        hoverLight: "hover:bg-gray-200",
        hoverDark: "hover:bg-gray-300",
        accent: "bg-[#34D1CB]",
        accentHover: "hover:bg-[#2BB8B3]",
        gray: "bg-gray-200"
    },
    border: {
        default: "border-gray-200"
    },
    complete: {
        checked: "text-white bg-[#34D1CB]",
        unchecked: "text-gray-400 bg-[#34D1CB]"
    }
};

const initialReminders = {
    today: [
        { id: 1, text: "Assess any new risks identified in the morning meeting.", completed: false },
        { id: 2, text: "Outline key points for tomorrow's stand-up meeting.", completed: false },
        { id: 3, text: "Review and approve quarterly budget proposals.", completed: false },
        { id: 4, text: "Call client about contract renewal discussion.", completed: false },
        { id: 5, text: "Update project timeline in management system.", completed: false }
    ],
    tomorrow: [
        { id: 6, text: "Prepare presentation slides for board meeting.", completed: false },
        { id: 7, text: "Schedule team building activity for next month.", completed: false },
        { id: 8, text: "Review candidate resumes for developer position.", completed: false }
    ],
    dayAfter: [
        { id: 9, text: "Submit expense reports for business trip.", completed: false },
        { id: 10, text: "Follow up on pending vendor negotiations.", completed: false },
        { id: 11, text: "Conduct performance review with Sarah.", completed: false },
        { id: 12, text: "Finalize marketing campaign for Q4 launch.", completed: false }
    ]
};

const RemindersCard = () => {
    const [reminders, setReminders] = useState(initialReminders);
    const [expandedReminders, setExpandedReminders] = useState<number[]>([]);
    const [expandedSections, setExpandedSections] = useState({
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

    const toggleSection = (section: 'today' | 'tomorrow' | 'dayAfter') => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const completeReminder = (section: 'today' | 'tomorrow' | 'dayAfter', id: number) => {
        setReminders(prev => ({
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

    const deleteReminder = (section: 'today' | 'tomorrow' | 'dayAfter', id: number) => {
        setReminders(prev => ({
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

    const getSectionTitle = (section: 'today' | 'tomorrow' | 'dayAfter') => {
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

    const renderReminderSection = (section: 'today' | 'tomorrow' | 'dayAfter', sectionReminders: typeof initialReminders.today) => {
        const completedCount = sectionReminders.filter(r => r.completed).length;
        const totalCount = sectionReminders.length;
        
        return (
            <div key={section} className="space-y-2">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => toggleSection(section)}
                        className={`flex items-center gap-2 ${colors.background.hover} p-1 rounded transition-colors`}
                    >
                        {expandedSections[section] ? (
                            <ChevronDown className={`h-3 w-3 sm:h-4 sm:w-4 ${colors.text.muted}`} />
                        ) : (
                            <ChevronUp className={`h-3 w-3 sm:h-4 sm:w-4 ${colors.text.muted}`} />
                        )}
                        <span className={`text-xs sm:text-sm font-semibold ${colors.text.secondary}`}>
                            {getSectionTitle(section)} 
                            <span className={colors.text.light}> • {completedCount}/{totalCount}</span>
                        </span>
                    </button>
                </div>

                {expandedSections[section] && (
                    <div className="space-y-2 ml-4">
                        {sectionReminders.map((reminder) => (
                            <div key={reminder.id} className="flex items-start justify-between sm:p-2.5 relative">
                                <p className={`text-md flex-1 pr-2 break-words leading-tight min-w-0 ${colors.text.primary}`}>
                                    {reminder.text}
                                </p>
                                
                                {/* Mobile: Ellipsis button */}
                                <div className="sm:hidden flex-shrink-0 ml-2">
                                    <button 
                                        className={`p-1 ${colors.background.hoverLight} rounded-sm transition-colors`}
                                        onClick={() => toggleReminder(reminder.id)}
                                    >
                                        <EllipsisVertical size={16} className={colors.text.muted} />
                                    </button>
                                </div>

                                {/* Mobile: Expanded action buttons */}
                                {expandedReminders.includes(reminder.id) && (
                                    <div className={`sm:hidden absolute right-4 mt-8 ${colors.background.white} border ${colors.border.default} rounded-lg shadow-lg p-2 z-10`}>
                                        <div className="flex flex-col gap-2">
                                            <button 
                                                onClick={() => setReminderAlert(reminder.id)}
                                                className={`flex items-center gap-2 p-2 ${colors.background.hoverButton} rounded-sm transition-colors text-sm`}
                                            >
                                                <Bell size={16} className={colors.text.muted} />
                                                <span>Remind</span>
                                            </button>
                                            <button 
                                                onClick={() => deleteReminder(section, reminder.id)}
                                                className={`flex items-center gap-2 p-2 ${colors.background.hoverButton} rounded-sm transition-colors text-sm`}
                                            >
                                                <Trash2 size={16} className={colors.text.muted} />
                                                <span>Delete</span>
                                            </button>
                                            <button 
                                                onClick={() => completeReminder(section, reminder.id)}
                                                className={`flex items-center gap-2 p-2 ${colors.background.hoverButton} rounded-sm transition-colors text-sm`}
                                            >
                                                <Check 
                                                    size={16} 
                                                    className={`rounded ${reminder.completed ? colors.complete.checked : colors.complete.unchecked}`} 
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
                                        className={`p-1 ${colors.background.hoverLight} rounded-sm transition-colors`}
                                        title="Set reminder alert"
                                    >
                                        <Bell size={16} className={colors.text.muted} />
                                    </button>
                                    <button 
                                        onClick={() => deleteReminder(section, reminder.id)}
                                        className={`p-1 ${colors.background.hoverLight} rounded-sm transition-colors`}
                                        title="Delete reminder"
                                    >
                                        <Trash2 size={16} className={colors.text.muted} />
                                    </button>
                                    <button 
                                        onClick={() => completeReminder(section, reminder.id)}
                                        className={`p-0.5 rounded-xl transition-colors ${
                                            reminder.completed 
                                                ? `${colors.background.accent} ${colors.background.accentHover}` 
                                                : `${colors.background.gray} ${colors.background.hoverDark}`
                                        }`}
                                        title={reminder.completed ? 'Mark as incomplete' : 'Mark as complete'}
                                    >
                                        <Check 
                                            size={16} 
                                            className={reminder.completed ? 'text-white' : colors.text.muted} 
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
        <div className={`${colors.background.white} p-3 sm:p-4 lg:p-7 rounded-2xl border ${colors.border.default}`}>
            <div className="flex items-center gap-2 mb-3 sm:mb-4 ml-1">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: colors.primary.icon }} />
                <h2 className={`text-base sm:text-lg font-medium ${colors.text.primary}`}>Reminders</h2>
            </div>

            <div className="space-y-4">
                {renderReminderSection('today', reminders.today)}
                {renderReminderSection('tomorrow', reminders.tomorrow)}
                {renderReminderSection('dayAfter', reminders.dayAfter)}
            </div>
        </div>
    );
};

export default RemindersCard;