
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BadgeGroup, type BadgeType } from "@/components/badges/ProfileBadge";
import { cn } from "@/lib/utils";
import { MapPin, Calendar } from "lucide-react";

interface UserHoverCardProps {
  username: string;
  displayName: string;
  avatar?: string;
  badges?: BadgeType[];
  location?: string;
  joinDate?: string;
  bio?: string;
  reviewCount?: number;
  groupCount?: number;
  eventCount?: number;
  children: React.ReactNode;
  className?: string;
}

export function UserHoverCard({
  username,
  displayName,
  avatar,
  badges = [],
  location,
  joinDate,
  bio,
  reviewCount = 0,
  groupCount = 0,
  eventCount = 0,
  children,
  className
}: UserHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className={cn("inline-block cursor-pointer", className)}>
          {children}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 glass-panel border border-white/10 p-0">
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-primary/20">
              <AvatarImage src={avatar} />
              <AvatarFallback>{displayName[0]}</AvatarFallback>
            </Avatar>
            
            <div>
              <h4 className="font-medium">{displayName}</h4>
              <p className="text-sm text-muted-foreground">@{username}</p>
            </div>
          </div>
          
          {badges && badges.length > 0 && (
            <BadgeGroup badges={badges} className="mt-1" />
          )}
          
          {bio && (
            <p className="text-sm line-clamp-2">{bio}</p>
          )}
          
          <div className="grid grid-cols-3 gap-2 text-center py-1">
            <div className="text-xs">
              <div className="font-medium">{reviewCount}</div>
              <div className="text-muted-foreground">Reviews</div>
            </div>
            <div className="text-xs">
              <div className="font-medium">{groupCount}</div>
              <div className="text-muted-foreground">Groups</div>
            </div>
            <div className="text-xs">
              <div className="font-medium">{eventCount}</div>
              <div className="text-muted-foreground">Events</div>
            </div>
          </div>
          
          {(location || joinDate) && (
            <div className="space-y-1 text-xs text-muted-foreground">
              {location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{location}</span>
                </div>
              )}
              {joinDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Joined {joinDate}</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="border-t border-white/10 p-3 flex justify-end">
          <Link to={`/profile/${username}`}>
            <Button size="sm" variant="secondary">View Profile</Button>
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
