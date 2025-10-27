import { useState } from "react";
import { LayoutDashboard, Compass, Bookmark, Users, UserPlus, Calendar, Mail, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import logoIcon from "@/assets/logo.png";
import logoFull from "@/assets/logo-full.png";
import logoWhite from "@/assets/logo-white.png";
import profileImage from "@/assets/profile-coachdan.png";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Compass, label: "Explore", path: "/explore" },
  { icon: Bookmark, label: "Saved", path: "/saved" },
  { icon: Users, label: "Clients", path: "/clients" },
  { icon: Calendar, label: "Calendar", path: "/calendar" },
  { icon: UserPlus, label: "Requests", path: "/requests" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: Mail, label: "Inbox", path: "/inbox" },
];

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();
  const { profile, signOut } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl transition-smooth
                ${isActive 
                  ? 'bg-primary text-primary-foreground glow-orange' 
                  : 'dark:text-white text-muted-foreground dark:hover:bg-background/60 hover:text-black hover:bg-white/50 hover:text-base hover:glow-orange'
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
            </Link>
          );
        })}
      </nav>

      {/* Profile Section */}
      <div className="px-3 space-y-2">
        <div
          className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-smooth dark:text-white text-muted-foreground ${open ? 'glass' : ''}`}
        >
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage src={profileImage} alt={profile?.full_name || 'User'} />
            <AvatarFallback>{profile?.full_name ? getInitials(profile.full_name) : 'U'}</AvatarFallback>
          </Avatar>
          <motion.div
            animate={{
              opacity: open ? 1 : 0,
              display: open ? "flex" : "none",
            }}
            className="flex flex-col items-start"
          >
            <span className="text-sm font-medium whitespace-nowrap">{profile?.full_name || 'User'}</span>
            <span className="text-xs text-muted-foreground">My Account</span>
          </motion.div>
        </div>

        <button
          onClick={signOut}
          className={`
            flex items-center gap-3 px-3 py-3 rounded-xl transition-smooth w-full
            dark:text-white text-muted-foreground dark:hover:bg-background/60 hover:text-black hover:bg-white/50 hover:glow-orange
          `}
          aria-label="Sign Out"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <motion.span
            animate={{
              opacity: open ? 1 : 0,
              display: open ? "inline-block" : "none",
            }}
            className="text-sm font-medium whitespace-nowrap"
          >
            Sign Out
          </motion.span>
        </button>
      </div>
    </motion.aside>
  );
};
