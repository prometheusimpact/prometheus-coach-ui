interface RelatedWorkout {
  name: string;
}

interface RelatedWorkoutsProps {
  workouts: RelatedWorkout[];
}

export const RelatedWorkouts = ({ workouts }: RelatedWorkoutsProps) => {
  return (
    <div>
      <p className="text-sm text-foreground mb-4">Related Workouts</p>
      <div className="grid grid-cols-3 gap-3">
        {workouts.map((workout) => (
          <div 
            key={workout.name}
            className="glass rounded-2xl p-4 text-center transition-smooth glass-hover cursor-pointer"
          >
            <p className="text-sm font-medium text-foreground">{workout.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
