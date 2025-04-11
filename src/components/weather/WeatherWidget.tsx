
import React, { useState } from "react";
import { Cloud, CloudRain, CloudSun, Snowflake, Sun, Wind, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type WeatherUnit = "celsius" | "fahrenheit";

interface WeatherData {
  current: {
    temp: number;
    condition: "sunny" | "cloudy" | "rainy" | "snowy" | "partlyCloudy" | "windy";
    time: string;
  };
  hourly: Array<{
    time: string;
    temp: number;
    condition: "sunny" | "cloudy" | "rainy" | "snowy" | "partlyCloudy" | "windy";
  }>;
  daily: Array<{
    day: string;
    highTemp: number;
    lowTemp: number;
    condition: "sunny" | "cloudy" | "rainy" | "snowy" | "partlyCloudy" | "windy";
  }>;
  location: string;
}

// Mock weather data
const mockWeather: WeatherData = {
  current: {
    temp: 22,
    condition: "partlyCloudy",
    time: "Now"
  },
  hourly: [
    { time: "12PM", temp: 22, condition: "partlyCloudy" },
    { time: "1PM", temp: 23, condition: "sunny" },
    { time: "2PM", temp: 24, condition: "sunny" },
    { time: "3PM", temp: 24, condition: "cloudy" },
    { time: "4PM", temp: 23, condition: "cloudy" },
    { time: "5PM", temp: 22, condition: "rainy" },
    { time: "6PM", temp: 20, condition: "rainy" },
    { time: "7PM", temp: 18, condition: "cloudy" },
  ],
  daily: [
    { day: "Today", highTemp: 24, lowTemp: 18, condition: "partlyCloudy" },
    { day: "Tue", highTemp: 26, lowTemp: 19, condition: "sunny" },
    { day: "Wed", highTemp: 25, lowTemp: 20, condition: "cloudy" },
    { day: "Thu", highTemp: 22, lowTemp: 17, condition: "rainy" },
    { day: "Fri", highTemp: 19, lowTemp: 15, condition: "windy" },
  ],
  location: "New York"
};

export const WeatherIcon = ({ condition, className }: { condition: string; className?: string }) => {
  switch (condition) {
    case "sunny":
      return <Sun className={cn("text-amber-400", className)} />;
    case "cloudy":
      return <Cloud className={cn("text-gray-400", className)} />;
    case "rainy":
      return <CloudRain className={cn("text-blue-400", className)} />;
    case "snowy":
      return <Snowflake className={cn("text-blue-200", className)} />;
    case "partlyCloudy":
      return <CloudSun className={cn("text-amber-300", className)} />;
    case "windy":
      return <Wind className={cn("text-gray-400", className)} />;
    default:
      return <Sun className={cn("text-amber-400", className)} />;
  }
};

export function WeatherWidget() {
  const [tempUnit, setTempUnit] = useState<WeatherUnit>("celsius");
  const [weather] = useState<WeatherData>(mockWeather);
  
  const convertTemp = (temp: number): number => {
    if (tempUnit === "fahrenheit") {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const formatTemp = (temp: number): string => {
    return `${convertTemp(temp)}°${tempUnit === "celsius" ? "C" : "F"}`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 py-1 h-auto hover:bg-white/10 rounded-full px-3">
          <WeatherIcon condition={weather.current.condition} className="h-4 w-4 mr-1" />
          <span className="font-medium">{formatTemp(weather.current.temp)}</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 glass-panel border border-white/10" align="end">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{weather.location}</h3>
              <p className="text-sm text-muted-foreground">Current weather</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant={tempUnit === "celsius" ? "default" : "ghost"} 
                size="sm"
                className={cn(
                  "h-8 w-8 p-0 rounded-full", 
                  tempUnit === "celsius" ? "bg-primary text-primary-foreground" : ""
                )}
                onClick={() => setTempUnit("celsius")}
              >
                °C
              </Button>
              <Button 
                variant={tempUnit === "fahrenheit" ? "default" : "ghost"} 
                size="sm"
                className={cn(
                  "h-8 w-8 p-0 rounded-full", 
                  tempUnit === "fahrenheit" ? "bg-primary text-primary-foreground" : ""
                )}
                onClick={() => setTempUnit("fahrenheit")}
              >
                °F
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-4 mt-3">
            <WeatherIcon condition={weather.current.condition} className="h-12 w-12" />
            <div className="text-4xl font-bold">{formatTemp(weather.current.temp)}</div>
          </div>
        </div>

        <Tabs defaultValue="hourly" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hourly">Hourly</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hourly" className="p-0">
            <div className="flex overflow-x-auto p-3 scrollbar-none">
              {weather.hourly.map((hour, index) => (
                <div key={index} className="flex flex-col items-center min-w-16 p-2">
                  <span className="text-sm text-muted-foreground">{hour.time}</span>
                  <WeatherIcon condition={hour.condition} className="h-5 w-5 my-2" />
                  <span className="text-sm font-medium">{formatTemp(hour.temp)}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="daily" className="p-0">
            <div className="divide-y divide-white/10">
              {weather.daily.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <WeatherIcon condition={day.condition} className="h-5 w-5" />
                    <span className={index === 0 ? "font-medium" : ""}>{day.day}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{formatTemp(day.lowTemp)}</span>
                    <span>-</span>
                    <span className="font-medium">{formatTemp(day.highTemp)}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
