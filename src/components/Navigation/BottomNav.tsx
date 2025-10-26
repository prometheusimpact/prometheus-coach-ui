import { LayoutDashboard, Compass, Bookmark, Users, Calendar, Mail, Settings, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Compass, label: "Explore", path: "/explore" },
  { icon: Bookmark, label: "Saved", path: "/saved" },
  { icon: Calendar, label: "Calendar", path: "/calendar" },
  { icon: Users, label: "Clients", path: "/clients" },
  { icon: Mail, label: "Inbox", path: "/inbox" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: User, label: "Account", path: "/account" },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass border-t border-glass-border z-50">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`
                flex flex-col items-center justify-center gap-1 transition-smooth
                ${isActive 
                  ? 'text-primary' 
                  : 'dark:text-white text-muted-foreground'
                }
              `}
              aria-label={item.label}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'glow-orange' : ''}`} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
