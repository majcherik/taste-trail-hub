
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { LocationSelector } from "@/components/LocationSelector";
import { RestaurantCard } from "@/components/cards/RestaurantCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Search, MapPin, ListFilter, Map as MapIcon, List, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mock restaurants data
const restaurants = [
  {
    id: "1",
    name: "Little Italy Bistro",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewCount: 243,
    cuisines: ["Italian", "Pizza"],
    distance: "0.5 mi",
  },
  {
    id: "2",
    name: "Sushi Paradise",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    rating: 4.5,
    reviewCount: 187,
    cuisines: ["Japanese", "Sushi"],
    distance: "0.8 mi",
  },
  {
    id: "3",
    name: "Taco Fiesta",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    rating: 4.3,
    reviewCount: 156,
    cuisines: ["Mexican", "Tacos"],
    distance: "1.2 mi",
  },
  {
    id: "4",
    name: "Burger Joint",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    reviewCount: 321,
    cuisines: ["American", "Burgers"],
    distance: "0.7 mi",
  },
  {
    id: "5",
    name: "Thai Spice",
    image: "https://images.unsplash.com/photo-1569562211341-aca0940561cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    rating: 4.4,
    reviewCount: 178,
    cuisines: ["Thai", "Asian"],
    distance: "1.5 mi",
  },
  {
    id: "6",
    name: "French Bistro",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviewCount: 143,
    cuisines: ["French", "Fine Dining"],
    distance: "2.1 mi",
  },
];

// Cuisine options for filtering
const cuisineOptions = [
  "American", "Italian", "Mexican", "Japanese", "Chinese", 
  "Thai", "Indian", "French", "Mediterranean", "Korean", 
  "Vietnamese", "Greek", "Spanish", "Middle Eastern"
];

const Discover = () => {
  const [activeView, setActiveView] = useState<"list" | "map">("list");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const toggleCuisine = (cuisine: string) => {
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter(c => c !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold">Discover Restaurants</h1>
          <p className="text-muted-foreground">Find the best places to eat near you</p>
        </div>
        <LocationSelector />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar - Filters on Desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="bg-card rounded-lg border p-4 sticky top-20">
            <h3 className="font-medium mb-4">Filters</h3>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Price Range</h4>
              <Slider 
                defaultValue={[0, 100]} 
                max={100} 
                step={1} 
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$</span>
                <span>$$</span>
                <span>$$$</span>
                <span>$$$$</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Cuisine</h4>
              <div className="flex flex-wrap gap-2">
                {cuisineOptions.slice(0, 12).map(cuisine => (
                  <Badge 
                    key={cuisine} 
                    variant={selectedCuisines.includes(cuisine) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleCuisine(cuisine)}
                  >
                    {cuisine}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and View Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search restaurants or dishes..."
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              {/* Filter button - mobile only */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <ListFilter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your restaurant search
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6">
                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Price Range</h4>
                      <Slider 
                        defaultValue={[0, 100]} 
                        max={100} 
                        step={1} 
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>$</span>
                        <span>$$</span>
                        <span>$$$</span>
                        <span>$$$$</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Cuisine</h4>
                      <div className="flex flex-wrap gap-2">
                        {cuisineOptions.map(cuisine => (
                          <Badge 
                            key={cuisine} 
                            variant={selectedCuisines.includes(cuisine) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => toggleCuisine(cuisine)}
                          >
                            {cuisine}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* View toggle */}
              <div className="border rounded-md flex">
                <Button
                  variant={activeView === "list" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-r-none"
                  onClick={() => setActiveView("list")}
                >
                  <List className="h-4 w-4 mr-1" />
                  List
                </Button>
                <Button
                  variant={activeView === "map" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setActiveView("map")}
                >
                  <MapIcon className="h-4 w-4 mr-1" />
                  Map
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {selectedCuisines.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="text-sm text-muted-foreground py-1">Filters:</div>
              {selectedCuisines.map(cuisine => (
                <Badge key={cuisine} variant="secondary" className="pl-2">
                  {cuisine}
                  <button 
                    onClick={() => toggleCuisine(cuisine)}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {cuisine} filter</span>
                  </button>
                </Badge>
              ))}
              
              {selectedCuisines.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedCuisines([])}
                  className="h-6 py-1 px-2 text-xs"
                >
                  Clear all
                </Button>
              )}
            </div>
          )}

          {/* View Content */}
          <Tabs value={activeView}>
            <TabsContent value="list" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} {...restaurant} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="map" className="mt-0">
              <div className="bg-muted rounded-lg overflow-hidden h-[60vh] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-lg font-medium">Map View</h3>
                  <p className="text-muted-foreground">
                    Interactive map would be displayed here
                  </p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.slice(0, 3).map((restaurant) => (
                  <RestaurantCard key={restaurant.id} {...restaurant} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Discover;
