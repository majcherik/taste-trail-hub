
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
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
  ChevronRight,
  Star 
} from "lucide-react";
import { FoodScene } from "@/components/3d/FoodScene";

const Home = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    search: false,
    features: false,
    animation: false
  });
  
  const heroRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.6], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === heroRef.current && entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, hero: true }));
          } else if (entry.target === searchRef.current && entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, search: true }));
          } else if (entry.target === featuresRef.current && entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, features: true, animation: true }));
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
      <div ref={scrollRef} className="relative">
        <motion.section 
          ref={heroRef} 
          className="min-h-[92vh] flex flex-col justify-center items-center relative overflow-hidden"
          style={{ y, opacity, scale }}
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

            {/* Interactive 3D Food Scene */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-8"
            >
              <FoodScene />
            </motion.div>
            
            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            >
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground mb-2">Scroll to explore</p>
                <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
                  <motion.div 
                    className="w-2 h-2 bg-primary rounded-full mt-2"
                    animate={{ 
                      y: [0, 16, 0],
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
      
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
      
      {/* Features Section with Interactive Animations */}
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
                className="bg-card rounded-xl p-6 border border-border shadow-sm relative overflow-hidden"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-primary/10"
                  animate={{ 
                    scale: isVisible.animation ? [1, 1.1, 1] : 1
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Find Local Restaurants</h3>
                <p className="text-muted-foreground">Discover top-rated restaurants in your area with detailed reviews and ratings.</p>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div 
                className="bg-card rounded-xl p-6 border border-border shadow-sm relative overflow-hidden"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-primary/10"
                  animate={{ 
                    scale: isVisible.animation ? [1, 1.1, 1] : 1
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                    delay: 1.0
                  }}
                />
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Utensils className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Explore Special Dishes</h3>
                <p className="text-muted-foreground">Find specific recommended dishes that foodies love, not just restaurants.</p>
              </motion.div>
              
              {/* Feature 3 */}
              <motion.div 
                className="bg-card rounded-xl p-6 border border-border shadow-sm relative overflow-hidden"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-primary/10"
                  animate={{ 
                    scale: isVisible.animation ? [1, 1.1, 1] : 1
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                />
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Join Food Events</h3>
                <p className="text-muted-foreground">Discover and participate in local food events, tastings, and cooking classes.</p>
              </motion.div>
              
              {/* Feature 4 */}
              <motion.div 
                className="bg-card rounded-xl p-6 border border-border shadow-sm relative overflow-hidden"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-primary/10"
                  animate={{ 
                    scale: isVisible.animation ? [1, 1.1, 1] : 1
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                    delay: 2.0
                  }}
                />
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
      
      {/* Interactive Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-12 text-center">
              Join Our Growing Community
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "1M+", label: "Users", icon: Users },
                { number: "50K+", label: "Restaurants", icon: Utensils },
                { number: "100K+", label: "Events", icon: Calendar },
                { number: "4.8", label: "Average Rating", icon: Star },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center justify-center p-6 bg-card rounded-xl border border-border shadow-sm"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
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
