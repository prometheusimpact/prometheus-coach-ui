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
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
    </div>
  );
};
