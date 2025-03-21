import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { DonationItem as DonationItemType } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

interface DonationItemProps {
  item: DonationItemType;
  className?: string;
  style?: React.CSSProperties;
}

export const DonationItem = ({ item, className, style }: DonationItemProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border/30 bg-card",
        "transition-all duration-300 ease-in-out",
        "hover:border-primary/20 hover:shadow-md",
        className
      )}
      style={style}
    >
      <Link to={`/items/${item.id}`}>
        <div className="aspect-w-4 aspect-h-3">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>

        <div className="p-4">
          <h3 className="font-medium text-lg line-clamp-1">{item.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <Badge variant="secondary">{item.condition}</Badge>
            </div>
            <div className="text-xs text-muted-foreground">{item.location}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};
