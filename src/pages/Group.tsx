
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Calendar, MessageSquare, Plus, Send } from "lucide-react";
import { GroupCalendar } from "@/components/groups/GroupCalendar";

// Mock group data
const mockGroup = {
  id: "italian-food-lovers",
  name: "Italian Food Lovers",
  description: "A community of people passionate about authentic Italian cuisine. Share recipes, restaurant recommendations, and organize meetups!",
  memberCount: 248,
  image: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  isJoined: true,
};

// Mock members data
const mockMembers = Array(8).fill(null).map((_, i) => ({
  id: `member-${i + 1}`,
  name: `User ${i + 1}`,
  avatar: `https://i.pravatar.cc/150?u=${i + 1}`,
  role: i === 0 ? "Admin" : i < 3 ? "Moderator" : "Member",
}));

// Mock posts data
const mockPosts = [
  {
    id: "post-1",
    author: {
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?u=jane",
    },
    content: "Just discovered the most amazing tiramisu at Bella Vita! Anyone want to join me there this weekend?",
    time: "2 hours ago",
    likes: 15,
    comments: 3,
  },
  {
    id: "post-2",
    author: {
      name: "Robert Johnson",
      avatar: "https://i.pravatar.cc/150?u=robert",
    },
    content: "I'm organizing a pasta-making workshop next Saturday at my restaurant. Limited spots available, let me know if you're interested!",
    time: "5 hours ago",
    likes: 27,
    comments: 8,
  },
];

// Mock events data
const mockEvents = [
  {
    id: "event-1",
    title: "Pasta Making Workshop",
    date: new Date(2025, 3, 15, 18, 30),
    type: "workshop" as const,
  },
  {
    id: "event-2",
    title: "Wine & Cheese Tasting",
    date: new Date(2025, 3, 20, 19, 0),
    type: "tasting" as const,
  },
  {
    id: "event-3",
    title: "Group Dinner at La Trattoria",
    date: new Date(2025, 3, 25, 20, 0),
    type: "meetup" as const,
  },
  {
    id: "event-4",
    title: "Pizza Review Tour",
    date: new Date(2025, 4, 5, 12, 0),
    type: "other" as const,
  },
];

const Group = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("feed");
  const [message, setMessage] = useState("");
  
  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would send this message to your backend
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Group Header */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <div className="h-48 bg-gradient-to-r from-primary/30 to-secondary/30">
            {mockGroup.image && (
              <img 
                src={mockGroup.image} 
                alt={mockGroup.name} 
                className="h-full w-full object-cover opacity-50"
              />
            )}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{mockGroup.name}</h1>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{mockGroup.memberCount} members</span>
                </div>
              </div>
              
              <Button variant={mockGroup.isJoined ? "outline" : "default"}>
                {mockGroup.isJoined ? "Joined" : "Join Group"}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Group Description */}
        <div className="mb-8 bg-card rounded-lg p-4 border">
          <h2 className="text-lg font-semibold mb-2">About this group</h2>
          <p className="text-muted-foreground">{mockGroup.description}</p>
        </div>
        
        {/* Group Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="feed" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Discussion</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="members" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Members</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Feed/Discussion Tab */}
          <TabsContent value="feed" className="space-y-6">
            {/* New Post Input */}
            <div className="flex items-start gap-4 bg-card rounded-lg p-4 border">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/150?u=user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Input
                  placeholder="Share something with the group..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mb-3"
                />
                <div className="flex justify-end">
                  <Button onClick={handleSendMessage} className="flex items-center gap-2">
                    Post <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Posts */}
            {mockPosts.map((post) => (
              <div key={post.id} className="bg-card rounded-lg p-4 border">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{post.author.name}</div>
                    <div className="text-xs text-muted-foreground">{post.time}</div>
                  </div>
                </div>
                <p className="mb-4">{post.content}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <span>👍</span> Like ({post.likes})
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <span>💬</span> Comment ({post.comments})
                  </button>
                </div>
              </div>
            ))}
          </TabsContent>
          
          {/* Events Tab */}
          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GroupCalendar events={mockEvents} groupName={mockGroup.name} />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-lg">Upcoming Events</h3>
                  <Button size="sm" className="flex items-center gap-1">
                    <Plus className="h-4 w-4" /> New Event
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {mockEvents.map((event) => (
                    <div 
                      key={event.id}
                      className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {event.date.toLocaleDateString()} at {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Members Tab */}
          <TabsContent value="members">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg">Group Members</h3>
                <Input placeholder="Search members..." className="max-w-xs" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mockMembers.map((member) => (
                  <div 
                    key={member.id}
                    className="p-4 border rounded-lg flex flex-col items-center text-center hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="h-16 w-16 mb-2">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-xs text-muted-foreground">{member.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Group;
