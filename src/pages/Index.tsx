
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight, Search, Plus, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { CategoryCard } from "@/components/CategoryCard";
import { DonationItem } from "@/components/DonationItem";
import { categories, mockDonationItems } from "@/lib/data";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading content
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter only available items for display
  const featuredItems = mockDonationItems
    .filter(item => item.status === "available")
    .slice(0, 3);
  
  return (
    <Layout>
      {/* Hero Section */}
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
      
      {/* Categories Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold">Categorias de doação</h2>
              <p className="text-muted-foreground mt-2">
                Navegue pelas categorias ou encontre itens específicos
              </p>
            </div>
            
            <Button asChild variant="ghost" className="gap-1 md:self-end">
              <Link to="/browse">
                Ver todas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                className={isLoaded ? "animate-slide-up" : "opacity-0"}
                style={{ 
                  animationDelay: `${categories.indexOf(category) * 100}ms`,
                  opacity: isLoaded ? 1 : 0
                }}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Items Section */}
      {featuredItems.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl font-bold">Itens disponíveis</h2>
                <p className="text-muted-foreground mt-2">
                  Alguns dos itens recentemente disponibilizados para doação
                </p>
              </div>
              
              <Button asChild variant="ghost" className="gap-1 md:self-end">
                <Link to="/browse">
                  Ver todos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuredItems.map((item) => (
                <DonationItem 
                  key={item.id} 
                  item={item} 
                  className={isLoaded ? "animate-slide-up" : "opacity-0"}
                  style={{ 
                    animationDelay: `${featuredItems.indexOf(item) * 100}ms`,
                    opacity: isLoaded ? 1 : 0
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* How It Works Section */}
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
      
      {/* CTA Section */}
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
    </Layout>
  );
};

export default Index;
