
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Globe,
  Plus,
  Trash2
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface SocialLink {
  id: string;
  platform: string;
  username: string;
  url: string;
  icon: React.ElementType;
}

const platformIcons: Record<string, React.ElementType> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  website: Globe,
};

interface SocialMediaLinksProps {
  initialLinks?: SocialLink[];
  editable?: boolean;
}

export function SocialMediaLinks({ initialLinks = [], editable = false }: SocialMediaLinksProps) {
  const [links, setLinks] = React.useState<SocialLink[]>(initialLinks);
  const [newLink, setNewLink] = React.useState({
    platform: "instagram",
    username: "",
    url: ""
  });
  
  const handleAddLink = () => {
    if (!newLink.username.trim() || !newLink.url.trim()) {
      toast.error("Username and URL are required");
      return;
    }
    
    const id = Date.now().toString();
    setLinks([...links, { 
      ...newLink, 
      id, 
      icon: platformIcons[newLink.platform] || Globe
    }]);
    
    setNewLink({
      platform: "instagram",
      username: "",
      url: ""
    });
    
    toast.success("Social media link added!");
  };
  
  const handleRemoveLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
    toast.success("Social media link removed");
  };
  
  if (links.length === 0 && !editable) {
    return null;
  }
  
  return (
    <div className="space-y-3">
      {links.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {links.map((link) => {
            const Icon = platformIcons[link.platform] || Globe;
            return (
              <div key={link.id} className="flex items-center">
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">@{link.username}</span>
                </a>
                {editable && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 ml-1 text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveLink(link.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      {editable && (
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex gap-1 items-center border-dashed"
            >
              <Plus className="h-3 w-3" />
              Add Social Media
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-white/10">
            <DialogHeader>
              <DialogTitle>Add Social Media</DialogTitle>
              <DialogDescription>
                Connect your social media accounts to your profile
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <select
                  id="platform"
                  className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm"
                  value={newLink.platform}
                  onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                >
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="facebook">Facebook</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="youtube">YouTube</option>
                  <option value="website">Website</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="yourname"
                  value={newLink.username}
                  onChange={(e) => setNewLink({ ...newLink, username: e.target.value })}
                  className="glass-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  placeholder="https://instagram.com/yourname"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="glass-input"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                onClick={handleAddLink}
                className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600"
              >
                Add Link
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
