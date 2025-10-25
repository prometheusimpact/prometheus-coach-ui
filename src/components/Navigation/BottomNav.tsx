import { LayoutDashboard, Compass, Bookmark, Users, Mail, Settings, User } from "lucide-react";

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
  { icon: Settings, label: "Settings" },
  { icon: User, label: "Account" },
];

export const BottomNav = () => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass border-t border-glass-border z-50">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`
                flex flex-col items-center justify-center gap-1 transition-smooth
                ${item.active 
                  ? 'text-primary' 
                  : 'dark:text-white text-muted-foreground'
                }
              `}
              aria-label={item.label}
            >
              <Icon className={`w-5 h-5 ${item.active ? 'glow-orange' : ''}`} />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
