
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Award, 
  Trophy, 
  Star, 
  Clock, 
  Utensils, 
  Heart, 
  Pencil, 
  ShieldCheck, 
  Medal
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type BadgeType = 
  | 'supporter' 
  | 'creator' 
  | 'staff' 
  | 'veteran' 
  | 'gourmet' 
  | 'patron' 
  | 'elite'
  | 'verified';

interface BadgeConfig {
  icon: React.ReactNode;
  label: string;
  description: string;
  className: string;
}

const badgeConfigs: Record<BadgeType, BadgeConfig> = {
  supporter: {
    icon: <Heart className="h-3 w-3" />,
    label: 'Supporter',
    description: 'Supports Food Finder financially',
    className: 'bg-gradient-to-r from-gold-500 to-amber-400 text-white',
  },
  creator: {
    icon: <Pencil className="h-3 w-3" />,
    label: 'Content Creator',
    description: 'Regular contributor of reviews and photos',
    className: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
  },
  staff: {
    icon: <ShieldCheck className="h-3 w-3" />,
    label: 'Staff',
    description: 'Food Finder team member',
    className: 'bg-gradient-to-r from-blue-600 to-blue-400 text-white',
  },
  veteran: {
    icon: <Clock className="h-3 w-3" />,
    label: 'Veteran',
    description: 'Member for over 2 years',
    className: 'bg-gradient-to-r from-gray-700 to-gray-500 text-white',
  },
  gourmet: {
    icon: <Utensils className="h-3 w-3" />,
    label: 'Gourmet',
    description: 'Visited over 50 restaurants',
    className: 'bg-gradient-to-r from-green-600 to-emerald-400 text-white',
  },
  patron: {
    icon: <Award className="h-3 w-3" />,
    label: 'Patron',
    description: 'Regular at multiple restaurants',
    className: 'bg-gradient-to-r from-orange-500 to-amber-400 text-white',
  },
  elite: {
    icon: <Trophy className="h-3 w-3" />,
    label: 'Elite',
    description: 'Top 1% of Food Finder users',
    className: 'bg-gradient-to-r from-red-600 to-orange-500 text-white',
  },
  verified: {
    icon: <Star className="h-3 w-3" />,
    label: 'Verified',
    description: 'Verified food critic or influencer',
    className: 'bg-gradient-to-r from-sky-500 to-cyan-400 text-white',
  },
};

interface ProfileBadgeProps {
  type: BadgeType;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ProfileBadge = ({ 
  type, 
  size = 'md',
  showLabel = false,
  className 
}: ProfileBadgeProps) => {
  const config = badgeConfigs[type];

  const sizeClasses = {
    sm: 'h-5 px-1.5 text-xs',
    md: 'h-6 px-2 text-xs',
    lg: 'h-7 px-2.5 text-sm'
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div 
            className={cn(
              'inline-flex items-center rounded-full border border-white/20 shadow-sm', 
              sizeClasses[size], 
              config.className,
              className
            )}
          >
            <span className="flex items-center gap-1">
              {config.icon}
              {showLabel && <span className="font-medium">{config.label}</span>}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-popover/95 backdrop-blur-sm border-white/10">
          <p className="font-medium">{config.label}</p>
          <p className="text-xs text-muted-foreground">{config.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const BadgeGroup = ({ 
  badges, 
  size = 'md',
  showLabels = false,
  className 
}: { 
  badges: BadgeType[];
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {badges.map((badge, index) => (
        <ProfileBadge 
          key={index} 
          type={badge} 
          size={size} 
          showLabel={showLabels}
        />
      ))}
    </div>
  );
};
