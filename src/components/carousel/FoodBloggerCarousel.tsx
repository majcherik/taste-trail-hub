
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Instagram } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FoodBlogger {
  id: string;
  name: string;
  username: string;
  avatar: string;
  location: {
    city: string;
    country: string;
  };
  image: string;
  caption: string;
  likes: number;
  followers: number;
}

const bloggers: FoodBlogger[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    username: "foodie_sarah",
    avatar: "https://i.pravatar.cc/150?img=32",
    location: {
      city: "New York",
      country: "USA"
    },
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    caption: "Best avocado toast in town! The perfect balance of creamy avocado, tangy lemon, and just the right amount of red pepper flakes.",
    likes: 2453,
    followers: 54500
  },
  {
    id: "2",
    name: "Marco Rossi",
    username: "pasta_master",
    avatar: "https://i.pravatar.cc/150?img=12",
    location: {
      city: "Rome",
      country: "Italy"
    },
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    caption: "Handmade pasta just like nonna taught me. The secret is in the flour and taking your time with the dough.",
    likes: 3287,
    followers: 87300
  },
  {
    id: "3",
    name: "Aiko Tanaka",
    username: "tokyo_tastes",
    avatar: "https://i.pravatar.cc/150?img=44",
    location: {
      city: "Tokyo",
      country: "Japan"
    },
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    caption: "Exploring hidden sushi gems in Tsukiji today. This omakase experience was truly exceptional.",
    likes: 1982,
    followers: 63700
  },
  {
    id: "4",
    name: "Carlos Mendez",
    username: "taco_carlos",
    avatar: "https://i.pravatar.cc/150?img=67",
    location: {
      city: "Mexico City",
      country: "Mexico"
    },
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    caption: "Street tacos are the heart and soul of Mexican cuisine. Always fresh, always authentic!",
    likes: 2121,
    followers: 42900
  },
  {
    id: "5",
    name: "Emma Chen",
    username: "dimsum_diaries",
    avatar: "https://i.pravatar.cc/150?img=25",
    location: {
      city: "Hong Kong",
      country: "China"
    },
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    caption: "Sunday yum cha with family is a tradition. These har gow dumplings are simply perfect.",
    likes: 1765,
    followers: 38200
  }
];

export function FoodBloggerCarousel() {
  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading font-bold">
          <span className="text-gradient-primary">Popular</span> Food Bloggers
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {bloggers.map((blogger) => (
            <CarouselItem key={blogger.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="h-full p-1">
                <BloggerCard blogger={blogger} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:flex mt-4 justify-end gap-2">
          <CarouselPrevious className="static translate-y-0 mx-1" />
          <CarouselNext className="static translate-y-0 mx-1" />
        </div>
      </Carousel>
    </section>
  );
}

function BloggerCard({ blogger }: { blogger: FoodBlogger }) {
  return (
    <Card className="overflow-hidden card-hover luxury-card h-full border-gold/20 hover:border-gold/40 transition-all duration-300">
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={blogger.avatar} alt={blogger.name} />
            <AvatarFallback>{blogger.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium line-clamp-1">{blogger.name}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Instagram className="h-3 w-3" />
              @{blogger.username}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{blogger.location.city}, {blogger.location.country}</span>
        </div>
      </div>
      
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={blogger.image} 
          alt={`Food post by ${blogger.name}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <div className="text-white text-xs flex justify-between">
            <div>{formatter.format(blogger.followers)} followers</div>
            <div>{formatter.format(blogger.likes)} likes</div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-3">
        <p className="text-sm line-clamp-2">{blogger.caption}</p>
        <div className="mt-3">
          <Badge variant="outline" className="border-gold/30 bg-gold/5 text-gold hover:bg-gold/10">
            <Instagram className="mr-1 h-3 w-3" />
            Follow
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

// Number formatter for likes and followers
const formatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short'
});
