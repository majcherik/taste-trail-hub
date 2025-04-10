
import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, ThumbsUp, Mail, Calendar, Info, Award, Gift, Users, Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from '@/lib/utils';
import { BadgeType } from '@/components/badges/ProfileBadge';

export interface Notification {
  id: string;
  type: 'like' | 'message' | 'event' | 'system' | 'badge' | 'reservation' | 'group' | 'special';
  title: string;
  description: string;
  time: string;
  read: boolean;
  badge?: BadgeType;
  actionUrl?: string;
}

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const getNotificationIcon = (type: string, badge?: BadgeType) => {
  switch (type) {
    case 'like':
      return <ThumbsUp className="h-5 w-5 text-blue-500" />;
    case 'message':
      return <Mail className="h-5 w-5 text-green-500" />;
    case 'event':
      return <Calendar className="h-5 w-5 text-purple-500" />;
    case 'badge':
      return <Award className="h-5 w-5 text-gold-500" />;
    case 'reservation':
      return <Calendar className="h-5 w-5 text-primary" />;
    case 'group':
      return <Users className="h-5 w-5 text-secondary" />;
    case 'special':
      return <Gift className="h-5 w-5 text-rose-500" />;
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
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 top-full mt-2 w-96 glass-panel border rounded-lg shadow-elegant z-50"
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="font-heading font-medium">Notifications</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onMarkAllAsRead} className="text-xs hover:bg-white/10">
            Mark all as read
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-white/10">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="h-[400px]">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <div className="mb-2 opacity-50">
              <Bell className="h-10 w-10" />
            </div>
            <p>No new notifications</p>
            <p className="text-xs text-muted-foreground">You're all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {notifications.map((notification) => (
              <motion.div 
                key={notification.id}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                className={cn(
                  "p-4 transition-colors cursor-pointer",
                  !notification.read ? 'bg-primary/5' : ''
                )}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <div className="flex gap-3">
                  <div className={cn(
                    "mt-1 p-2 rounded-full",
                    notification.type === 'badge' ? 'bg-gold-500/10' : 'bg-white/5'
                  )}>
                    {getNotificationIcon(notification.type, notification.badge)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{notification.title}</p>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                    
                    {notification.actionUrl && (
                      <Button 
                        variant="link" 
                        className="text-xs p-0 h-auto mt-1 text-primary" 
                        asChild
                      >
                        <a href={notification.actionUrl}>View Details</a>
                      </Button>
                    )}
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </ScrollArea>
    </motion.div>
  );
};

import { Bell } from 'lucide-react';
