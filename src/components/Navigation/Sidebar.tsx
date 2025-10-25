import { LayoutDashboard, Compass, Bookmark, Users, UserPlus, Calendar, Mail } from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Compass, label: "Explore" },
  { icon: Bookmark, label: "Saved" },
  { icon: Users, label: "Clients" },
  { icon: UserPlus, label: "Requests" },
  { icon: Calendar, label: "Calendar" },
  { icon: Mail, label: "Inbox" },
];

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col items-center w-20 h-screen glass border-r border-glass-border fixed left-0 top-0 py-6 gap-6">
      {/* Logo */}
      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-orange">
        <span className="text-primary-foreground font-heading text-xl font-bold">P</span>
      </div>
      
      {/* Navigation Icons */}
      <nav className="flex flex-col gap-4 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center transition-smooth
                ${item.active 
                  ? 'bg-primary text-primary-foreground glow-orange' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }
              `}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
