import { Sidebar } from "@/components/Navigation/Sidebar";
import { BottomNav } from "@/components/Navigation/BottomNav";
import { ExerciseHeader } from "@/components/Exercise/ExerciseHeader";
import { ExerciseHero } from "@/components/Exercise/ExerciseHero";
import { InfoCard } from "@/components/Exercise/InfoCard";
import { ProgramTile } from "@/components/Exercise/ProgramTile";
import { RelatedWorkouts } from "@/components/Exercise/RelatedWorkouts";
import { Dumbbell, Target, Zap, Bookmark, Share2, Moon, Sun, Flame, Weight, Clock, Heart, Activity, TrendingUp, AlertTriangle } from "lucide-react";
import { useTheme } from "next-themes";
import exerciseHero from "@/assets/exercise-hero.jpg";
import gradientBg from "@/assets/gradient-bg.jpg";
import gradientBgDark from "@/assets/gradient-bg-dark.png";
import frontSquatImg from "@/assets/front.jpg";
import andersonSquatImg from "@/assets/anderson.jpg";

const Index = () => {
  const { theme, setTheme } = useTheme();
  const relatedWorkouts = [
    { name: "Front Squat", image: frontSquatImg },
    { name: "Anderson Squat", image: andersonSquatImg }
  ];

  return (
    <div 
      className="min-h-screen flex bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${theme === "dark" ? gradientBgDark : gradientBg})` }}
    >
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-20 pb-20 lg:pb-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {/* Mobile Header */}
          <div className="lg:hidden mb-6">
            <ExerciseHeader title="Barbell Back Squat" />
          </div>
          
          {/* Desktop Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Column - Exercise Image */}
            <div className="lg:col-span-7 space-y-6">
              <div className="lg:mt-[10px]">
                <ExerciseHero 
                  image={exerciseHero}
                  alt="Athlete performing barbell back squat"
                  title="Barbell Back Squat"
                />
              </div>
              
              {/* Desktop Related Workouts */}
              <div className="hidden lg:block lg:mt-6">
                <RelatedWorkouts workouts={relatedWorkouts} />
              </div>
              
              {/* Mobile Info Cards */}
              <div className="lg:hidden lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="bg-primary rounded-2xl px-4 py-2">
                  <span className="text-white font-normal">Equipment: Barbell, Rack</span>
                </div>
                <button className="glass rounded-2xl p-2 flex items-center justify-center hover:bg-background/60 transition-smooth">
                  <Bookmark size={18} className="text-foreground" />
                </button>
                <button className="glass rounded-2xl p-2 flex items-center justify-center hover:bg-background/60 transition-smooth">
                  <Share2 size={18} className="text-foreground" />
                </button>
                <button 
                  className="glass rounded-2xl p-2 flex items-center justify-center hover:bg-background/60 transition-smooth"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={18} className="text-foreground" /> : <Moon size={18} className="text-foreground" />}
                </button>
              </div>
                
                <InfoCard
                  icon={Target}
                  label="Primary Muscle Groups"
                  value={<div className="text-base font-normal">Quadriceps, Glutes, Hamstrings</div>}
                  variant="accent"
                />
                
                <InfoCard
                  icon={Zap}
                  label="Key Aspects"
                  value={
                    <ul className="space-y-1 text-sm">
                      <li>• Maintain neutral spine throughout movement</li>
                      <li>• Keep knees aligned with toes</li>
                      <li>• Descend until thighs parallel to ground</li>
                      <li>• Drive through heels on ascent</li>
                    </ul>
                  }
                  variant="accent"
                />
                
                <div>
                  <p className="text-base font-medium text-foreground mb-3">Suggested Program</p>
                  <div className="grid grid-cols-3 gap-3">
                    <ProgramTile label="Sets" value="4" />
                    <ProgramTile label="Reps" value="8-12" />
                    <ProgramTile label="Weight" value="135 lb" />
                  </div>
                </div>

                <InfoCard
                  icon={AlertTriangle}
                  label="Common Mistakes"
                  value={<div className="text-sm font-normal">Rounded back, shallow depth, knees caving inward, bar placement too high/low.</div>}
                  variant="accent"
                />

                {/* Workout Metrics */}
                <div>
                  <p className="text-base font-medium text-foreground mb-3">Workout Metrics Based on Suggested Program</p>
                  <div className="grid grid-cols-1 gap-3">
                    <InfoCard
                      icon={Flame}
                      label="Calories Burned"
                      value={
                        <div className="text-sm font-normal space-y-1">
                          <div>Per set: ~6–8 calories</div>
                          <div>Total (4 sets): ~25–35 calories</div>
                          <div>With rest: ~40–60 calories total</div>
                        </div>
                      }
                      variant="accent"
                    />
                    <InfoCard
                      icon={Weight}
                      label="Total Volume"
                      value={<div className="text-sm font-normal">135 lb × ~40 reps = 5,400 lb lifted</div>}
                      variant="accent"
                    />
                    <InfoCard
                      icon={Clock}
                      label="Time Under Tension"
                      value={<div className="text-sm font-normal">~1 min total (3 s eccentric + 1 s concentric per rep)</div>}
                      variant="accent"
                    />
                    <InfoCard
                      icon={Heart}
                      label="Heart Rate Range"
                      value={<div className="text-sm font-normal">~120–150 bpm (moderate intensity)</div>}
                      variant="accent"
                    />
                    <InfoCard
                      icon={Activity}
                      label="Metabolic Equivalent (MET)"
                      value={<div className="text-sm font-normal">~6 METs (strength training, moderate–vigorous)</div>}
                      variant="accent"
                    />
                    <InfoCard
                      icon={TrendingUp}
                      label="Calories/minute"
                      value={<div className="text-sm font-normal">~5–8 cal/min (based on bodyweight)</div>}
                      variant="accent"
                    />
                  </div>
                </div>
                
                {/* Mobile Related Workouts */}
                <div className="lg:hidden">
                  <RelatedWorkouts workouts={relatedWorkouts} />
                </div>
              </div>
            </div>
            
            {/* Right Column - Exercise Details (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-5 space-y-6">
              <ExerciseHeader title="Barbell Back Squat" />
              
              <div className="flex items-center gap-3 flex-wrap">
                <div className="bg-primary rounded-2xl px-5 py-3">
                  <span className="text-white font-normal">Equipment: Barbell, Rack</span>
                </div>
                <button className="glass rounded-2xl p-2 flex items-center justify-center hover:bg-background/60 transition-smooth">
                  <Bookmark size={18} className="text-foreground" />
                </button>
                <button className="glass rounded-2xl p-2 flex items-center justify-center hover:bg-background/60 transition-smooth">
                  <Share2 size={18} className="text-foreground" />
                </button>
                <button 
                  className="glass rounded-2xl p-2 flex items-center justify-center hover:bg-background/60 transition-smooth"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={18} className="text-foreground" /> : <Moon size={18} className="text-foreground" />}
                </button>
              </div>
              
              <InfoCard
                icon={Target}
                label="Primary Muscle Groups"
                value={<div className="text-base font-normal">Quadriceps, Glutes, Hamstrings</div>}
                variant="accent"
              />
              
              <InfoCard
                icon={Zap}
                label="Key Aspects"
                value={
                  <ul className="space-y-1.5 text-sm">
                    <li>• Maintain neutral spine throughout movement</li>
                    <li>• Keep knees aligned with toes</li>
                    <li>• Descend until thighs parallel to ground</li>
                    <li>• Drive through heels on ascent</li>
                  </ul>
                }
                variant="accent"
              />
              
              <div className="lg:mt-[10px] lg:pt-[10px]">
                <p className="text-base font-medium text-foreground mb-4">Suggested Program</p>
                <div className="grid grid-cols-3 gap-3">
                  <ProgramTile label="Sets" value="4" />
                  <ProgramTile label="Reps" value="8-12" />
                  <ProgramTile label="Weight" value="135 lb" />
                </div>
              </div>

              <InfoCard
                icon={AlertTriangle}
                label="Common Mistakes"
                value={<div className="text-sm font-normal">Rounded back, shallow depth, knees caving inward, bar placement too high/low.</div>}
                variant="accent"
              />
            </div>
          </div>

          {/* Workout Metrics - Full Width on Desktop */}
          <div className="hidden lg:block mt-8">
            <p className="text-base font-medium text-foreground mb-4">Workout Metrics Based on Suggested Program</p>
            <div className="grid grid-cols-3 gap-4">
              <InfoCard
                icon={Flame}
                label="Calories Burned"
                value={
                  <div className="text-sm font-normal space-y-1">
                    <div>Per set: ~6–8 calories</div>
                    <div>Total (4 sets): ~25–35 calories</div>
                    <div>With rest: ~40–60 calories total</div>
                  </div>
                }
                variant="accent"
              />
              <InfoCard
                icon={Weight}
                label="Total Volume"
                value={<div className="text-sm font-normal">135 lb × ~40 reps = 5,400 lb lifted</div>}
                variant="accent"
              />
              <InfoCard
                icon={Clock}
                label="Time Under Tension"
                value={<div className="text-sm font-normal">~1 min total (3 s eccentric + 1 s concentric per rep)</div>}
                variant="accent"
              />
              <InfoCard
                icon={Heart}
                label="Heart Rate Range"
                value={<div className="text-sm font-normal">~120–150 bpm (moderate intensity)</div>}
                variant="accent"
              />
              <InfoCard
                icon={Activity}
                label="Metabolic Equivalent (MET)"
                value={<div className="text-sm font-normal">~6 METs (strength training, moderate–vigorous)</div>}
                variant="accent"
              />
              <InfoCard
                icon={TrendingUp}
                label="Calories/minute"
                value={<div className="text-sm font-normal">~5–8 cal/min (based on bodyweight)</div>}
                variant="accent"
              />
            </div>
          </div>
        </div>
      </main>
      
      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Index;
