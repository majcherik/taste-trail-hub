
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-1 mb-4">
              <span className="font-heading font-bold text-2xl">
                <span className="text-primary">Food</span>Finder
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Discover delicious food near you. Find top restaurants, specific dishes, and connect with local food enthusiasts.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/discover" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Find Restaurants
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Food Events
                  </Link>
                </li>
                <li>
                  <Link to="/groups" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Food Groups
                  </Link>
                </li>
                <li>
                  <Link to="/feed" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Latest Updates
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/press" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/cookie-policy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} FoodFinder. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms
            </Link>
            <Link to="/sitemap" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
