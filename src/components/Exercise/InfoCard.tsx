import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon?: LucideIcon;
  label: string;
  value: string | React.ReactNode;
  variant?: "default" | "accent";
  avatars?: string[];
  onClick?: () => void;
}

export const InfoCard = ({ icon: Icon, label, value, variant = "default", avatars, onClick }: InfoCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="glass rounded-2xl p-5 transition-smooth cursor-pointer hover:shadow-[0_0_50px_rgba(var(--primary-rgb),0.7)] relative"
    >
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
      
      {avatars && avatars.length > 0 && (
        <div className="flex items-center justify-end mt-4">
          {avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className="w-8 h-8 rounded-full border-2 border-white/40 object-cover"
              style={{ marginLeft: index > 0 ? '-10px' : '0' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
