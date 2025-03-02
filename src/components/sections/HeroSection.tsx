
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SplitText from "../SplitText";
import ShinyText from "../ShiningText";
import TiltedCard from "../CardAnimated";
import Aurora from "../Aurora";

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
      <Aurora
        colorStops={["#314f8c", "#329ce3", "#302282"]}
        blend={0.5}
        amplitude={2.0}
        speed={0.5}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className={`space-y-6 ${isLoaded ? "animate-slide-up" : "opacity-0"}`}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Heart className="h-4 w-4 mr-2" fill="currentColor" />
              <ShinyText text="Conecte-se com quem precisa" disabled={false} speed={3} className='shiny-text' />
              <span></span>
            </div>
            <p>
              <SplitText
                text="Doe o que não usa e ajude quem precisa"
                className="text-4xl md:text-5xl font-bold tracking-tight"
                delay={60}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                threshold={0.2}
                rootMargin="-50px"
              />
            </p>


            <p className="text-xl text-muted-foreground">
              Uma plataforma para facilitar a doação de itens
              para pessoas afetadas
              por desastres, imigrantes e refugiados.
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

          <div className={`relative ${isLoaded ? "animate-fade-in" : "opacity-0"} ml-36`}>

            <TiltedCard
              imageSrc="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              altText="Passe amor!"
              captionText="Doe!"
              containerHeight="500px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="500px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}

            />
          </div>
        </div>
      </div>
    </section>
  );
};
