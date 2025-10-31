import { Sidebar } from "@/components/Navigation/Sidebar";
import { BottomNav } from "@/components/Navigation/BottomNav";

const Clients = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 lg:ml-20 pb-16 lg:pb-0">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-6">Clients</h1>
          <p className="text-muted-foreground">Client management coming soon.</p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Clients;
