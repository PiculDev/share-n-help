
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading content
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className={`space-y-6 ${isLoaded ? "animate-slide-up" : "opacity-0"}`}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Heart className="h-4 w-4 mr-2" fill="currentColor" />
              <span>Conecte-se com quem precisa</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Doe o que não usa e ajude quem precisa
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Uma plataforma para facilitar a doação de itens para pessoas afetadas por desastres, imigrantes e refugiados.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="/donate">
                  <Plus className="h-4 w-4" />
                  Cadastrar doação
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/browse">
                  <Search className="h-4 w-4" />
                  Explorar itens
                </Link>
              </Button>
            </div>
          </div>
          
          <div className={`relative ${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                alt="Pessoas se ajudando" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};
