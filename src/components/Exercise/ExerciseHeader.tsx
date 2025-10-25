import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface ExerciseHeaderProps {
  title: string;
}

export const ExerciseHeader = ({ title }: ExerciseHeaderProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between mb-6 lg:mb-0">
      <h1 className="text-2xl md:text-3xl font-heading text-foreground">{title}</h1>
      <button 
        className="glass rounded-xl px-4 py-2 flex items-center justify-center gap-2 text-foreground transition-smooth hover:bg-background/60"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <>
            <Sun className="w-5 h-5" />
            <span className="text-sm font-medium">Light</span>
          </>
        ) : (
          <>
            <Moon className="w-5 h-5" />
            <span className="text-sm font-medium">Dark</span>
          </>
        )}
      </button>
    </header>
  );
};
