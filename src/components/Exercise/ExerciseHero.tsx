interface ExerciseHeroProps {
  image: string;
  alt: string;
}

export const ExerciseHero = ({ image, alt }: ExerciseHeroProps) => {
  return (
    <div className="relative w-full aspect-video lg:aspect-[16/10] rounded-3xl overflow-hidden">
      <img 
        src={image} 
        alt={alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 h-32 backdrop-blur-sm bg-gradient-to-t from-background/20 to-transparent" />
    </div>
  );
};
