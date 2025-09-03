import { CalendarCard } from "@/components/calendar-card";
import { DashboardHeader } from "@/components/dashboard-header";
import { GoalsCard } from "@/components/goals-card";
import { ProjectOverviewCard } from "@/components/project-overview-card";
import { ProjectsCard } from "@/components/projects-card";
import { RemindersCard } from "@/components/reminders-card";
import { TasksCard } from "@/components/tasks-card";

const Home = () => {
  return (
    <div className="border-border bg-prodify-light grid-pattern min-h-screen overflow-x-hidden bg-center px-4 pt-4 pb-3 md:px-6 md:py-4 lg:rounded-tl-3xl lg:border-t-2 lg:border-l-2 lg:px-9 lg:py-6">
      <div className="mx-auto mt-0 mb-4 max-w-screen pt-0 md:mb-5 lg:mb-7">
        <DashboardHeader />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-3 md:grid-cols-1 md:gap-4 lg:grid-cols-2 lg:gap-4">
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
  );
};

export default Home;
