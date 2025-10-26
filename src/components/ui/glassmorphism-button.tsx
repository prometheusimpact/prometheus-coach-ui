import { useState } from "react";
import "./glassmorphism-button.css";

interface GlassmorphismButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const GlassmorphismButton = ({ children, onClick, className = "" }: GlassmorphismButtonProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div 
      className={`glass-button-wrap relative inline-block ${isActive ? 'active' : ''} ${className}`}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
    >
      <button
        onClick={onClick}
        className="glassmorphism-btn relative px-6 py-3.5 rounded-full font-medium text-foreground"
      >
        <span className="glass-btn-text relative z-10 inline-block">
          {children}
        </span>
      </button>
      <div className="glass-button-shadow absolute inset-0 rounded-full"></div>
    </div>
  );
};
