
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const isLoggedIn = false; // This would come from auth context in a real app

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg font-medium hover:text-primary">Home</Link>
                <Link to="/discover" className="text-lg font-medium hover:text-primary">Discover</Link>
                <Link to="/events" className="text-lg font-medium hover:text-primary">Events</Link>
                <Link to="/groups" className="text-lg font-medium hover:text-primary">Groups</Link>
                <Link to="/bloggers" className="text-lg font-medium hover:text-primary">Food Bloggers</Link>
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center gap-1">
            <span className="font-heading font-bold text-xl md:text-2xl">
              <span className="text-primary">Food</span>Finder
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
          <Link to="/discover" className="text-sm font-medium hover:text-primary">Discover</Link>
          <Link to="/events" className="text-sm font-medium hover:text-primary">Events</Link>
          <Link to="/groups" className="text-sm font-medium hover:text-primary">Groups</Link>
          <Link to="/bloggers" className="text-sm font-medium hover:text-primary">Food Bloggers</Link>
        </nav>

        <div className="flex items-center gap-2">
          {searchOpen ? (
            <div className="flex items-center bg-background rounded-full border px-3 py-1">
              <Input
                type="search"
                placeholder="Search restaurants, dishes..."
                className="border-0 focus-visible:ring-0 focus-visible:ring-transparent"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <ThemeToggle />

          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-primary"></span>
              </Button>
              <Link to="/profile">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>FF</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
