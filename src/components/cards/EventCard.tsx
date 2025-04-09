
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EventCardProps {
  id: string;
  name: string;
  image: string;
  date: string;
  location: string;
  category: string;
  attendees: number;
  className?: string;
}

export const EventCard = ({
  id,
  name,
  image,
  date,
  location,
  category,
  attendees,
  className,
}: EventCardProps) => {
  return (
    <Card className={cn("overflow-hidden card-hover", className)}>
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute top-2 right-2">
          {category}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-heading font-bold text-lg mb-2 line-clamp-2">{name}</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{location}</span>
          </div>
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          {attendees} {attendees === 1 ? 'attendee' : 'attendees'}
        </div>
      </CardContent>
    </Card>
  );
};
