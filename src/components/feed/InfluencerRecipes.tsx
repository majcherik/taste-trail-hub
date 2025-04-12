
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";

interface Influencer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  followers: number;
}

interface Recipe {
  id: string;
  title: string;
  image: string;
  description: string;
  cookTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  influencerId: string;
}

// Mock data for influencers
const influencers: Influencer[] = [
  {
    id: "inf1",
    name: "Chef Maria",
    username: "chef_maria_cooks",
    avatar: "https://i.pravatar.cc/150?img=29",
    verified: true,
    followers: 1240000
  },
  {
    id: "inf2",
    name: "Healthy Eats",
    username: "healthy_plates",
    avatar: "https://i.pravatar.cc/150?img=37",
    verified: true,
    followers: 875000
  },
  {
    id: "inf3",
    name: "Quick Meals",
    username: "30min_dinners",
    avatar: "https://i.pravatar.cc/150?img=13",
    verified: false,
    followers: 540000
  }
];

// Mock data for recipes
const recipes: Recipe[] = [
  {
    id: "rec1",
    title: "Avocado Toast with Poached Eggs",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Start your day right with this protein-packed breakfast that's both nutritious and delicious!",
    cookTime: "15 mins",
    difficulty: "Easy",
    influencerId: "inf1"
  },
  {
    id: "rec2",
    title: "Rainbow Buddha Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "A colorful mix of roasted vegetables, quinoa, and a tahini dressing that's perfect for meal prep.",
    cookTime: "30 mins",
    difficulty: "Medium",
    influencerId: "inf2"
  },
  {
    id: "rec3",
    title: "15-Minute Pasta Primavera",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "A quick and easy pasta loaded with fresh vegetables and a light garlic olive oil sauce.",
    cookTime: "15 mins",
    difficulty: "Easy",
    influencerId: "inf3"
  },
  {
    id: "rec4",
    title: "Chocolate Avocado Mousse",
    image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "A healthier twist on the classic dessert that's just as creamy and decadent.",
    cookTime: "10 mins",
    difficulty: "Easy",
    influencerId: "inf1"
  }
];

export function InfluencerRecipes() {
  const [selectedInfluencer, setSelectedInfluencer] = useState<string | "all">("all");
  
  const filteredRecipes = selectedInfluencer === "all" 
    ? recipes 
    : recipes.filter(recipe => recipe.influencerId === selectedInfluencer);
  
  const getInfluencerById = (id: string) => {
    return influencers.find(inf => inf.id === id);
  };
  
  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };
  
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading font-bold">
          <span className="text-secondary">Instagram</span> Influencer Recipes
        </h2>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <Button 
          variant={selectedInfluencer === "all" ? "default" : "outline"}
          size="sm" 
          className="rounded-full"
          onClick={() => setSelectedInfluencer("all")}
        >
          All Influencers
        </Button>
        {influencers.map(inf => (
          <Button 
            key={inf.id} 
            variant={selectedInfluencer === inf.id ? "default" : "outline"}
            size="sm" 
            className="rounded-full flex items-center gap-2"
            onClick={() => setSelectedInfluencer(inf.id)}
          >
            <Avatar className="h-5 w-5">
              <AvatarImage src={inf.avatar} alt={inf.name} />
              <AvatarFallback>{inf.name[0]}</AvatarFallback>
            </Avatar>
            {inf.name}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRecipes.map(recipe => {
          const influencer = getInfluencerById(recipe.influencerId);
          return (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 card-hover fancy-card">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-secondary/80 text-secondary-foreground">
                    {recipe.difficulty}
                  </Badge>
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-sm">{recipe.cookTime}</p>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-2">{recipe.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {recipe.description}
                </p>
                
                {influencer && (
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={influencer.avatar} alt={influencer.name} />
                        <AvatarFallback>{influencer.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="text-xs">
                        <div className="flex items-center gap-1">
                          <span>@{influencer.username}</span>
                          {influencer.verified && (
                            <span className="text-secondary text-[10px]">✓</span>
                          )}
                        </div>
                        <div className="text-muted-foreground">
                          {formatFollowers(influencer.followers)} followers
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <Instagram className="h-4 w-4 text-secondary" />
                    </Button>
                  </div>
                )}
                
                <div className="mt-4 text-center">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to={`/recipe/${recipe.id}`}>View Recipe</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
