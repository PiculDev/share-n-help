
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Layout } from "./components/Layout";
import { DonationForm } from "./components/DonationForm";
import { RequestForm } from "./components/RequestForm";
import { ItemDetail } from "./components/ItemDetail";
import { mockDonationItems, categories } from "./lib/data";
import { DonationItem } from "./components/DonationItem";

const queryClient = new QueryClient();

const BrowsePage = () => {
  const [activeItems, setActiveItems] = useState(mockDonationItems.filter(item => item.status === "available"));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  useEffect(() => {
    // Get category from URL if present
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, []);
  
  // Filter items by selected category
  const filteredItems = selectedCategory 
    ? activeItems.filter(item => item.categoryId === selectedCategory)
    : activeItems;
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Categorias</h3>
              <div className="space-y-1">
                <button 
                  className={`w-full text-left px-3 py-2 rounded-md text-sm ${!selectedCategory ? 'bg-accent text-foreground font-medium' : 'hover:bg-accent/50 text-muted-foreground'}`}
                  onClick={() => setSelectedCategory(null)}
                >
                  Todas as categorias
                </button>
                
                {categories.map(category => (
                  <button 
                    key={category.id}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${selectedCategory === category.id ? 'bg-accent text-foreground font-medium' : 'hover:bg-accent/50 text-muted-foreground'}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {selectedCategory 
                ? `${categories.find(c => c.id === selectedCategory)?.name || 'Itens'} disponíveis` 
                : 'Todos os itens disponíveis'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {filteredItems.length} {filteredItems.length === 1 ? 'item encontrado' : 'itens encontrados'}
            </p>
            
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <DonationItem key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed rounded-lg">
                <p className="text-muted-foreground">Nenhum item disponível nesta categoria no momento.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const ItemDetailPage = () => {
  const [item, setItem] = useState(mockDonationItems[0]);
  
  useEffect(() => {
    // In a real app, we would fetch the item from the API
    const itemId = window.location.pathname.split('/').pop();
    const foundItem = mockDonationItems.find(i => i.id === itemId);
    if (foundItem) {
      setItem(foundItem);
    }
  }, []);
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <ItemDetail 
          item={item} 
          onReserve={(name, phone) => {
            // In a real app, we would update the item in the database
            console.log("Item reserved by", name, phone);
          }}
          onMarkAsDonated={() => {
            // In a real app, we would update the item in the database
            console.log("Item marked as donated");
          }}
        />
      </div>
    </Layout>
  );
};

const DonatePage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">Cadastrar doação</h1>
        <p className="text-muted-foreground mb-8">
          Preencha o formulário abaixo com os detalhes do item que você deseja doar.
        </p>
        
        <DonationForm />
      </div>
    </Layout>
  );
};

const RequestPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">Cadastrar solicitação</h1>
        <p className="text-muted-foreground mb-8">
          Preencha o formulário abaixo para cadastrar suas necessidades.
        </p>
        
        <RequestForm />
      </div>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/requests/new" element={<RequestPage />} />
          <Route path="/item/:id" element={<ItemDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
