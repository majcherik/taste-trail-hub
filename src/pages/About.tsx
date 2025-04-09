
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Utensils,
  ArrowRight, 
  ChevronRight
} from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const About = () => {
  return (
    <Layout>
      {/* Features Section with Interactive Animations */}
      <section className="py-12 px-4 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
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
                    scale: [1, 1.1, 1]
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
                    scale: [1, 1.1, 1]
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
                    scale: [1, 1.1, 1]
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
                    scale: [1, 1.1, 1]
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
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
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
                animate={{ opacity: 1, x: 0 }}
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
                animate={{ opacity: 1, x: 0 }}
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
                animate={{ opacity: 1, x: 0 }}
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
                animate={{ opacity: 1, x: 0 }}
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
                animate={{ opacity: 1, x: 0 }}
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
                animate={{ opacity: 1, x: 0 }}
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

export default About;
