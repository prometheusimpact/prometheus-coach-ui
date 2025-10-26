import { Sidebar } from "@/components/Navigation/Sidebar";
import { BottomNav } from "@/components/Navigation/BottomNav";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import gradientBg from "@/assets/gradient-bg.jpg";
import gradientBgDark from "@/assets/gradient-bg-dark.png";
import diveHero from "@/assets/dive.jpg";
import legcurlImg from "@/assets/legcurl.jpg";
import highkneesImg from "@/assets/highknees.jpg";
import barbellBackImg from "@/assets/barbell-back.jpg";
import frontSquatImg from "@/assets/front.jpg";
import gobletSquatImg from "@/assets/goblet.jpg";
import andersonSquatImg from "@/assets/anderson.jpg";

const exercises = [
  { name: "Leg Curl Machine - Lying", category: "bodybuilding", image: legcurlImg },
  { name: "Walking High Knees", category: "crossfit", image: highkneesImg },
  { name: "Barbell Back Squat", category: "powerlifting", image: barbellBackImg },
  { name: "Front Squat", category: "weightlifting", image: frontSquatImg },
  { name: "Goblet Squat", category: "functional", image: gobletSquatImg },
  { name: "Anderson Squat", category: "powerlifting", image: andersonSquatImg },
];

const Explore = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div 
      className="min-h-screen flex w-full"
      style={{
        backgroundImage: `url(${theme === "dark" ? gradientBgDark : gradientBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Sidebar />
      
      <main className="flex-1 lg:ml-20 pb-20 lg:pb-0">
        <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-10 max-w-7xl">
          {/* Banner Section with Theme Toggle */}
          <div className="relative w-full h-48 lg:h-56 rounded-3xl overflow-hidden mb-8">
            <img 
              src={diveHero}
              alt="Explore exercises"
              className="w-full h-full object-cover"
            />
            {/* Theme Toggle - Overlapping Image */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="absolute top-4 right-4 glass w-10 h-10 rounded-xl flex items-center justify-center transition-smooth hover:bg-primary hover:text-primary-foreground z-10"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Exercise Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {exercises.map((exercise, index) => (
              <div
                key={index}
                className="glass rounded-2xl overflow-hidden group cursor-pointer transition-smooth glass-hover"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={exercise.image}
                    alt={exercise.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      {exercise.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{exercise.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Explore;
