
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { useDistanceUnits } from "@/hooks/use-distance-units";

export const UnitToggle = () => {
  const { unit, toggleUnit } = useDistanceUnits();
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Distance unit:</span>
      <Toggle 
        className="text-xs font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        pressed={unit === "km"}
        onPressedChange={toggleUnit}
        aria-label="Toggle distance unit"
      >
        {unit === "mi" ? "mi" : "km"}
      </Toggle>
    </div>
  );
};
