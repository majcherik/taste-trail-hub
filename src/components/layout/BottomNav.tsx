
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Calendar, Users, User, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Discover", path: "/discover", icon: Search },
    { name: "Events", path: "/events", icon: Calendar },
    { name: "Groups", path: "/groups", icon: Users },
    { name: "About", path: "/about", icon: Info },
  ];

  return (
    <div className="md:hidden fixed bottom-0 z-30 w-full border-t bg-background/95 backdrop-blur">
      <div className="flex justify-between items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
