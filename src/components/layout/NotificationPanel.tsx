
import React from "react";
import { motion } from "framer-motion";
import { Check, Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'system' | 'message' | 'invitation' | 'achievement' | 'update' | 'badge' | 'event' | 'group' | 'reservation' | 'like' | 'special';
  link?: string;
  actionUrl?: string;
  badge?: string;
}

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationPanel({
  notifications,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead
}: NotificationPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 top-12 w-80 sm:w-96 z-50 overflow-hidden rounded-xl border shadow-lg"
    >
      <div className="bg-card text-card-foreground">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <h3 className="font-medium">Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onMarkAllAsRead} className="text-xs h-7 px-2">
              Mark all read
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="max-h-[70vh] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className={cn(
                  "p-4 border-b transition-colors hover:bg-accent/50",
                  !notification.read && "bg-primary/5"
                )}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium leading-none">{notification.title}</p>
                      {notification.badge && (
                        <Badge variant="subtle" size="sm">{notification.badge}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                  </div>
                  
                  {!notification.read && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onMarkAsRead(notification.id)}
                      className="h-6 w-6 rounded-full"
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
