
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight, MapPin } from "lucide-react";
import { FoodBloggerCarousel } from "@/components/carousel/FoodBloggerCarousel";
import { MealCard } from "@/components/cards/MealCard";
import { cn } from "@/lib/utils";

const highlightedDishes = [
  {
    id: "dish1",
    name: "Truffle Risotto",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    restaurant: "Bella Cucina",
    rating: 4.9,
    reviewCount: 124,
    price: "$32",
    tags: ["Italian", "Vegetarian", "Featured"],
    distance: "2.3 mi"
  },
  {
    id: "dish2",
    name: "Wagyu Beef Steak",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    restaurant: "Prime Steakhouse",
    rating: 4.8,
    reviewCount: 156,
    price: "$75",
    tags: ["Steakhouse", "Premium", "Featured"],
    distance: "1.7 mi"
  },
  {
    id: "dish3",
    name: "Seafood Paella",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    restaurant: "Barcelona Tapas",
    rating: 4.7,
    reviewCount: 98,
    price: "$42",
    tags: ["Spanish", "Seafood", "Featured"],
    distance: "3.1 mi"
  },
  {
    id: "dish4",
    name: "Matcha Tiramisu",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    restaurant: "Sweet Fusion",
    rating: 4.6,
    reviewCount: 84,
    price: "$14",
    tags: ["Dessert", "Fusion", "Featured"],
    distance: "0.9 mi"
  }
];

const Home = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState({
    hero: false,
  });
  const [activeTab, setActiveTab] = useState("explore");
  const [locationQuery, setLocationQuery] = useState("");
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === heroRef.current && entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, hero: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) observer.observe(heroRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    switch(value) {
      case "feed":
        navigate("/feed");
        break;
      case "restaurants":
        navigate("/discover");
        break;
      case "events":
        navigate("/events");
        break;
      case "groups":
        navigate("/groups");
        break;
      default:
        navigate("/");
    }
  };
  
  const locationSuggestions = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ"
  ];
  
  const filteredSuggestions = locationQuery
    ? locationSuggestions.filter(loc => 
        loc.toLowerCase().includes(locationQuery.toLowerCase())
      )
    : [];
  
  return (
    <Layout hideBottomNav>
      <section 
        ref={heroRef} 
        className="min-h-[70vh] flex flex-col justify-center items-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-background/30 -z-10"></div>
        
        <div className="absolute inset-0 backdrop-blur-sm bg-background/30 -z-20"></div>
        
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-warm-500/10 dark:bg-warm-500/5 blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0], 
          }}
          transition={{ 
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-warm-400/10 dark:bg-warm-400/5 blur-3xl"
          animate={{ 
            x: [0, -60, 0],
            y: [0, 40, 0], 
          }}
          transition={{ 
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut"
          }}
        />
        
        <div className="container text-center px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.hero ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              Discover <span className="text-primary">Delicious</span> Food Near You
            </h1>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Find top restaurants, specific dishes, and connect with local food enthusiasts in your area
            </p>
            
            <div className="glass-panel max-w-md mx-auto mb-8 p-4 rounded-xl">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Enter your location..."
                  className="pl-10 h-12 text-base"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
                
                {locationQuery && filteredSuggestions.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-card border border-border rounded-md shadow-md">
                    {filteredSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-2 hover:bg-warm-500/10 transition-colors"
                        onClick={() => {
                          setLocationQuery(suggestion);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          {suggestion}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="w-full max-w-2xl mx-auto glass-panel p-2 rounded-xl">
          <div className="w-full grid grid-cols-5 gap-1">
            <TabButton 
              active={activeTab === "explore"} 
              onClick={() => handleTabChange("explore")}
            >
              Explore
            </TabButton>
            <TabButton 
              active={activeTab === "feed"} 
              onClick={() => handleTabChange("feed")}
            >
              Feed
            </TabButton>
            <TabButton 
              active={activeTab === "restaurants"} 
              onClick={() => handleTabChange("restaurants")}
            >
              Restaurants
            </TabButton>
            <TabButton 
              active={activeTab === "events"} 
              onClick={() => handleTabChange("events")}
            >
              Events
            </TabButton>
            <TabButton 
              active={activeTab === "groups"} 
              onClick={() => handleTabChange("groups")}
            >
              Groups
            </TabButton>
          </div>
        </div>
      </section>
      
      <section className="mt-16 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold">
            <span className="text-primary">Highlighted</span> Dishes
          </h2>
          <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary/80">
            <Link to="/discover" className="flex items-center gap-1">
              <span>View all</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlightedDishes.map((dish) => (
            <MealCard key={dish.id} {...dish} />
          ))}
        </div>
      </section>
      
      <section className="mt-16 mb-12">
        <FoodBloggerCarousel />
      </section>
    </Layout>
  );
};

// Create a new TabButton component for better hover effects
interface TabButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const TabButton = ({ children, active, onClick }: TabButtonProps) => {
  return (
    <button
      className={cn(
        "py-2 px-3 rounded-md transition-colors relative overflow-hidden tab-button",
        active ? "text-primary bg-warm-50/30 dark:bg-warm-900/30" : "text-foreground"
      )}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      {active && (
        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
      )}
    </button>
  );
};

export default Home;
