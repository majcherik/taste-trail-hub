
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rating } from "@/components/Rating";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { StarIcon, MapPinIcon, Clock, CalendarIcon, Users, Phone, Globe, ExternalLink, Check, X } from "lucide-react";
import { RestaurantMap } from "@/components/RestaurantMap";
import { DishCard } from "@/components/cards/DishCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";

// Mock data for demonstration
const mockRestaurantData = {
  id: "123",
  name: "Elysian Table",
  description: "An award-winning fine dining restaurant featuring modern interpretations of classic Mediterranean cuisine using locally-sourced, seasonal ingredients.",
  address: "123 Gourmet Avenue, Culinary District",
  phone: "+1 (555) 123-4567",
  website: "https://elysiantable.com",
  hours: {
    monday: "5:00 PM - 10:00 PM",
    tuesday: "5:00 PM - 10:00 PM",
    wednesday: "5:00 PM - 10:00 PM",
    thursday: "5:00 PM - 11:00 PM",
    friday: "5:00 PM - 11:00 PM",
    saturday: "4:00 PM - 11:00 PM",
    sunday: "4:00 PM - 9:00 PM"
  },
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ],
  coverImage: "/placeholder.svg",
  ratings: {
    overall: 4.8,
    foodFinder: 4.7,
    google: 4.8,
    atmosphere: 4.9,
    service: 4.8,
    value: 4.5
  },
  priceRange: "$$$",
  cuisine: ["Mediterranean", "Fine Dining", "Modern European"],
  features: ["Outdoor Seating", "Private Dining", "Full Bar", "Wine List", "Vegan Options"],
  acceptsReservations: true,
  popular: true,
  menu: {
    categories: [
      {
        name: "Starters",
        items: [
          {
            id: "s1",
            name: "Truffle Arancini",
            description: "Wild mushroom and black truffle arancini with saffron aioli",
            price: 18,
            image: "/placeholder.svg",
            rating: 4.7,
            popular: true,
            dietaryOptions: ["Vegetarian"]
          },
          {
            id: "s2",
            name: "Citrus Cured Hamachi",
            description: "Thinly sliced yellowtail with citrus, avocado, radish and jalapeño",
            price: 22,
            image: "/placeholder.svg",
            rating: 4.9,
            popular: true,
            dietaryOptions: ["Gluten-Free"]
          }
        ]
      },
      {
        name: "Main Courses",
        items: [
          {
            id: "m1",
            name: "Herb Crusted Rack of Lamb",
            description: "With potato fondant, heirloom carrots and rosemary jus",
            price: 42,
            image: "/placeholder.svg",
            rating: 4.8,
            popular: true
          },
          {
            id: "m2",
            name: "Pan Seared Sea Bass",
            description: "With saffron risotto, asparagus and lemon beurre blanc",
            price: 38,
            image: "/placeholder.svg",
            rating: 4.6,
            dietaryOptions: ["Gluten-Free"]
          }
        ]
      },
      {
        name: "Desserts",
        items: [
          {
            id: "d1",
            name: "Vanilla Bean Panna Cotta",
            description: "With seasonal berries and honeycomb",
            price: 14,
            image: "/placeholder.svg",
            rating: 4.5,
            dietaryOptions: ["Vegetarian", "Gluten-Free"]
          },
          {
            id: "d2",
            name: "Dark Chocolate Soufflé",
            description: "With Grand Marnier crème anglaise (15 minute preparation time)",
            price: 16,
            image: "/placeholder.svg",
            rating: 4.9,
            popular: true,
            dietaryOptions: ["Vegetarian"]
          }
        ]
      }
    ]
  },
  topDishes: [
    {
      id: "s2",
      name: "Citrus Cured Hamachi",
      image: "/placeholder.svg",
      rating: 4.9,
      price: 22
    },
    {
      id: "d2",
      name: "Dark Chocolate Soufflé",
      image: "/placeholder.svg",
      rating: 4.9,
      price: 16
    },
    {
      id: "m1",
      name: "Herb Crusted Rack of Lamb",
      image: "/placeholder.svg",
      rating: 4.8,
      price: 42
    }
  ],
  reviews: [
    {
      id: "r1",
      userName: "Alice S.",
      userImage: "/placeholder.svg",
      date: "June 12, 2023",
      rating: 5,
      text: "An exceptional dining experience! The lamb was cooked to perfection, and the wine pairing recommendation was spot on. The ambiance was elegant yet comfortable."
    },
    {
      id: "r2",
      userName: "Michael R.",
      userImage: "/placeholder.svg",
      date: "May 28, 2023",
      rating: 4,
      text: "Fantastic food and attentive service. The chocolate soufflé is not to be missed! My only criticism would be that the tables are a bit close together."
    }
  ]
};

