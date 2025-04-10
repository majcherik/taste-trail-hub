
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Menu, Search, X, Home, Compass, Calendar, Users, Info, User, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationPanel } from "./NotificationPanel";
import { useNotifications } from "@/hooks/use-notifications";
import { AnimatePresence } from "framer-motion";
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const isLoggedIn = false; // This would come from auth context in a real app
  
  const {
    notifications,
    unreadCount,
    isOpen: notificationsOpen,
    toggleNotifications,
    closeNotifications,
    markAsRead,
    markAllAsRead
  } = useNotifications();

  const navItems = [
    { name: "Home", path: "/", icon: Home, description: "Return to the homepage" },
    { name: "Discover", path: "/discover", icon: Compass, description: "Explore restaurants and dishes" },
    { name: "Events", path: "/events", icon: Calendar, description: "Food events near you" },
    { name: "Groups", path: "/groups", icon: Users, description: "Join food enthusiast groups" },
    { name: "About", path: "/about", icon: Info, description: "Learn more about us" }
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
              <SheetHeader className="p-6 border-b">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="px-6 py-4">
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link 
                        to={item.path} 
                        className="flex items-center gap-3 py-2 text-lg font-medium hover:text-primary transition-colors"
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-8 pt-6 border-t">
                  {isLoggedIn ? (
                    <div>
                      <SheetClose asChild>
                        <Link 
                          to="/profile" 
                          className="flex items-center gap-3 py-2 text-lg font-medium hover:text-primary transition-colors"
                        >
                          <User className="h-5 w-5" />
                          My Profile
                        </Link>
                      </SheetClose>
                      <Button 
                        variant="ghost" 
                        className="flex items-center gap-3 py-2 text-lg font-medium hover:text-primary transition-colors w-full justify-start px-0"
                      >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <SheetClose asChild>
                        <Link to="/login">
                          <Button variant="outline" size="lg" className="w-full">
                            <LogIn className="mr-2 h-4 w-4" />
                            Log In
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link to="/signup">
                          <Button size="lg" className="w-full">
                            Sign Up
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center gap-1">
            <span className="font-heading font-bold text-xl md:text-2xl">
              <span className="text-primary">Food</span>Finder
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                        to="/discover"
                      >
                        <div className="mt-4 mb-2 text-lg font-medium text-primary-foreground">
                          Discover
                        </div>
                        <p className="text-sm leading-tight text-primary-foreground">
                          Explore top restaurants and dishes in your area
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {navItems.map((item) => (
                    <ListItem
                      key={item.name}
                      title={item.name}
                      href={item.path}
                      icon={<item.icon className="mr-2 h-4 w-4" />}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/feed" className={navigationMenuTriggerStyle()}>
                Feed
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/restaurant/123" className={navigationMenuTriggerStyle()}>
                Featured Restaurant
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

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
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative"
                  onClick={toggleNotifications}
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Button>
                
                <AnimatePresence>
                  {notificationsOpen && (
                    <NotificationPanel
                      notifications={notifications}
                      onClose={closeNotifications}
                      onMarkAsRead={markAsRead}
                      onMarkAllAsRead={markAllAsRead}
                    />
                  )}
                </AnimatePresence>
              </div>
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

const ListItem = ({ className, title, children, href, icon, ...props }: any) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
