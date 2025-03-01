
import { Link } from "react-router-dom";
import { Plus, Search, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HowItWorksSectionProps {
  isLoaded: boolean;
}

export const HowItWorksSection = ({ isLoaded }: HowItWorksSectionProps) => {
  return (
    <section className="py-16 bg-accent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Como funciona</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Um processo simples para conectar doadores e pessoas necessitadas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`flex flex-col items-center text-center p-6 ${isLoaded ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Cadastre suas doações</h3>
            <p className="text-muted-foreground">
              Adicione detalhes dos itens que você deseja doar, incluindo fotos e informações de contato.
            </p>
          </div>
          
          <div className={`flex flex-col items-center text-center p-6 ${isLoaded ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Encontre o que precisa</h3>
            <p className="text-muted-foreground">
              Procure itens disponíveis ou cadastre suas necessidades para que os doadores possam encontrá-lo.
            </p>
          </div>
          
          <div className={`flex flex-col items-center text-center p-6 ${isLoaded ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: "300ms" }}>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Hand className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Faça a diferença</h3>
            <p className="text-muted-foreground">
              Entre em contato diretamente e organize a entrega dos itens, ajudando quem mais precisa.
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link to="/donate">
              Começar agora
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
