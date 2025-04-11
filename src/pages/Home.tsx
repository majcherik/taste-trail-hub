
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight } from "lucide-react";
import { FoodBloggerCarousel } from "@/components/carousel/FoodBloggerCarousel";
import { MealCard } from "@/components/cards/MealCard";

// Mock data for highlighted dishes
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
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
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
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState({
    hero: false,
  });
  
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
  
  return (
    <Layout hideBottomNav>
      {/* Hero Section with Search */}
      <section 
        ref={heroRef} 
        className="min-h-[70vh] flex flex-col justify-center items-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100/30 dark:from-amber-900/20 to-transparent -z-10"></div>
        
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-amber-700/10 dark:bg-amber-700/5 blur-3xl"
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
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary/10 dark:bg-secondary/5 blur-3xl"
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
              Discover <span className="text-gradient-primary">Delicious</span> Food Near You
            </h1>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Find top restaurants, specific dishes, and connect with local food enthusiasts in your area
            </p>
            
            {/* Search section moved up */}
            <div className="bg-card/70 dark:bg-card/50 rounded-3xl p-6 backdrop-blur-sm border border-amber-200/20 dark:border-amber-800/20 shadow-lg mb-8">
              <h2 className="font-heading font-bold text-xl md:text-2xl mb-4">
                Find Exactly What You Crave
              </h2>
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for dishes, restaurants, or cuisines..."
                  className="pl-12 h-14 rounded-full text-lg"
                />
                <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-12 luxury-button">
                  Search
                </Button>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <Button variant="outline" size="sm" className="rounded-full border-amber-200/50 dark:border-amber-800/50">Pizza</Button>
                <Button variant="outline" size="sm" className="rounded-full border-amber-200/50 dark:border-amber-800/50">Sushi</Button>
                <Button variant="outline" size="sm" className="rounded-full border-amber-200/50 dark:border-amber-800/50">Thai</Button>
                <Button variant="outline" size="sm" className="rounded-full border-amber-200/50 dark:border-amber-800/50">Italian</Button>
                <Button variant="outline" size="sm" className="rounded-full border-amber-200/50 dark:border-amber-800/50">Vegetarian</Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full text-lg px-8 luxury-button">
                <Link to="/feed">Explore Food</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full text-lg px-8 border-amber-700/30 dark:border-amber-700/50">
                <Link to="/discover">Find Restaurants</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full text-lg px-8">
                <Link to="/about">About Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Highlighted Dishes Section */}
      <section className="mt-16 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold">
            <span className="text-gradient-primary">Highlighted</span> Dishes
          </h2>
          <Button variant="ghost" size="sm" asChild className="text-amber-800 dark:text-amber-500">
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
      
      {/* Food Blogger Carousel Section */}
      <section className="mt-16 mb-12">
        <FoodBloggerCarousel />
      </section>
    </Layout>
  );
};

export default Home;
