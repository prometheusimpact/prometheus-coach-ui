import { MoreVertical } from "lucide-react";

interface ExerciseHeaderProps {
  title: string;
}

export const ExerciseHeader = ({ title }: ExerciseHeaderProps) => {
  return (
    <header className="flex items-center justify-between mb-6 lg:mb-0">
      <h1 className="text-2xl md:text-3xl font-heading text-foreground">{title}</h1>
      <button 
        className="w-10 h-10 rounded-xl glass-hover flex items-center justify-center text-foreground transition-smooth"
        aria-label="More options"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
    </header>
  );
};
