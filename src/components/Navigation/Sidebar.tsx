import { useState } from "react";
import { LayoutDashboard, Compass, Bookmark, Users, UserPlus, Calendar, Mail, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logoIcon from "@/assets/logo.png";
import logoFull from "@/assets/logo-full.png";
import logoWhite from "@/assets/logo-white.png";
import profileImage from "@/assets/profile-coachdan.png";

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
  { icon: Settings, label: "Settings" },
];

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

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
      <div className="flex items-center px-6 mb-8 overflow-hidden">
        <motion.img
          src={open ? (theme === "dark" ? logoWhite : logoFull) : logoIcon}
          alt="Prometheus Coach"
          animate={{
            width: open ? "160px" : "40px",
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="h-auto object-contain"
        />
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
                  : 'dark:text-white text-muted-foreground hover:text-foreground hover:bg-secondary'
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

      {/* Profile Section */}
      <button
        className="flex items-center gap-3 px-3 py-3 mx-3 mb-3 rounded-xl transition-smooth dark:text-white text-muted-foreground hover:bg-background/60 glass"
        aria-label="My Account"
      >
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={profileImage} alt="CoachDan" />
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
        <motion.div
          animate={{
            opacity: open ? 1 : 0,
            display: open ? "flex" : "none",
          }}
          className="flex flex-col items-start"
        >
          <span className="text-sm font-medium whitespace-nowrap">CoachDan</span>
          <span className="text-xs text-muted-foreground">My Account</span>
        </motion.div>
      </button>
    </motion.aside>
  );
};
