import { Play } from "lucide-react";
import { StarBorder } from "@/components/ui/star-border";

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
      <div className="absolute bottom-6 right-6 group">
        <StarBorder
          as="button"
          className="rounded-xl overflow-hidden py-0 hover:scale-105 transition-transform duration-300"
          color="rgba(255, 255, 255, 0.8)"
          speed="4s"
        >
          <div className="glass px-4 py-3 rounded-xl flex items-center gap-2 text-white">
            <Play className="w-5 h-5 fill-white" />
            <span className="font-medium">Play Video</span>
          </div>
        </StarBorder>
      </div>
    </div>
  );
};
