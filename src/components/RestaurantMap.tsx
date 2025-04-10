
import { useEffect, useRef } from "react";

interface RestaurantMapProps {
  address: string;
}

export const RestaurantMap = ({ address }: RestaurantMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // In a real application, you would initialize a map here
    // using Google Maps, Mapbox, or another map provider
    // For now, we'll just display a placeholder
    
    if (mapRef.current) {
      const mapContainer = mapRef.current;
      mapContainer.style.backgroundImage = "url('https://placehold.co/600x400/lightgray/darkgray?text=Map+of+" + encodeURIComponent(address) + "')";
      mapContainer.style.backgroundSize = "cover";
      mapContainer.style.backgroundPosition = "center";
    }
  }, [address]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full flex items-center justify-center text-muted-foreground"
    >
      Map showing {address}
    </div>
  );
};
