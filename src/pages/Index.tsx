
import { Layout } from "@/components/layout/Layout";
import { LocationSelector } from "@/components/LocationSelector";
import { RestaurantCard } from "@/components/cards/RestaurantCard";
import { EventCard } from "@/components/cards/EventCard";
import { BloggerPostCard } from "@/components/cards/BloggerPostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight } from "lucide-react";

// Mock data
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
];

const events = [
  {
    id: "1",
    name: "Pasta Making Workshop",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "Apr 12, 2025 • 6:00 PM",
    location: "Culinary Institute, Downtown",
    category: "Workshop",
    attendees: 28,
  },
  {
    id: "2",
    name: "Wine & Cheese Tasting",
    image: "https://images.unsplash.com/photo-1615887399566-826f4c44c96a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "Apr 15, 2025 • 7:30 PM",
    location: "Vintage Wine Bar",
    category: "Tasting",
    attendees: 42,
  },
];

const bloggerPosts = [
  {
    id: "1",
    bloggerName: "Sarah's Food Adventures",
    bloggerUsername: "foodie_sarah",
    bloggerAvatar: "https://i.pravatar.cc/150?img=32",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    caption: "Best avocado toast in town! The perfect balance of creamy avocado, tangy lemon, and just the right amount of red pepper flakes. #brunchgoals",
    likes: 237,
    comments: 42,
  },
  {
    id: "2",
    bloggerName: "The Hungry Explorer",
    bloggerUsername: "hungry_explorer",
    bloggerAvatar: "https://i.pravatar.cc/150?img=12",
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    caption: "This ramen changed my life! Rich, flavorful broth with perfectly cooked noodles and the chashu pork melts in your mouth. Worth the wait!",
    likes: 412,
    comments: 73,
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-r from-primary-500/20 to-secondary/20 -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 py-10 mb-8 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Discover <span className="text-primary">Delicious</span> Food Near You
          </h1>
          <p className="text-lg mb-6 text-muted-foreground">
            Find top restaurants, specific dishes, and connect with local food enthusiasts
          </p>
          
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for restaurants, dishes, or cuisines..."
              className="pl-10 h-12 rounded-full"
            />
            <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full" size="sm">
              Search
            </Button>
          </div>
          
          <div className="flex justify-center mt-4">
            <LocationSelector />
          </div>
        </div>
      </section>

      {/* Nearby Restaurants Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold">Nearby Restaurants</h2>
          <Button variant="ghost" size="sm" asChild>
            <a href="/discover" className="flex items-center gap-1">
              <span>View all</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold">Upcoming Events</h2>
          <Button variant="ghost" size="sm" asChild>
            <a href="/events" className="flex items-center gap-1">
              <span>View all</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </section>

      {/* Foodie Finds Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold">Local Foodie Finds</h2>
          <Button variant="ghost" size="sm" asChild>
            <a href="/bloggers" className="flex items-center gap-1">
              <span>View all</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {bloggerPosts.map((post) => (
            <BloggerPostCard key={post.id} {...post} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
