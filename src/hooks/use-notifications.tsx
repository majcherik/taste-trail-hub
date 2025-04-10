
import { useState, useCallback, useEffect } from 'react';
import { Notification } from '@/components/layout/NotificationPanel';
import { useToast } from '@/components/ui/use-toast';

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'badge',
    title: 'New Badge Earned!',
    description: 'You\'ve earned the Gourmet badge for visiting 50 restaurants',
    time: '2 min ago',
    read: false,
    badge: 'gourmet',
    actionUrl: '/profile',
  },
  {
    id: '2',
    type: 'event',
    title: 'Upcoming Event Reminder',
    description: 'Wine Tasting at Vintage Bar starts in 3 hours',
    time: '30 min ago',
    read: false,
    actionUrl: '/events',
  },
  {
    id: '3',
    type: 'group',
    title: 'New Group Invitation',
    description: 'Maria invited you to join "Italian Food Enthusiasts"',
    time: '1 hour ago',
    read: false,
    actionUrl: '/groups',
  },
  {
    id: '4',
    type: 'reservation',
    title: 'Reservation Confirmed',
    description: 'Your table at Le Bernardin has been confirmed for Friday at 8 PM',
    time: '2 hours ago',
    read: false,
    actionUrl: '/restaurant/123',
  },
  {
    id: '5',
    type: 'message',
    title: 'New message in Italian Food Group',
    description: 'Maria shared a new pasta recipe in the group chat',
    time: '5 hours ago',
    read: true,
  },
  {
    id: '6',
    type: 'like',
    title: 'Your review was liked',
    description: 'John Smith liked your review of "Thai Garden"',
    time: '1 day ago',
    read: true,
  },
  {
    id: '7',
    type: 'system',
    title: 'Welcome to Food Finder!',
    description: 'Discover restaurants and connect with food enthusiasts',
    time: '3 days ago',
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
    
    // Get the notification to find if it has an actionUrl
    const notification = notifications.find(n => n.id === id);
    if (notification?.actionUrl) {
      // In a real app, we would navigate to this URL
      console.log(`Navigate to: ${notification.actionUrl}`);
    }
  }, [notifications]);
  
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

  // Example of adding a notification after a delay (only for demo purposes)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Math.random() > 0.7) { // Only sometimes show this
        addNotification({
          type: 'special',
          title: 'Special Offer!',
          description: '50% off your next reservation at Le Bernardin. Limited time offer!',
          actionUrl: '/restaurant/123',
        });
      }
    }, 30000); // 30 seconds
    
    return () => clearTimeout(timer);
  }, [addNotification]);
  
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
