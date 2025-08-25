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
            className="min-h-screen bg-white-50 py-6 lg:px-9 px-6  bg-center lg:rounded-tl-3xl border-l-2 border-t-2 border-black-800 overflow-x-hidden"
            style={{
                backgroundImage: `
                    linear-gradient(#F0EFF6 1px, transparent 1px),
                    linear-gradient(90deg, #F0EFF6 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                backgroundColor: '#FAF9FE'
            }}
        >
                {/* Header */}
                <div className="max-w-screen mx-auto mb-7 pt-3">
                    <DashboardHeader />
                </div>
                
                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-3 md:gap-4 lg:gap-4">
                    {/* Left Column */}
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