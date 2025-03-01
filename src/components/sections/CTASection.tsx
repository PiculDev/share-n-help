
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1593113598332-cd59a93f9efa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="People helping each other" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/30" />
          </div>
          
          <div className="relative py-12 px-6 md:py-16 md:px-12 text-white">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold mb-4">Precisa de ajuda?</h2>
              <p className="text-white/90 mb-6">
                Se você está em situação de vulnerabilidade, cadastre suas necessidades e encontre pessoas dispostas a ajudar.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="secondary" size="lg">
                  <Link to="/requests/new">
                    Cadastrar necessidade
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10">
                  <Link to="/browse">
                    Ver itens disponíveis
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
