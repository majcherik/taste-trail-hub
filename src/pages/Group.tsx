
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EventCard } from "@/components/cards/EventCard";
import { MessageSquare, ThumbsUp, Share2, Calendar, Users, Image, Send } from "lucide-react";

// Mock Events
const groupEvents = [
  {
    id: "1",
    name: "Pizza Making Workshop for Group Members",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "Apr 20, 2025 • 6:00 PM",
    location: "Luigi's Pizza Kitchen",
    category: "Workshop",
    attendees: 12,
  },
  {
    id: "2",
    name: "Monthly Group Dinner",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "Apr 25, 2025 • 7:30 PM",
    location: "Giovanni's Italian Restaurant",
    category: "Dinner",
    attendees: 18,
  },
];

// Mock Posts
const groupPosts = [
  {
    id: "1",
    author: {
      name: "Emily Chen",
      avatar: "https://i.pravatar.cc/150?img=29",
    },
    content: "Just tried the new Margherita pizza at Luigi's. It's the most authentic Neapolitan pizza I've had outside of Italy! The crust was perfectly charred and the tomatoes were so fresh. Has anyone else been there yet?",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    timestamp: "2 hours ago",
    likes: 15,
    comments: 7,
  },
  {
    id: "2",
    author: {
      name: "David Wilson",
      avatar: "https://i.pravatar.cc/150?img=51",
    },
    content: "I'm looking for recommendations for the best deep dish pizza in the city. I've tried Lou's and Gino's, but I feel like I'm missing out on some hidden gems. Any suggestions from fellow pizza enthusiasts?",
    image: "",
    timestamp: "Yesterday",
    likes: 8,
    comments: 12,
  },
];

// Mock Members
const groupMembers = Array.from({ length: 15 }, (_, i) => ({
  id: `member-${i + 1}`,
  name: `Member ${i + 1}`,
  avatar: `https://i.pravatar.cc/150?img=${30 + i}`,
  role: i < 2 ? "Admin" : "Member",
  joinedDate: "Joined Apr 2025",
}));

const Group = () => {
  const [newPost, setNewPost] = useState("");

  return (
    <Layout>
      {/* Group Header */}
      <div 
        className="relative -mx-6 md:-mx-12 lg:-mx-24 h-64 bg-cover bg-center mb-16"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')" 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90"></div>
        
        <div className="container relative z-10 h-full flex flex-col justify-end pb-2">
          <div className="absolute bottom-0 transform translate-y-1/2 left-8 rounded-xl overflow-hidden border-4 border-background">
            <Avatar className="h-24 w-24 rounded-none">
              <AvatarImage 
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Pizza Lovers Club" 
              />
              <AvatarFallback className="rounded-none">PLC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center ml-32 md:ml-0">
        <div>
          <h1 className="font-heading text-3xl font-bold">Pizza Lovers Club</h1>
          <p className="text-muted-foreground">42 members • Public Group</p>
        </div>
        <Button>Join Group</Button>
      </div>

      <Tabs defaultValue="feed" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="feed" className="flex gap-2 items-center">
            <MessageSquare className="h-4 w-4" />
            <span>Feed</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex gap-2 items-center">
            <Calendar className="h-4 w-4" />
            <span>Events</span>
          </TabsTrigger>
          <TabsTrigger value="members" className="flex gap-2 items-center">
            <Users className="h-4 w-4" />
            <span>Members</span>
          </TabsTrigger>
        </TabsList>

        {/* Feed Tab */}
        <TabsContent value="feed">
          {/* Post Creator */}
          <Card className="mb-6">
            <CardHeader className="p-4 pb-0">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?img=33" alt="Your Profile" />
                  <AvatarFallback>YP</AvatarFallback>
                </Avatar>
                <Textarea 
                  placeholder="Share your thoughts with the group..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="flex-1 resize-none"
                />
              </div>
            </CardHeader>
            <CardFooter className="p-4 flex justify-between">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Image className="h-4 w-4 mr-2" />
                  Photo
                </Button>
              </div>
              <Button size="sm" disabled={!newPost.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Post
              </Button>
            </CardFooter>
          </Card>

          {/* Posts */}
          {groupPosts.map((post) => (
            <Card key={post.id} className="mb-6">
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{post.author.name}</div>
                      <div className="text-xs text-muted-foreground">{post.timestamp}</div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <p className="mb-4">{post.content}</p>
                {post.image && (
                  <div className="rounded-md overflow-hidden mb-4">
                    <img src={post.image} alt="Post" className="w-full" />
                  </div>
                )}
                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 border-t">
                <div className="flex w-full justify-between">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Comment
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events">
          <div className="flex justify-between mb-6">
            <h2 className="font-heading text-2xl font-bold">Upcoming Group Events</h2>
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members">
          <div className="flex justify-between mb-6">
            <h2 className="font-heading text-2xl font-bold">Group Members</h2>
            <div className="flex gap-2">
              <Input 
                placeholder="Search members..." 
                className="max-w-xs"
              />
              <Button variant="outline">Invite</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {groupMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Avatar className="h-16 w-16 mb-3">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-xs text-muted-foreground mb-1">{member.role}</div>
                  <div className="text-xs text-muted-foreground">{member.joinedDate}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Group;
