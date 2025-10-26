import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon?: LucideIcon;
  label: string;
  value: string | React.ReactNode;
  variant?: "default" | "accent";
}

export const InfoCard = ({ icon: Icon, label, value, variant = "default" }: InfoCardProps) => {
  return (
    <div className="glass rounded-2xl p-5 transition-smooth cursor-pointer hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)]">
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
          <p className="text-xl font-medium text-foreground dark:text-primary mb-2">{label}</p>
          <div className="text-3xl lg:text-4xl font-bold text-foreground">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};
