
import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, ThumbsUp, Mail, Calendar, Info } from "lucide-react";
import { motion } from "framer-motion";

export interface Notification {
  id: string;
  type: 'like' | 'message' | 'event' | 'system';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'like':
      return <ThumbsUp className="h-5 w-5 text-blue-500" />;
    case 'message':
      return <Mail className="h-5 w-5 text-green-500" />;
    case 'event':
      return <Calendar className="h-5 w-5 text-purple-500" />;
    default:
      return <Info className="h-5 w-5 text-orange-500" />;
  }
};

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute right-0 top-full mt-2 w-96 bg-background border rounded-lg shadow-lg z-50"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-medium">Notifications</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onMarkAllAsRead}>
            Mark all as read
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="h-[400px]">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <p>No new notifications</p>
          </div>
        ) : (
          <div className="divide-y">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <div className="flex gap-3">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{notification.title}</p>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </motion.div>
  );
};
