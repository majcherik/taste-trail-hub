
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Edit2, Settings, Users } from "lucide-react";
import { BadgeGroup, type BadgeType } from "@/components/badges/ProfileBadge";
import { SocialMediaLinks } from "@/components/profile/SocialMediaLinks";
import { LocationSelector } from "@/components/LocationSelector";
import { RestaurantCard } from "@/components/cards/RestaurantCard";
import { EventCard } from "@/components/cards/EventCard";
import { BloggerPostCard } from "@/components/cards/BloggerPostCard";

const initialSocialLinks = [
  {
    id: "1",
    platform: "instagram",
    username: "foodie_alex",
    url: "https://instagram.com/foodie_alex",
    icon: () => null
  },
  {
    id: "2",
    platform: "twitter",
    username: "alexj_food",
    url: "https://twitter.com/alexj_food",
    icon: () => null
  }
];

const userGroups = [
  {
    id: "1",
    name: "Pizza Lovers Club",
    members: 42,
    avatar: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    isPrivate: false,
  },
  {
    id: "2",
    name: "Foodie Adventures",
    members: 128,
    avatar: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    isPrivate: true,
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

const savedRestaurants = [
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
];

const userBadges: BadgeType[] = ['elite', 'creator', 'gourmet', 'patron', 'veteran'];

const Profile = () => {
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);
  
  return (
    <Layout>
      <section className="mb-8">
        <div className="p-6 rounded-xl glass-panel mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 ring-4 ring-primary/20 ring-offset-2 ring-offset-background">
                <AvatarImage src="https://i.pravatar.cc/150?img=33" alt="Alex Johnson" />
                <AvatarFallback className="bg-primary/5">AJ</AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                variant="secondary"
              >
                <Edit2 className="h-4 w-4" />
                <span className="sr-only">Edit profile</span>
              </Button>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between mb-2">
                <div>
                  <h1 className="font-heading text-2xl sm:text-3xl font-bold">Alex Johnson</h1>
                  <BadgeGroup badges={userBadges} className="mt-1" />
                </div>
                <div className="flex items-center gap-2">
                  <LocationSelector className="w-auto" />
                  <Button size="icon" variant="outline">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Settings</span>
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground mb-3 mt-3">
                Food enthusiast exploring the best eats in New York and beyond. Always on the lookout for hidden gems!
              </p>
              
              {/* Social Media Links */}
              <SocialMediaLinks initialLinks={socialLinks} editable={true} />
              
              <div className="flex flex-wrap gap-4 mt-3">
                <div>
                  <span className="font-medium">12</span>
                  <span className="text-muted-foreground ml-1">Reviews</span>
                </div>
                <div>
                  <span className="font-medium">2</span>
                  <span className="text-muted-foreground ml-1">Groups</span>
                </div>
                <div>
                  <span className="font-medium">8</span>
                  <span className="text-muted-foreground ml-1">Events</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="groups" className="mb-8">
          <TabsList className="mb-6 bg-background/50 border p-1 backdrop-blur-sm">
            <TabsTrigger value="groups" className="flex gap-2 items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="h-4 w-4" />
              <span>My Groups</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex gap-2 items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Calendar className="h-4 w-4" />
              <span>Events</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex gap-2 items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <span>Saved Places</span>
            </TabsTrigger>
            <TabsTrigger value="bloggers" className="flex gap-2 items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <span>Food Bloggers</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="groups">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userGroups.map((group) => (
                <Card key={group.id} className="overflow-hidden card-hover luxury-card">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-4 p-4">
                      <Avatar className="h-16 w-16 rounded-md">
                        <AvatarImage src={group.avatar} alt={group.name} />
                        <AvatarFallback>{group.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-heading font-bold">{group.name}</h3>
                          {group.isPrivate && (
                            <span className="text-xs bg-secondary/20 text-secondary rounded-full px-2 py-0.5">
                              Private
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {group.members} members
                        </p>
                        <Button size="sm" className="mt-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-primary-foreground">
                          View Group
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Card className="border-dashed flex items-center justify-center h-32 luxury-card opacity-80 hover:opacity-100 transition-opacity">
                <Button variant="ghost" className="text-lg font-heading">
                  <Users className="mr-2 h-5 w-5" />
                  Create New Group
                </Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
              <Card className="border-dashed flex items-center justify-center h-64 luxury-card opacity-80 hover:opacity-100 transition-opacity">
                <Button variant="ghost" className="text-lg font-heading">
                  <Calendar className="mr-2 h-5 w-5" />
                  Browse More Events
                </Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} {...restaurant} className="luxury-card" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bloggers">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {bloggerPosts.map((post) => (
                <BloggerPostCard key={post.id} {...post} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
};

export default Profile;
