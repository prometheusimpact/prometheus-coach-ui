import { Play } from "lucide-react";

interface ExerciseHeroProps {
  image: string;
  alt: string;
  title?: string;
}

export const ExerciseHero = ({ image, alt, title }: ExerciseHeroProps) => {
  return (
    <div className="relative w-full aspect-video lg:aspect-[16/10] rounded-3xl overflow-hidden">
      <img 
        src={image} 
        alt={alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 h-32 backdrop-blur-sm bg-gradient-to-t from-background/20 to-transparent" />
      {title && (
        <div className="absolute bottom-6 left-6">
          <h2 className="text-white font-heading font-normal text-2xl lg:text-3xl">
            {title}
          </h2>
        </div>
      )}
      <button 
        className="absolute bottom-6 right-6 glass glass-hover px-4 py-3 rounded-xl flex items-center gap-2 text-white transition-smooth hover:scale-105"
        aria-label="Play video"
      >
        <Play className="w-5 h-5 fill-white" />
        <span className="font-medium">Play Video</span>
      </button>
    </div>
  );
};
