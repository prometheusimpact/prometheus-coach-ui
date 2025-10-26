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
            className="glass rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(251,146,60,0.4)] hover:bg-white/20 dark:hover:bg-black/30 text-left"
          >
            <div className="relative h-32 overflow-hidden">
              <img 
                src={workout.image}
                alt={workout.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:grayscale group-hover:scale-125"
              />
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm">{workout.name}</h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
