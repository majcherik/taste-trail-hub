
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Utensils,
  ArrowRight, 
  ChevronRight 
} from "lucide-react";

const Home = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    search: false,
    features: false
  });
  
  const heroRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === heroRef.current && entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, hero: true }));
          } else if (entry.target === searchRef.current && entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, search: true }));
          } else if (entry.target === featuresRef.current && entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, features: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) observer.observe(heroRef.current);
    if (searchRef.current) observer.observe(searchRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <Layout hideBottomNav>
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="min-h-[85vh] flex flex-col justify-center items-center relative overflow-hidden"
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
        
        <div className="container text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.hero ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl mb-6">
              Discover <span className="text-primary">Delicious</span> Food Near You
            </h1>
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Find top restaurants, specific dishes, and connect with local food enthusiasts in your area
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full text-lg px-8">
                <Link to="/feed">Explore Food</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full text-lg px-8">
                <Link to="/discover">Find Restaurants</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Search Section */}
      <section 
        ref={searchRef}
        className="py-20 px-4"
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.search ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 backdrop-blur-sm border border-border shadow-lg">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 text-center">
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
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="py-20 px-4 bg-background"
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.features ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-12 text-center">
              How Food Finder Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <motion.div 
                className="bg-card rounded-xl p-6 border border-border shadow-sm"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Find Local Restaurants</h3>
                <p className="text-muted-foreground">Discover top-rated restaurants in your area with detailed reviews and ratings.</p>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div 
                className="bg-card rounded-xl p-6 border border-border shadow-sm"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Utensils className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Explore Special Dishes</h3>
                <p className="text-muted-foreground">Find specific recommended dishes that foodies love, not just restaurants.</p>
              </motion.div>
              
              {/* Feature 3 */}
              <motion.div 
                className="bg-card rounded-xl p-6 border border-border shadow-sm"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Join Food Events</h3>
                <p className="text-muted-foreground">Discover and participate in local food events, tastings, and cooking classes.</p>
              </motion.div>
              
              {/* Feature 4 */}
              <motion.div 
                className="bg-card rounded-xl p-6 border border-border shadow-sm"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Join Foodie Groups</h3>
                <p className="text-muted-foreground">Connect with like-minded food enthusiasts and join local dining groups.</p>
              </motion.div>
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/feed" className="flex items-center gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
              Ready to Discover Amazing Food?
            </h2>
            <p className="text-xl mb-8 text-muted-foreground">
              Join thousands of food enthusiasts and start exploring today
            </p>
            <Button asChild size="lg" className="rounded-full text-lg px-8">
              <Link to="/feed">Start Exploring</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
