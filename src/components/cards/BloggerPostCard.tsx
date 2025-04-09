
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BloggerPostCardProps {
  id: string;
  bloggerName: string;
  bloggerUsername: string;
  bloggerAvatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  className?: string;
}

export const BloggerPostCard = ({
  id,
  bloggerName,
  bloggerUsername,
  bloggerAvatar,
  image,
  caption,
  likes,
  comments,
  className,
}: BloggerPostCardProps) => {
  return (
    <Card className={cn("overflow-hidden card-hover", className)}>
      <div className="p-3 flex items-center gap-3">
        <Avatar>
          <AvatarImage src={bloggerAvatar} alt={bloggerName} />
          <AvatarFallback>{bloggerName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{bloggerName}</div>
          <div className="text-xs text-muted-foreground">@{bloggerUsername}</div>
        </div>
      </div>
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={image} 
          alt="Food post" 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-3">
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-1">
            <Heart className="h-5 w-5" />
            <span className="text-sm">{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm">{comments}</span>
          </div>
        </div>
        <p className="text-sm line-clamp-2">{caption}</p>
      </CardContent>
    </Card>
  );
};
