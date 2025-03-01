
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Info, Phone, Mail, Calendar, AlertTriangle, Check, X } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { DonationItem, categories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ItemDetailProps {
  item: DonationItem;
  onReserve?: (name: string, phone: string) => void;
  onMarkAsDonated?: () => void;
}

const statusColorMap = {
  available: "bg-green-100 text-green-800 border-green-200",
  reserved: "bg-amber-100 text-amber-800 border-amber-200",
  donated: "bg-blue-100 text-blue-800 border-blue-200"
};

const statusTextMap = {
  available: "Disponível",
  reserved: "Reservado",
  donated: "Doado"
};

export const ItemDetail = ({ item, onReserve, onMarkAsDonated }: ItemDetailProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isReserveDialogOpen, setIsReserveDialogOpen] = useState(false);
  const [isDonatedDialogOpen, setIsDonatedDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const category = categories.find(c => c.id === item.categoryId);
  const navigate = useNavigate();
  
  const handleReserve = () => {
    if (onReserve) {
      onReserve(name, phone);
    }
    setIsReserveDialogOpen(false);
    toast.success("Item reservado com sucesso!");
    // In a real app, we would refresh or update the item
  };
  
  const handleMarkAsDonated = () => {
    if (onMarkAsDonated) {
      onMarkAsDonated();
    }
    setIsDonatedDialogOpen(false);
    toast.success("Item marcado como doado!");
    navigate("/browse");
  };
  
  const isAvailable = item.status === "available";
  const isReserved = item.status === "reserved";
  const isDonated = item.status === "donated";
  
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="relative rounded-lg overflow-hidden border border-border/30">
            <div className={cn(
              "relative aspect-square",
              isImageLoaded ? "img-loaded" : "img-loading"
            )}>
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover"
                onLoad={() => setIsImageLoaded(true)}
              />
            </div>
            
            <div className="absolute top-4 left-4">
              <Badge 
                variant="outline" 
                className={cn(
                  "px-3 py-1 text-sm font-medium",
                  statusColorMap[item.status]
                )}
              >
                {statusTextMap[item.status]}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações de contato</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {item.contactName && (
                <div className="rounded-lg border border-border/50 p-4 bg-card">
                  <div className="font-medium mb-1">Nome</div>
                  <div className="text-muted-foreground">{item.contactName}</div>
                </div>
              )}
              
              {item.contactPhone && (
                <div className="rounded-lg border border-border/50 p-4 bg-card">
                  <div className="font-medium mb-1">Telefone</div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{item.contactPhone}</span>
                  </div>
                </div>
              )}
              
              {item.contactEmail && (
                <div className="rounded-lg border border-border/50 p-4 bg-card">
                  <div className="font-medium mb-1">E-mail</div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{item.contactEmail}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {category && (
                <Badge variant="outline" className="px-2 py-1 text-xs">
                  {category.name}
                </Badge>
              )}
              <Badge variant="outline" className="px-2 py-1 text-xs">
                Estado: {item.condition}
              </Badge>
            </div>
            
            <h1 className="text-2xl font-semibold">{item.title}</h1>
            
            <div className="mt-4 space-y-2 text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{item.location}</span>
              </div>
              
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 shrink-0 mt-0.5" />
                <span>{item.pickupDates}, {item.pickupTimes}</span>
              </div>
              
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 shrink-0 mt-0.5" />
                <span>Cadastrado em {format(new Date(item.createdAt), "dd/MM/yyyy")}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Descrição</h3>
            <div className="text-muted-foreground">
              {item.description}
            </div>
          </div>
          
          {isReserved && item.reservedBy && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">Item reservado</h4>
                  <p className="text-sm text-amber-700">
                    Este item está reservado para {item.reservedBy.name} até{" "}
                    {format(new Date(item.reservedBy.until), "dd/MM/yyyy")}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {isDonated && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800">Item doado</h4>
                  <p className="text-sm text-blue-700">
                    Este item já foi doado e não está mais disponível.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {isAvailable && (
              <Button 
                className="flex-1"
                onClick={() => setIsReserveDialogOpen(true)}
              >
                Tenho interesse
              </Button>
            )}
            
            {!isDonated && (
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => setIsDonatedDialogOpen(true)}
              >
                Marcar como doado
              </Button>
            )}
            
            <Button 
              variant="ghost"
              className="flex-1"
              onClick={() => navigate(-1)}
            >
              Voltar
            </Button>
          </div>
        </div>
      </div>
      
      {/* Reserve Dialog */}
      <Dialog open={isReserveDialogOpen} onOpenChange={setIsReserveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reservar este item</DialogTitle>
            <DialogDescription>
              Preencha seus dados para reservar este item. O doador entrará em contato com você.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Seu nome</Label>
              <Input 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome completo"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Seu telefone</Label>
              <Input 
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsReserveDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleReserve}
              disabled={!name.trim() || !phone.trim()}
            >
              Reservar item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Mark as Donated Dialog */}
      <Dialog open={isDonatedDialogOpen} onOpenChange={setIsDonatedDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Marcar como doado</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja marcar este item como doado? Ele não aparecerá mais na lista de itens disponíveis.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDonatedDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleMarkAsDonated}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Utility function
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default ItemDetail;
