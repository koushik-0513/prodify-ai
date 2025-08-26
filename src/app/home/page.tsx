"use client";

import DashboardHeader from "@/components/dashboard-header";
import TasksCard from "@/components/tasks-card";
import ProjectsCard from "@/components/projects-card";
import GoalsCard from "@/components/goals-card";
import ProjectOverviewCard from "@/components/project-overview-card";
import CalendarCard from "@/components/calendar-card";
import RemindersCard from "@/components/reminders-card";

const Home = () => {
    return (
        <div 
            className="min-h-screen pt-4 pb-3 lg:py-6 px-4 lg:px-9 bg-center lg:rounded-tl-3xl lg:border-l-2 lg:border-t-2 border-border overflow-x-hidden bg-prodify-light"
            style={{
                backgroundImage: `
                    linear-gradient(var(--color-prodify-light-alt) 2px, transparent 2px),
                    linear-gradient(90deg, var(--color-prodify-light-alt) 2px, transparent 2px)
                `,
                backgroundSize: '55px 55px'
            }}
        >
            <div className="max-w-screen mx-auto pt-0 mt-0 mb-4 lg:mb-7">
                <DashboardHeader />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-3 md:gap-4 lg:gap-4">
                <div className="space-y-3 sm:space-y-3 md:space-y-4 lg:space-y-4">
                    <TasksCard />
                    <GoalsCard />
                    <ProjectOverviewCard />
                </div>
                
                {/* Right Column */}
                <div className="space-y-3 sm:space-y-3 md:space-y-4 lg:space-y-4">
                    <ProjectsCard />
                    <CalendarCard />
                    <RemindersCard />
                </div>
            </div>
        </div>            
    )
};

export default Home;