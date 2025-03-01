
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bed, Shirt, Sofa, Utensils, Tv, Baby, Shower } from "lucide-react";
import { cn } from "@/lib/utils";
import { Category } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  bed: <Bed className="h-6 w-6" />,
  shirt: <Shirt className="h-6 w-6" />,
  sofa: <Sofa className="h-6 w-6" />,
  utensils: <Utensils className="h-6 w-6" />,
  tv: <Tv className="h-6 w-6" />,
  baby: <Baby className="h-6 w-6" />,
  shower: <Shower className="h-6 w-6" />
};

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export const CategoryCard = ({ category, className }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      to={`/browse?category=${category.id}`}
      className={cn(
        "relative overflow-hidden rounded-lg border border-border/30 bg-card p-6",
        "transition-all duration-300 ease-in-out",
        "hover:border-primary/20 hover:shadow-md",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div 
          className={cn(
            "flex items-center justify-center p-3 rounded-full",
            "bg-accent text-primary",
            "transition-all duration-300",
            isHovered && "bg-primary text-primary-foreground scale-110"
          )}
        >
          {iconMap[category.icon] || <Sofa className="h-6 w-6" />}
        </div>
        
        <div className="space-y-1">
          <h3 className="font-medium text-lg">{category.name}</h3>
          <p className="text-sm text-muted-foreground">{category.description}</p>
        </div>
      </div>
      
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1 bg-primary/0",
          "transition-all duration-300 ease-in-out",
          isHovered && "bg-primary/100"
        )}
      />
    </Link>
  );
};

export default CategoryCard;