// Time slots for reservation
const timeSlots = [
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", 
  "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", 
  "9:00 PM"
];

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(mockRestaurantData);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [partySize, setPartySize] = useState("2");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>();
  const [availableTimeSlots, setAvailableTimeSlots] = useState(timeSlots);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  // In a real app, fetch restaurant data based on ID
  useEffect(() => {
    // Fetch restaurant data
    // For now, we're using mock data
  }, [id]);

  // In a real app, this would fetch available time slots based on date and party size
  useEffect(() => {
    // Simulate fetching available time slots
    // For demonstration, we'll randomly remove some time slots
    const available = timeSlots.filter(() => Math.random() > 0.3);
    setAvailableTimeSlots(available.length > 0 ? available : timeSlots.slice(0, 3));
    setSelectedTimeSlot(undefined);
  }, [selectedDate, partySize]);

  const handleReservation = () => {
    if (!selectedDate || !selectedTimeSlot || !partySize) {
      return;
    }
    
    // In a real app, submit reservation to backend
    console.log({
      restaurantId: id,
      date: selectedDate,
      time: selectedTimeSlot,
      partySize: partySize
    });
    
    // Show success message
    alert("Reservation successful!");
  };

  return (
    <Layout showUnitToggle>
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[60vh] mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src={restaurant.coverImage} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
                {restaurant.name}
              </h1>
              <div className="flex items-center justify-center gap-2 mb-4">
                {restaurant.cuisine.map((cuisine, index) => (
                  <Badge key={index} className="bg-primary/70 hover:bg-primary">
                    {cuisine}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-center text-white">
                <div className="flex items-center mr-4">
                  <StarIcon className="text-yellow-400 w-5 h-5 mr-1" />
                  <span>{restaurant.ratings.overall}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-1" />
                  <span>{restaurant.address}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Restaurant Info Tabs */}
          <Tabs defaultValue="about" className="mb-10">
            <TabsList className="mb-6 w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger 
                value="about" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary font-medium px-4 py-2"
              >
                About
              </TabsTrigger>
              <TabsTrigger 
                value="menu" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary font-medium px-4 py-2"
              >
                Menu
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary font-medium px-4 py-2"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-0">
              <div className="space-y-8">
                {/* Description */}
                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-4">About {restaurant.name}</h2>
                  <p className="text-muted-foreground">{restaurant.description}</p>
                </div>
                
                {/* Features */}
                <div>
                  <h3 className="text-xl font-heading font-semibold mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1 px-3 py-1">
                        <Check className="w-3 h-3" />
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Hours */}
                <div>
                  <h3 className="text-xl font-heading font-semibold mb-3">Opening Hours</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday</span>
                      <span>{restaurant.hours.monday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Tuesday</span>
                      <span>{restaurant.hours.tuesday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Wednesday</span>
                      <span>{restaurant.hours.wednesday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Thursday</span>
                      <span>{restaurant.hours.thursday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Friday</span>
                      <span>{restaurant.hours.friday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saturday</span>
                      <span>{restaurant.hours.saturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sunday</span>
                      <span>{restaurant.hours.sunday}</span>
                    </div>
                  </div>
                </div>
                
                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-heading font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-5 h-5 text-primary" />
                      <span>{restaurant.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-primary" />
                      <span>{restaurant.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-primary" />
                      <a 
                        href={restaurant.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        {restaurant.website} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Map */}
                <div>
                  <h3 className="text-xl font-heading font-semibold mb-3">Location</h3>
                  <div className="h-[300px] w-full rounded-lg overflow-hidden border">
                    <RestaurantMap address={restaurant.address} />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="menu" className="mt-0">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-6">Menu</h2>
                  
                  {restaurant.menu.categories.map((category, index) => (
                    <div key={index} className="mb-10">
                      <h3 className="text-xl font-heading font-semibold mb-6 border-b pb-2">{category.name}</h3>
                      <div className="grid grid-cols-1 gap-6">
                        {category.items.map((item) => (
                          <div key={item.id} className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-1/4">
                              <div className="aspect-square rounded-md overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="text-lg font-medium">{item.name}</h4>
                                <span className="text-lg font-semibold">${item.price}</span>
                              </div>
                              <p className="text-muted-foreground mb-2">{item.description}</p>
                              <div className="flex justify-between items-center mt-2">
                                <div className="flex items-center">
                                  <Rating value={item.rating} size="sm" />
                                  <span className="ml-2 text-sm text-muted-foreground">({item.rating})</span>
                                </div>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline">Rate Dish</Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Rate {item.name}</DialogTitle>
                                      <DialogDescription>
                                        Share your experience with this dish to help others discover great food.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                      <div className="mb-4 flex justify-center">
                                        <Rating 
                                          value={userRating} 
                                          onChange={setUserRating} 
                                          size="lg" 
                                          editable 
                                        />
                                      </div>
                                      <div className="space-y-4">
                                        <div>
                                          <Label htmlFor="review-title">Title</Label>
                                          <Input id="review-title" placeholder="Sum up your experience" />
                                        </div>
                                        <div>
                                          <Label htmlFor="review-comment">Review</Label>
                                          <Input id="review-comment" placeholder="Tell us what you thought about this dish" className="min-h-[80px]" />
                                        </div>
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button type="submit">Submit Review</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                              {item.dietaryOptions && (
                                <div className="flex gap-1 mt-2">
                                  {item.dietaryOptions.map((option, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {option}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-0">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-heading font-semibold">Reviews</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Write Review</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Review {restaurant.name}</DialogTitle>
                        <DialogDescription>
                          Share your dining experience to help others discover great restaurants.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="mb-4 flex justify-center">
                          <Rating 
                            value={userRating} 
                            onChange={setUserRating} 
                            size="lg" 
                            editable 
                          />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="review-title">Title</Label>
                            <Input id="review-title" placeholder="Sum up your experience" />
                          </div>
                          <div>
                            <Label htmlFor="review-comment">Review</Label>
                            <Input id="review-comment" placeholder="Tell us about your experience" className="min-h-[100px]" />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Submit Review</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 p-6 border rounded-lg">
                    <div className="md:w-1/4">
                      <h3 className="text-xl font-semibold mb-2">Overall Rating</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-3xl font-bold">{restaurant.ratings.overall}</span>
                        <Rating value={restaurant.ratings.overall} size="md" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Food</span>
                          <Rating value={restaurant.ratings.foodFinder} size="sm" />
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Service</span>
                          <Rating value={restaurant.ratings.service} size="sm" />
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Atmosphere</span>
                          <Rating value={restaurant.ratings.atmosphere} size="sm" />
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Value</span>
                          <Rating value={restaurant.ratings.value} size="sm" />
                        </div>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="text-xl font-semibold mb-4">User Reviews</h3>
                      <div className="space-y-4">
                        {restaurant.reviews.map((review) => (
                          <div key={review.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full overflow-hidden">
                                  <img src={review.userImage} alt={review.userName} className="w-full h-full object-cover" />
                                </div>
                                <span className="font-medium">{review.userName}</span>
                              </div>
                              <Rating value={review.rating} size="sm" />
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">{review.date}</p>
                            <p>{review.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1">
          {/* Reservation Card */}
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-xl font-heading font-semibold mb-4">Make a Reservation</h3>
              
              {restaurant.acceptsReservations ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="party-size">Party Size</Label>
                    <Select value={partySize} onValueChange={setPartySize}>
                      <SelectTrigger id="party-size" className="w-full">
                        <SelectValue placeholder="Select party size" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 10}, (_, i) => i + 1).map((size) => (
                          <SelectItem key={size} value={size.toString()}>
                            {size} {size === 1 ? 'person' : 'people'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          id="date"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          disabled={(date) => {
                            // Disable dates in the past
                            return date < new Date(new Date().setHours(0, 0, 0, 0));
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label>Time</Label>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      {availableTimeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTimeSlot === time ? "default" : "outline"}
                          className={cn("text-sm h-9", selectedTimeSlot === time && "bg-primary text-primary-foreground")}
                          onClick={() => setSelectedTimeSlot(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    onClick={handleReservation}
                    disabled={!selectedDate || !selectedTimeSlot}
                  >
                    Book Table
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-center py-6">
                    <div className="text-center">
                      <X className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                      <p className="font-medium">Reservations Not Available</p>
                      <p className="text-sm text-muted-foreground mt-1">This restaurant doesn't accept online reservations.</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-primary" />
                      <span>{restaurant.phone}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Call directly to inquire about table availability.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Top Dishes Card */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-heading font-semibold mb-4">Top Dishes</h3>
              <div className="space-y-4">
                {restaurant.topDishes.map((dish) => (
                  <div key={dish.id} className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium">{dish.name}</h4>
                        <span className="text-sm font-semibold">${dish.price}</span>
                      </div>
                      <div className="flex items-center">
                        <Rating value={dish.rating} size="xs" />
                        <span className="ml-1 text-xs text-muted-foreground">({dish.rating})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Similar Restaurants */}
      <div className="mt-16">
        <h2 className="text-2xl font-heading font-semibold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Show 3 similar restaurant cards */}
          {Array.from({length: 3}).map((_, index) => (
            <DishCard 
              key={index}
              id={`similar-${index}`}
              name="Similar Restaurant"
              image="/placeholder.svg"
              rating={4.5}
              reviewCount={120}
              cuisines={["Mediterranean", "Italian"]}
              distance="2.3 mi"
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Restaurant;
