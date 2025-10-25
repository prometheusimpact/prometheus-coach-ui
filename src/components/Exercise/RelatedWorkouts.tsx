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
      <p className="text-base font-medium text-foreground mb-4">Suggested Workouts</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {workouts.map((workout) => (
          <button 
            key={workout.name}
            className="glass rounded-2xl p-3 flex items-center gap-3 group hover:bg-background/60 transition-smooth text-left"
          >
            <div className="w-24 h-16 rounded-md overflow-hidden flex-shrink-0">
              <img 
                src={workout.image}
                alt={workout.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span className="flex-1 text-sm font-medium text-foreground">
              {workout.name}
            </span>
            <span className="text-xs text-foreground/70 group-hover:text-foreground transition-smooth">
              Explore &gt;
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
