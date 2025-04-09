
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
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const Home = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    search: false,
    features: false,
    showcase: false
  });
  
  const heroRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
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
            setIsVisible(prev => ({ ...prev, features: true }));
          } else if (entry.target === showcaseRef.current && entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, showcase: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) observer.observe(heroRef.current);
    if (searchRef.current) observer.observe(searchRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (showcaseRef.current) observer.observe(showcaseRef.current);
    
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
                    scale: isVisible.features ? [1, 1.1, 1] : 1
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
                    scale: isVisible.features ? [1, 1.1, 1] : 1
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
                    scale: isVisible.features ? [1, 1.1, 1] : 1
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
                    scale: isVisible.features ? [1, 1.1, 1] : 1
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

      {/* Feature Showcase with Screenshots */}
      <section 
        ref={showcaseRef}
        className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5"
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.showcase ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-12 text-center">
              Discover Our Features
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* First Feature - Discovery Feed */}
              <motion.div 
                className="order-2 lg:order-1"
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible.showcase ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-4">Discover Delicious Food</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Browse our curated feed of the best local dishes, recommended by foodies in your area.
                  Filter by cuisine, dietary restrictions, or price range to find exactly what you're craving.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Personalized recommendations based on your preferences</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>High-quality photos of every dish</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Real reviews from local food enthusiasts</span>
                  </li>
                </ul>
                <Button asChild className="rounded-full">
                  <Link to="/feed">Try It Now</Link>
                </Button>
              </motion.div>
              
              <motion.div 
                className="order-1 lg:order-2 relative"
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible.showcase ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Floating elements around the screenshot */}
                <motion.div 
                  className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-primary/30 z-10"
                  animate={{ 
                    y: [0, -15, 0],
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -bottom-5 -left-5 w-12 h-12 rounded-full bg-secondary/30 z-10"
                  animate={{ 
                    x: [0, 10, 0],
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Screenshot */}
                <div className="rounded-xl overflow-hidden shadow-2xl border border-border">
                  <img 
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                    alt="Food discovery feed" 
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
              
              {/* Second Feature - Restaurant Discovery */}
              <motion.div 
                className="order-3 relative"
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible.showcase ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {/* Floating elements around the screenshot */}
                <motion.div 
                  className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-secondary/30 z-10"
                  animate={{ 
                    y: [0, -15, 0],
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -bottom-5 -right-5 w-12 h-12 rounded-full bg-primary/30 z-10"
                  animate={{ 
                    x: [0, -10, 0],
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Screenshot */}
                <div className="rounded-xl overflow-hidden shadow-2xl border border-border">
                  <img 
                    src="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                    alt="Restaurant discovery" 
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="order-4"
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible.showcase ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h3 className="text-2xl font-bold mb-4">Find Perfect Restaurants</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Explore restaurants by location, cuisine type, or special features. 
                  Get all the information you need to make the perfect dining choice.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Detailed restaurant profiles with menus and photos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Filter by distance in miles or kilometers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>See waiting times and make reservations</span>
                  </li>
                </ul>
                <Button asChild className="rounded-full">
                  <Link to="/discover">Discover Restaurants</Link>
                </Button>
              </motion.div>
              
              {/* Third Feature - Food Events */}
              <motion.div 
                className="order-6 lg:order-5"
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible.showcase ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <h3 className="text-2xl font-bold mb-4">Join Exciting Food Events</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Never miss a food festival, cooking class, or tasting event again. 
                  Our calendar keeps you updated on all the food happenings in your area.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Comprehensive calendar of local food events</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Get notifications for events you're interested in</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <span>Connect with other attendees before the event</span>
                  </li>
                </ul>
                <Button asChild className="rounded-full">
                  <Link to="/events">Browse Events</Link>
                </Button>
              </motion.div>
              
              <motion.div 
                className="order-5 lg:order-6 relative"
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible.showcase ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                {/* Floating elements around the screenshot */}
                <motion.div 
                  className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-primary/30 z-10"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -bottom-5 -left-5 w-12 h-12 rounded-full bg-secondary/30 z-10"
                  animate={{ 
                    x: [0, 15, 0],
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Screenshot */}
                <div className="rounded-xl overflow-hidden shadow-2xl border border-border">
                  <img 
                    src="https://images.unsplash.com/photo-1615887399566-826f4c44c96a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                    alt="Food events calendar" 
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>

            {/* App screenshots carousel */}
            <div className="mt-20">
              <h3 className="text-2xl font-bold mb-8 text-center">Experience Our App</h3>
              
              <Carousel className="max-w-4xl mx-auto">
                <CarouselContent>
                  {[
                    {
                      src: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                      alt: "Restaurant page"
                    },
                    {
                      src: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                      alt: "Food item details"
                    },
                    {
                      src: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                      alt: "Events page"
                    }
                  ].map((image, index) => (
                    <CarouselItem key={index} className="md:basis-1/2">
                      <motion.div 
                        className="p-2"
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="rounded-xl overflow-hidden shadow-lg border border-border">
                          <img src={image.src} alt={image.alt} className="w-full h-auto" />
                        </div>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4 gap-4">
                  <CarouselPrevious className="static transform-none" />
                  <CarouselNext className="static transform-none" />
                </div>
              </Carousel>
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
