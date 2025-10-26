import { Sidebar } from "@/components/Navigation/Sidebar";
import { BottomNav } from "@/components/Navigation/BottomNav";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import gradientBg from "@/assets/gradient-bg.jpg";
import gradientBgDark from "@/assets/gradient-bg-dark.png";
import { EventManager, type Event } from "@/components/ui/event-manager";

// Demo events with realistic data
const demoEvents: Event[] = [
  {
    id: "1",
    title: "Team Standup",
    description: "Daily sync with the engineering team to discuss progress and blockers",
    startTime: new Date(2025, 9, 20, 9, 0),
    endTime: new Date(2025, 9, 20, 9, 30),
    color: "blue",
    category: "Meeting",
    attendees: ["Alice", "Bob", "Charlie"],
    tags: ["Work", "Team"],
  },
  {
    id: "2",
    title: "Product Design Review",
    description: "Review new mockups for the dashboard redesign with stakeholders",
    startTime: new Date(2025, 9, 20, 14, 0),
    endTime: new Date(2025, 9, 20, 15, 30),
    color: "purple",
    category: "Meeting",
    attendees: ["Sarah", "Mike"],
    tags: ["Important", "Client"],
  },
  {
    id: "3",
    title: "Code Review",
    description: "Review pull requests for the authentication feature",
    startTime: new Date(2025, 9, 21, 10, 0),
    endTime: new Date(2025, 9, 21, 11, 0),
    color: "green",
    category: "Task",
    tags: ["Work", "Urgent"],
  },
  {
    id: "4",
    title: "Client Presentation",
    description: "Present Q4 roadmap and feature updates to key stakeholders",
    startTime: new Date(2025, 9, 22, 15, 0),
    endTime: new Date(2025, 9, 22, 16, 30),
    color: "orange",
    category: "Meeting",
    attendees: ["John", "Emma", "David"],
    tags: ["Important", "Client"],
  },
  {
    id: "5",
    title: "Gym Session",
    description: "Evening workout at the fitness center",
    startTime: new Date(2025, 9, 20, 18, 0),
    endTime: new Date(2025, 9, 20, 19, 0),
    color: "pink",
    category: "Personal",
    tags: ["Personal"],
  },
  {
    id: "6",
    title: "Sprint Planning",
    description: "Plan tasks and estimate story points for the upcoming sprint",
    startTime: new Date(2025, 9, 23, 10, 0),
    endTime: new Date(2025, 9, 23, 12, 0),
    color: "blue",
    category: "Meeting",
    attendees: ["Team"],
    tags: ["Work", "Team", "Important"],
  },
  {
    id: "7",
    title: "Doctor Appointment",
    description: "Annual health checkup at City Medical Center",
    startTime: new Date(2025, 9, 24, 11, 0),
    endTime: new Date(2025, 9, 24, 12, 0),
    color: "red",
    category: "Personal",
    tags: ["Personal", "Important"],
  },
  {
    id: "8",
    title: "Deploy to Production",
    description: "Deploy version 2.5.0 with new features and bug fixes",
    startTime: new Date(2025, 9, 25, 16, 0),
    endTime: new Date(2025, 9, 25, 17, 0),
    color: "green",
    category: "Task",
    tags: ["Work", "Urgent"],
  },
  {
    id: "9",
    title: "Coffee with Sarah",
    description: "Catch up over coffee at the new cafe downtown",
    startTime: new Date(2025, 9, 26, 15, 0),
    endTime: new Date(2025, 9, 26, 16, 0),
    color: "pink",
    category: "Personal",
    tags: ["Personal"],
  },
  {
    id: "10",
    title: "Budget Review",
    description: "Quarterly budget review with finance team",
    startTime: new Date(2025, 9, 27, 13, 0),
    endTime: new Date(2025, 9, 27, 14, 30),
    color: "orange",
    category: "Meeting",
    attendees: ["Finance Team"],
    tags: ["Work", "Important"],
  },
];

const Calendar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div 
      className="min-h-screen flex w-full"
      style={{
        backgroundImage: `url(${theme === "dark" ? gradientBgDark : gradientBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Sidebar />
      
      <main className="flex-1 lg:ml-20 pb-20 lg:pb-0">
        <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-10 max-w-7xl">
          {/* Header with Title and Theme Toggle */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold">Calendar</h1>
            
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="glass w-10 h-10 rounded-xl flex items-center justify-center transition-smooth hover:bg-primary hover:text-primary-foreground"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Calendar Content - EventManager */}
          <EventManager
            events={demoEvents}
            onEventCreate={(event) => console.log("Created:", event)}
            onEventUpdate={(id, event) => console.log("Updated:", id, event)}
            onEventDelete={(id) => console.log("Deleted:", id)}
            categories={["Meeting", "Task", "Reminder", "Personal"]}
            availableTags={["Important", "Urgent", "Work", "Personal", "Team", "Client"]}
            defaultView="month"
          />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Calendar;
