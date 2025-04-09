
import { useState, useEffect } from "react";

type DistanceUnit = "mi" | "km";

export function useDistanceUnits() {
  const [unit, setUnit] = useState<DistanceUnit>(() => {
    // Try to get the saved preference from localStorage
    const savedUnit = localStorage.getItem("distanceUnit") as DistanceUnit;
    return savedUnit === "km" ? "km" : "mi"; // Default to miles if nothing saved
  });

  useEffect(() => {
    // Save the preference whenever it changes
    localStorage.setItem("distanceUnit", unit);
  }, [unit]);

  const toggleUnit = () => {
    setUnit(prev => prev === "mi" ? "km" : "mi");
  };

  const convertDistance = (distance: string): string => {
    // Parse the distance value (assuming format like "0.5 mi" or "1.2 km")
    const parts = distance.split(" ");
    const value = parseFloat(parts[0]);
    const currentUnit = parts[1];
    
    if (currentUnit === unit) return distance;
    
    if (currentUnit === "mi" && unit === "km") {
      // Convert miles to kilometers
      return `${(value * 1.60934).toFixed(1)} ${unit}`;
    } else if (currentUnit === "km" && unit === "mi") {
      // Convert kilometers to miles
      return `${(value / 1.60934).toFixed(1)} ${unit}`;
    }
    
    return distance;
  };

  return {
    unit,
    setUnit,
    toggleUnit,
    convertDistance
  };
}
