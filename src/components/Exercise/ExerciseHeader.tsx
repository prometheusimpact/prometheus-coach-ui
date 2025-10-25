interface ExerciseHeaderProps {
  title: string;
}

export const ExerciseHeader = ({ title }: ExerciseHeaderProps) => {
  return (
    <header className="flex items-center justify-between mb-6 lg:mb-0">
      <h1 className="text-2xl md:text-3xl font-heading text-foreground">{title}</h1>
    </header>
  );
};
