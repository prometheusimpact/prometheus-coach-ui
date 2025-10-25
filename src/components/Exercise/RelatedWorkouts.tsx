interface RelatedWorkout {
  name: string;
  image: string;
}

interface RelatedWorkoutsProps {
  workouts: RelatedWorkout[];
}

export const RelatedWorkouts = ({ workouts }: RelatedWorkoutsProps) => {
  return (
    <div>
      <p className="text-sm text-foreground mb-4">Related Workouts</p>
      <div className="grid grid-cols-2 gap-3">
        {workouts.map((workout) => (
          <button 
            key={workout.name}
            className="relative group rounded-2xl overflow-hidden transition-smooth cursor-pointer aspect-[4/3] w-full"
          >
            <img 
              src={workout.image}
              alt={workout.name}
              className="w-full h-full object-cover transition-smooth group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-60 group-hover:opacity-90 transition-smooth" />
            <div className="absolute inset-x-0 bottom-0 p-3 text-white">
              <p className="text-sm font-medium">{workout.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
