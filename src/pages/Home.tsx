
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FoodBloggerCarousel } from "@/components/carousel/FoodBloggerCarousel";

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
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-secondary/10 -z-10"></div>
        
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
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
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary/20 blur-3xl"
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
            
            {/* Search section moved up */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-6 backdrop-blur-sm border border-border shadow-lg mb-8">
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
                <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-12">
                  Search
                </Button>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <Button variant="outline" size="sm" className="rounded-full">Pizza</Button>
                <Button variant="outline" size="sm" className="rounded-full">Sushi</Button>
                <Button variant="outline" size="sm" className="rounded-full">Thai</Button>
                <Button variant="outline" size="sm" className="rounded-full">Italian</Button>
                <Button variant="outline" size="sm" className="rounded-full">Vegetarian</Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full text-lg px-8">
                <Link to="/feed">Explore Food</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full text-lg px-8">
                <Link to="/discover">Find Restaurants</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full text-lg px-8">
                <Link to="/about">About Us</Link>
              </Button>
            </div>
          </motion.div>
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

