import { Sidebar } from "@/components/Navigation/Sidebar";
import { BottomNav } from "@/components/Navigation/BottomNav";
import exerciseHero from "@/assets/exercise-hero.jpg";
import squatWorkout from "@/assets/squat-workout.jpg";
import frontSquat from "@/assets/front-squat.jpg";
import gobletSquat from "@/assets/goblet-squat.jpg";
import andersonSquat from "@/assets/anderson-squat.jpg";

const exercises = [
  { name: "Leg Curl Machine - Lying", category: "bodybuilding", image: squatWorkout },
  { name: "Walking High Knees", category: "crossfit", image: frontSquat },
  { name: "Barbell Back Squat", category: "powerlifting", image: gobletSquat },
  { name: "Front Squat", category: "weightlifting", image: andersonSquat },
  { name: "Goblet Squat", category: "functional", image: squatWorkout },
  { name: "Anderson Squat", category: "powerlifting", image: frontSquat },
  { name: "Box Squat", category: "crossfit", image: gobletSquat },
  { name: "Bulgarian Split Squat", category: "bodybuilding", image: andersonSquat },
];

const Explore = () => {
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      
      <main className="flex-1 lg:ml-20 pb-20 lg:pb-0">
        <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-10 max-w-7xl">
          {/* Banner Section */}
          <div className="relative w-full h-64 lg:h-80 rounded-3xl overflow-hidden mb-8 lg:mb-12">
            <img 
              src={exerciseHero}
              alt="Explore what drives results"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white font-heading text-3xl lg:text-5xl font-bold text-center px-4">
                Explore What Drives Results
              </h1>
            </div>
          </div>

          {/* Exercise Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {exercises.map((exercise, index) => (
              <button
                key={index}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden glass glass-hover"
              >
                <img 
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 backdrop-blur-sm bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-xs text-primary mb-1">{exercise.category}</p>
                  <p className="text-sm font-medium text-white line-clamp-2">
                    {exercise.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Explore;
