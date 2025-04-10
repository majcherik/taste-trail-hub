
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number | null;
  onChange?: (value: number) => void;
  size?: "xs" | "sm" | "md" | "lg";
  editable?: boolean;
  className?: string;
}

export const Rating = ({
  value,
  onChange,
  size = "md",
  editable = false,
  className,
}: RatingProps) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };
  
  const wrapperClasses = {
    xs: "gap-0.5",
    sm: "gap-1",
    md: "gap-1",
    lg: "gap-2",
  };

  const handleClick = (rating: number) => {
    if (editable && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className={cn("flex", wrapperClasses[size], className)}>
      {stars.map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClasses[size],
            "text-muted transition-colors",
            (value !== null && value >= star) ? "fill-yellow-400 text-yellow-400" : "",
            editable && "cursor-pointer hover:text-yellow-400"
          )}
          onClick={() => handleClick(star)}
          data-testid={`star-${star}`}
        />
      ))}
    </div>
  );
};
