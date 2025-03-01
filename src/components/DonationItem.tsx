
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { DonationItem as DonationItemType, categories } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

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

interface DonationItemProps {
  item: DonationItemType;
  className?: string;
}

export const DonationItem = ({ item, className }: DonationItemProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const category = categories.find(c => c.id === item.categoryId);
  
  return (
    <Link 
      to={`/item/${item.id}`}
      className={cn(
        "group flex flex-col rounded-lg overflow-hidden border border-border/30",
        "transition-all duration-300 hover:shadow-md hover:border-primary/20",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <div className={cn(
          "absolute inset-0",
          isImageLoaded ? "img-loaded" : "img-loading"
        )}>
          <img 
            src={item.imageUrl} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        
        <div className="absolute top-3 left-3">
          <Badge 
            variant="outline" 
            className={cn(
              "px-2 py-1 text-xs font-medium",
              statusColorMap[item.status]
            )}
          >
            {statusTextMap[item.status]}
          </Badge>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        
        <div className="space-y-2 flex-1">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground">{item.location}</span>
          </div>
          
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground line-clamp-1">
              {item.pickupDates}, {item.pickupTimes}
            </span>
          </div>
          
          {category && (
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{category.name}</span>
            </div>
          )}
        </div>
        
        <div className="pt-2 mt-auto">
          <p className="text-sm line-clamp-2 text-muted-foreground">
            {item.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default DonationItem;
