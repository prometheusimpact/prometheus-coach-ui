import { useState } from "react";
import { LayoutDashboard, Compass, Bookmark, Users, UserPlus, Calendar, Mail } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

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
  const [open, setOpen] = useState(false);

  return (
    <motion.aside
      className="hidden lg:flex flex-col glass border-r border-glass-border fixed left-0 top-0 h-screen py-6 z-50"
      animate={{
        width: open ? "240px" : "80px",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Logo */}
      <div className="flex items-center px-6 mb-8">
        <img src={logo} alt="Prometheus Coach" className="w-10 h-10 object-contain flex-shrink-0" />
        <motion.span
          animate={{
            opacity: open ? 1 : 0,
            display: open ? "inline-block" : "none",
          }}
          className="ml-3 font-heading text-lg font-bold text-foreground whitespace-nowrap"
        >
          Prometheus
        </motion.span>
      </div>
      
      {/* Navigation Icons */}
      <nav className="flex flex-col gap-2 flex-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl transition-smooth
                ${item.active 
                  ? 'bg-primary text-primary-foreground glow-orange' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }
              `}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <motion.span
                animate={{
                  opacity: open ? 1 : 0,
                  display: open ? "inline-block" : "none",
                }}
                className="text-sm font-medium whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            </button>
          );
        })}
      </nav>
    </motion.aside>
  );
};
