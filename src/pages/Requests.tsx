import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sun, Moon, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { BottomNav } from "@/components/Navigation/BottomNav";
import gradientBg from "@/assets/gradient-bg.jpg";
import gradientBgDark from "@/assets/gradient-bg-dark.png";

import alexMartinezImg from "@/assets/alex-martinez.jpg";
import chrisAndersonImg from "@/assets/chris-anderson.jpg";
import davidParkImg from "@/assets/davidpark.jpg";
import emilyRodriguezImg from "@/assets/emily-rodriguez.jpg";
import jessicaTaylorImg from "@/assets/jessica-taylor.jpg";
import mikeChenImg from "@/assets/mike-chen.jpg";
import rachelKimImg from "@/assets/rachel-kim.jpg";

interface PendingRequest {
  id: number;
  name: string;
  image: string;
}

const Requests = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  const [requests, setRequests] = useState<PendingRequest[]>([
    { id: 1, name: "Alex Martinez", image: alexMartinezImg },
    { id: 2, name: "Chris Anderson", image: chrisAndersonImg },
    { id: 3, name: "David Park", image: davidParkImg },
    { id: 4, name: "Emily Rodriguez", image: emilyRodriguezImg },
    { id: 5, name: "Jessica Taylor", image: jessicaTaylorImg },
    { id: 6, name: "Mike Chen", image: mikeChenImg },
    { id: 7, name: "Rachel Kim", image: rachelKimImg },
  ]);

  const handleAccept = (id: number, name: string) => {
    setRequests(requests.filter(req => req.id !== id));
    toast.success(`${name} accepted!`);
  };

  const handleDelete = (id: number, name: string) => {
    setRequests(requests.filter(req => req.id !== id));
    toast.error(`${name} request deleted`);
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: `url(${theme === "dark" ? gradientBgDark : gradientBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <BottomNav />
      
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <h1 className="text-2xl font-bold text-foreground">Pending Requests</h1>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-white/10"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 pb-24">
        <div className="max-w-2xl mx-auto space-y-4">
          {requests.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center">
              <p className="text-muted-foreground text-lg">No pending requests</p>
            </div>
          ) : (
            requests.map((request) => (
              <div
                key={request.id}
                className="glass rounded-2xl p-6 transition-smooth hover:shadow-[0_0_50px_rgba(var(--primary-rgb),0.7)] hover:bg-white/70 dark:hover:bg-black/60"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={request.image} alt={request.name} />
                      <AvatarFallback>
                        {request.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-lg font-medium text-foreground">
                        <span className="font-semibold">{request.name}</span> added you
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="default"
                      onClick={() => handleAccept(request.id, request.name)}
                      className="h-10 w-10"
                    >
                      <Check className="h-5 w-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(request.id, request.name)}
                      className="h-10 w-10"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Requests;
