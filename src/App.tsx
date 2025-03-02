
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Layout } from "./components/Layout";
import { DonationForm } from "./components/DonationForm";
import { RequestForm } from "./components/RequestForm";
import { ItemDetail } from "./components/ItemDetail";
import { AuthProvider } from "./components/AuthContext";
import { db } from "./firebase";
import { categories, DonationItem as DonationItemType } from "@/lib/data";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { DonationItem } from "./components/DonationItem";

const queryClient = new QueryClient();

const BrowsePage = () => {
  const [activeItems, setActiveItems] = useState<DonationItemType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    }

    const fetchDonationItems = async () => {
      try {
        setIsLoading(true);

        const itemsRef = collection(db, 'bens');
        const q = query(itemsRef, where('status', '==', 'available'));
        const snapshot = await getDocs(q);

        const items: DonationItemType[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            categoryId: data.categoryId,
            condition: data.condition,
            imageUrl: data.imageUrl,
            location: data.location,
            pickupDates: data.pickupDates,
            pickupTimes: data.pickupTimes,
            contactName: data.contactName,
            contactPhone: data.contactPhone,
            status: data.status,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            reservedBy: data.reservedBy || undefined,
          });
        });
        setActiveItems(items);
      } catch (err) {
        setError('Erro ao carregar os itens.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonationItems();
  }, []);

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
  const [item, setItem] = useState<DonationItemType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) {
        setError("Item não encontrado.");
        return;
      }

      try {
        setIsLoading(true);
        const itemRef = doc(db, "bens", id);
        const docSnap = await getDoc(itemRef);

        if (docSnap.exists()) {
          setItem(docSnap.data() as DonationItemType); 
        } else {
          setError("Item não encontrado.");
        }
      } catch (err) {
        setError("Erro ao carregar os dados do item.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <ItemDetail
          item={item}
          onReserve={(name, phone) => {
            // Em um app real, você faria a atualização do item no Firestore
            console.log("Item reservado por", name, phone);
          }}
          onMarkAsDonated={() => {
            // Em um app real, você faria a atualização do item no Firestore
            console.log("Item marcado como doado");
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
    <AuthProvider>
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
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
