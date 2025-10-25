import { Sidebar } from "@/components/Navigation/Sidebar";
import { BottomNav } from "@/components/Navigation/BottomNav";
import { ExerciseHeader } from "@/components/Exercise/ExerciseHeader";
import { ExerciseHero } from "@/components/Exercise/ExerciseHero";
import { InfoCard } from "@/components/Exercise/InfoCard";
import { ProgramTile } from "@/components/Exercise/ProgramTile";
import { RelatedWorkouts } from "@/components/Exercise/RelatedWorkouts";
import { Dumbbell, Target, Zap } from "lucide-react";
import exerciseHero from "@/assets/exercise-hero.jpg";
import gradientBg from "@/assets/gradient-bg.jpg";
import squatWorkout from "@/assets/squat-workout.jpg";

const Index = () => {
  const relatedWorkouts = [
    { name: "Front Squat", image: squatWorkout },
    { name: "Anderson Squat", image: squatWorkout }
  ];

  return (
    <div 
      className="min-h-screen flex bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${gradientBg})` }}
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
              <ExerciseHero 
                image={exerciseHero}
                alt="Athlete performing barbell back squat"
                title="Barbell Back Squat"
              />
              
              {/* Desktop Related Workouts */}
              <div className="hidden lg:block">
                <RelatedWorkouts workouts={relatedWorkouts} />
              </div>
              
              {/* Mobile Info Cards */}
              <div className="lg:hidden space-y-4">
                <div className="glass rounded-2xl px-4 py-2 inline-block">
                  <span className="text-primary font-medium">Equipment: Barbell, Rack</span>
                </div>
                
                <InfoCard
                  icon={Target}
                  label="Primary Muscle Groups"
                  value="Quadriceps, Glutes, Hamstrings"
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
                />
                
                <div>
                  <p className="text-sm text-foreground mb-3">Suggested Program</p>
                  <div className="grid grid-cols-3 gap-3">
                    <ProgramTile label="Sets" value="4" />
                    <ProgramTile label="Reps" value="8-12" />
                    <ProgramTile label="Weight" value="135 lb" />
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
              
              <div className="glass rounded-2xl px-5 py-3 inline-block">
                <span className="text-primary font-medium">Equipment: Barbell, Rack</span>
              </div>
              
              <InfoCard
                icon={Target}
                label="Primary Muscle Groups"
                value="Quadriceps, Glutes, Hamstrings"
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
              />
              
              <div>
                <p className="text-sm text-foreground mb-4">Suggested Program</p>
                <div className="grid grid-cols-3 gap-3">
                  <ProgramTile label="Sets" value="4" />
                  <ProgramTile label="Reps" value="8-12" />
                  <ProgramTile label="Weight" value="135 lb" />
                </div>
              </div>
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
