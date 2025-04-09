
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MealCardProps {
  id: string;
  name: string;
  image: string;
  restaurant: string;
  rating: number;
  reviewCount: number;
  price: string;
  tags: string[];
  distance: string;
  className?: string;
}

export const MealCard = ({
  id,
  name,
  image,
  restaurant,
  rating,
  reviewCount,
  price,
  tags,
  distance,
  className,
}: MealCardProps) => {
  return (
    <Card className={cn("overflow-hidden card-hover", className)}>
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
          {distance}
        </div>
        <div className="absolute bottom-2 left-2 bg-primary/90 text-primary-foreground backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold">
          {price}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-heading font-bold text-lg truncate">{name}</h3>
            <p className="text-sm text-muted-foreground truncate">{restaurant}</p>
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="fill-current h-4 w-4" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
