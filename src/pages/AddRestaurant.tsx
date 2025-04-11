
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Building, 
  MapPin, 
  Phone, 
  Globe, 
  Clock, 
  DollarSign, 
  Utensils,
  ImagePlus,
  Plus,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AddRestaurant = () => {
  const { toast } = useToast();
  const [cuisineTypes, setCuisineTypes] = useState<string[]>([]);
  const [menuItems, setMenuItems] = useState<{ name: string; price: string; description: string; image: string }[]>([
    { name: "", price: "", description: "", image: "" }
  ]);
  
  const handleAddMenuItem = () => {
    setMenuItems([...menuItems, { name: "", price: "", description: "", image: "" }]);
  };
  
  const handleRemoveMenuItem = (index: number) => {
    const newMenuItems = [...menuItems];
    newMenuItems.splice(index, 1);
    setMenuItems(newMenuItems);
  };

  const handleMenuItemChange = (index: number, field: string, value: string) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index] = { ...newMenuItems[index], [field]: value };
    setMenuItems(newMenuItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Restaurant Added",
      description: "Your restaurant has been successfully added. It will be reviewed by our team.",
    });
  };

  return (
    <Layout>
      <div className="container max-w-4xl py-10">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl font-bold mb-2">Add Your Restaurant</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Share your restaurant with food enthusiasts in your area and grow your customer base.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="fancy-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-amber-700" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Tell us about your restaurant.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="col-span-2">
                  <Label htmlFor="restaurantName">Restaurant Name</Label>
                  <Input
                    id="restaurantName"
                    placeholder="e.g., Le Bistro Elegance"
                    className="glass-input mt-1.5"
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell potential customers about your restaurant's concept, atmosphere, and specialties..."
                    className="glass-input mt-1.5 min-h-32"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative mt-1.5">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      className="glass-input pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="website">Website</Label>
                  <div className="relative mt-1.5">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      placeholder="https://www.yourrestaurant.com"
                      className="glass-input pl-10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label>Cuisine Types</Label>
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 mt-1.5">
                  {[
                    "Italian", "Japanese", "Mexican", "Indian", "Thai", "French",
                    "Mediterranean", "Chinese", "American", "Middle Eastern", "Korean", "Vegan"
                  ].map((cuisine) => (
                    <div key={cuisine} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`cuisine-${cuisine}`} 
                        checked={cuisineTypes.includes(cuisine)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setCuisineTypes([...cuisineTypes, cuisine]);
                          } else {
                            setCuisineTypes(cuisineTypes.filter(c => c !== cuisine));
                          }
                        }}
                      />
                      <Label htmlFor={`cuisine-${cuisine}`} className="text-sm">{cuisine}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & Hours */}
          <Card className="fancy-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-amber-700" />
                Location & Hours
              </CardTitle>
              <CardDescription>
                Help customers find you and know when you're open.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea
                    id="address"
                    placeholder="123 Gourmet Street, Foodie City, FC 12345"
                    className="glass-input mt-1.5"
                    required
                  />
                </div>
                
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="col-span-1">
                    <Label htmlFor="priceRange">Price Range</Label>
                    <Select>
                      <SelectTrigger className="glass-input mt-1.5">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="$">$ (Under $15)</SelectItem>
                        <SelectItem value="$$">$$ ($15-$30)</SelectItem>
                        <SelectItem value="$$$">$$$ ($31-$60)</SelectItem>
                        <SelectItem value="$$$$">$$$$ (Over $60)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-2">
                    <Label>Operating Hours</Label>
                    <div className="grid gap-2 mt-1.5">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <div key={day} className="flex items-center gap-2">
                          <span className="w-24 text-sm">{day}</span>
                          <Select>
                            <SelectTrigger className="glass-input">
                              <SelectValue placeholder="Opening time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="closed">Closed</SelectItem>
                              <SelectItem value="00:00">12:00 AM</SelectItem>
                              <SelectItem value="06:00">6:00 AM</SelectItem>
                              <SelectItem value="07:00">7:00 AM</SelectItem>
                              <SelectItem value="08:00">8:00 AM</SelectItem>
                              <SelectItem value="09:00">9:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="12:00">12:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                          <span className="text-sm">to</span>
                          <Select>
                            <SelectTrigger className="glass-input">
                              <SelectValue placeholder="Closing time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="closed">Closed</SelectItem>
                              <SelectItem value="17:00">5:00 PM</SelectItem>
                              <SelectItem value="18:00">6:00 PM</SelectItem>
                              <SelectItem value="19:00">7:00 PM</SelectItem>
                              <SelectItem value="20:00">8:00 PM</SelectItem>
                              <SelectItem value="21:00">9:00 PM</SelectItem>
                              <SelectItem value="22:00">10:00 PM</SelectItem>
                              <SelectItem value="23:00">11:00 PM</SelectItem>
                              <SelectItem value="00:00">12:00 AM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Dishes / Menu Items */}
          <Card className="fancy-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-amber-700" />
                Featured Menu Items
              </CardTitle>
              <CardDescription>
                Highlight your most popular or signature dishes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {menuItems.map((item, index) => (
                <div key={index} className="space-y-4 p-4 rounded-lg border border-amber-200/30 dark:border-amber-800/30">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Menu Item #{index + 1}</h4>
                    {menuItems.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMenuItem(index)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor={`item-name-${index}`}>Dish Name</Label>
                      <Input
                        id={`item-name-${index}`}
                        value={item.name}
                        onChange={(e) => handleMenuItemChange(index, 'name', e.target.value)}
                        placeholder="e.g., Truffle Risotto"
                        className="glass-input mt-1.5"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`item-price-${index}`}>Price</Label>
                      <div className="relative mt-1.5">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id={`item-price-${index}`}
                          value={item.price}
                          onChange={(e) => handleMenuItemChange(index, 'price', e.target.value)}
                          placeholder="e.g., 24.99"
                          className="glass-input pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor={`item-description-${index}`}>Description</Label>
                    <Textarea
                      id={`item-description-${index}`}
                      value={item.description}
                      onChange={(e) => handleMenuItemChange(index, 'description', e.target.value)}
                      placeholder="Describe the dish, ingredients, and what makes it special..."
                      className="glass-input mt-1.5"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label>Dish Image</Label>
                    <div className="mt-1.5 border-2 border-dashed rounded-lg p-4 text-center border-amber-200/40 dark:border-amber-700/30">
                      {item.image ? (
                        <div className="relative w-full aspect-video rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name || "Dish preview"}
                            className="object-cover w-full h-full"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm border-amber-200/50 dark:border-amber-800/50"
                          >
                            Change Image
                          </Button>
                        </div>
                      ) : (
                        <>
                          <ImagePlus className="h-8 w-8 mx-auto text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">
                            Upload a high-quality image of this dish
                          </p>
                          <Button 
                            type="button"
                            variant="outline" 
                            size="sm" 
                            className="mt-3 border-amber-200/50 dark:border-amber-800/50"
                          >
                            Upload Image
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={handleAddMenuItem}
                className="w-full border-amber-300/50 dark:border-amber-700/50"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Another Menu Item
              </Button>
            </CardContent>
          </Card>

          {/* Restaurant Images */}
          <Card className="fancy-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImagePlus className="h-5 w-5 text-amber-700" />
                Restaurant Images
              </CardTitle>
              <CardDescription>
                Upload photos of your restaurant's interior, exterior, and ambiance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div
                    key={index}
                    className="border-2 border-dashed rounded-lg p-4 aspect-square flex flex-col items-center justify-center text-center border-amber-200/40 dark:border-amber-700/30"
                  >
                    <ImagePlus className="h-10 w-10 text-muted-foreground" />
                    <p className="mt-2 text-xs text-muted-foreground">
                      {index === 1 ? "Main Restaurant Photo" : `Additional Photo ${index-1}`}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-3 border-amber-200/50 dark:border-amber-800/50"
                    >
                      Upload
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Owner Information */}
          <Card className="fancy-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-amber-700" />
                Owner Information
              </CardTitle>
              <CardDescription>
                Please provide your contact information as the restaurant owner or manager.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-amber-200/20 text-amber-700">OI</AvatarFallback>
                </Avatar>
                <div>
                  <Button 
                    type="button" 
                    variant="outline"
                    className="mb-1 border-amber-200/50 dark:border-amber-800/50"
                  >
                    Upload Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    A professional photo helps build trust with customers.
                  </p>
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="ownerName">Full Name</Label>
                  <Input
                    id="ownerName"
                    placeholder="Your full name"
                    className="glass-input mt-1.5"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="ownerPhone">Phone Number</Label>
                  <Input
                    id="ownerPhone"
                    placeholder="Your direct contact number"
                    className="glass-input mt-1.5"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="ownerEmail">Email</Label>
                  <Input
                    id="ownerEmail"
                    type="email"
                    placeholder="Your email address"
                    className="glass-input mt-1.5"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="ownerPosition">Position</Label>
                  <Select>
                    <SelectTrigger className="glass-input mt-1.5">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="manager">General Manager</SelectItem>
                      <SelectItem value="chef">Executive Chef</SelectItem>
                      <SelectItem value="marketing">Marketing Manager</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full luxury-button">
            Submit Restaurant for Review
          </Button>
        </form>
      </div>
    </Layout>
  );
};

// Add the missing User component
function User(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default AddRestaurant;
