
import { useState, useCallback } from 'react';
import { Notification } from '@/components/layout/NotificationPanel';
import { useToast } from '@/components/ui/use-toast';

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'like',
    title: 'New like on your post',
    description: 'John Smith liked your review of "Thai Garden"',
    time: '2 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'event',
    title: 'Upcoming Event Reminder',
    description: 'Wine Tasting at Vintage Bar starts in 3 hours',
    time: '30 min ago',
    read: false,
  },
  {
    id: '3',
    type: 'message',
    title: 'New message in Italian Food Group',
    description: 'Maria shared a new pasta recipe in the group chat',
    time: '2 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'system',
    title: 'Welcome to Food Finder!',
    description: 'Discover restaurants and connect with food enthusiasts',
    time: '1 day ago',
    read: true,
  },
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const toggleNotifications = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  const closeNotifications = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);
  
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      duration: 2000,
    });
  }, [toast]);
  
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      time: 'Just now',
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    toast({
      title: notification.title,
      description: notification.description,
      duration: 4000,
    });
  }, [toast]);
  
  return {
    notifications,
    unreadCount,
    isOpen,
    toggleNotifications,
    closeNotifications,
    markAsRead,
    markAllAsRead,
    addNotification
  };
};
