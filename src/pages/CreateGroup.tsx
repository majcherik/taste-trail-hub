
import React from "react";
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
import { Switch } from "@/components/ui/switch";
import { 
  Users, 
  Globe, 
  Lock, 
  ImagePlus, 
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateGroup = () => {
  const { toast } = useToast();
  const [isPrivate, setIsPrivate] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Group Created",
      description: "Your group has been successfully created.",
    });
  };

  return (
    <Layout>
      <div className="container max-w-4xl py-10">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl font-bold mb-2">Create Your Food Group</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow food enthusiasts, share your favorite spots, and organize tastings together.
          </p>
        </div>

        <Card className="fancy-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-amber-700" />
              Group Information
            </CardTitle>
            <CardDescription>
              Tell us about your group and set your preferences.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="groupName">Group Name</Label>
                  <Input
                    id="groupName"
                    placeholder="e.g., NYC Pizza Lovers"
                    className="glass-input mt-1.5"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="groupDescription">Description</Label>
                  <Textarea
                    id="groupDescription"
                    placeholder="Tell potential members what your group is all about..."
                    className="glass-input mt-1.5 min-h-32"
                    required
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative mt-1.5">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="City, Country"
                        className="glass-input pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <Label htmlFor="cuisine">Primary Cuisine</Label>
                    <Select>
                      <SelectTrigger className="glass-input mt-1.5">
                        <SelectValue placeholder="Select cuisine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Cuisine</SelectItem>
                        <SelectItem value="italian">Italian</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                        <SelectItem value="mexican">Mexican</SelectItem>
                        <SelectItem value="indian">Indian</SelectItem>
                        <SelectItem value="thai">Thai</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="mediterranean">Mediterranean</SelectItem>
                        <SelectItem value="vegan">Vegan/Vegetarian</SelectItem>
                        <SelectItem value="dessert">Desserts & Pastries</SelectItem>
                        <SelectItem value="coffee">Coffee & Tea</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="maxMembers">Maximum Members</Label>
                    <Input
                      id="maxMembers"
                      type="number"
                      min="2"
                      defaultValue="20"
                      className="glass-input mt-1.5"
                      required
                    />
                  </div>
                  
                  <div className="flex-1">
                    <Label htmlFor="groupTags">Group Tags</Label>
                    <Input
                      id="groupTags"
                      placeholder="e.g., pizza, casual, monthly-meetups"
                      className="glass-input mt-1.5"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Separate tags with commas
                    </p>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="groupImage">Group Cover Image</Label>
                  <div className="mt-1.5 border-2 border-dashed rounded-lg p-6 text-center border-amber-200/40 dark:border-amber-700/30">
                    <ImagePlus className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Drag and drop an image, or click to browse
                    </p>
                    <Button variant="outline" size="sm" className="mt-4 border-amber-200/50 dark:border-amber-800/50">
                      Upload Image
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between space-x-2 rounded-lg border p-4 border-amber-200/30 dark:border-amber-800/30">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      {isPrivate ? (
                        <Lock className="h-4 w-4 text-amber-700" />
                      ) : (
                        <Globe className="h-4 w-4 text-amber-700" />
                      )}
                      <Label htmlFor="private" className="font-medium">
                        {isPrivate ? "Private Group" : "Public Group"}
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isPrivate 
                        ? "Private groups require approval to join and are not listed publicly." 
                        : "Public groups can be found by anyone and joined without approval."}
                    </p>
                  </div>
                  <Switch 
                    id="private" 
                    checked={isPrivate} 
                    onCheckedChange={setIsPrivate}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full luxury-button">
                Create Group
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateGroup;
