import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon?: LucideIcon;
  label: string;
  value: string | React.ReactNode;
  variant?: "default" | "accent";
}

export const InfoCard = ({ icon: Icon, label, value, variant = "default" }: InfoCardProps) => {
  return (
    <div className="glass rounded-2xl p-6 transition-smooth glass-hover">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
            ${variant === "accent" ? "bg-primary text-primary-foreground" : "bg-secondary"}
          `}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div className="flex-1">
          <p className="text-base font-medium text-foreground mb-1">{label}</p>
          <div className="text-foreground font-medium">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};
