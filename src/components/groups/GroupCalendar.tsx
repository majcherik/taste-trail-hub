
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface EventItem {
  id: string;
  title: string;
  date: Date;
  type: "workshop" | "tasting" | "meetup" | "other";
}

const eventTypes = {
  workshop: { label: "Workshop", color: "bg-blue-500" },
  tasting: { label: "Tasting", color: "bg-purple-500" },
  meetup: { label: "Meetup", color: "bg-green-500" },
  other: { label: "Other", color: "bg-orange-500" }
};

interface GroupCalendarProps {
  events?: EventItem[];
  groupName?: string;
}

export const GroupCalendar: React.FC<GroupCalendarProps> = ({ 
  events = [],
  groupName = "Local Events" 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  
  const selectedDayEvents = selectedDate
    ? events.filter(event => 
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];
  
  // Function to highlight days with events
  const getDayClassName = (date: Date) => {
    const hasEvent = events.some(
      event => 
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
    
    return hasEvent ? "bg-primary/20 text-primary font-medium rounded-full" : undefined;
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>{groupName} Calendar</CardTitle>
          <div className="flex gap-1">
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("calendar")}
            >
              Calendar
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </div>
        </div>
        <CardDescription>
          {selectedDate ? (
            <>
              {format(selectedDate, "MMMM yyyy")}{" "}
              <span className="text-primary">
                ({selectedDayEvents.length} event{selectedDayEvents.length !== 1 ? "s" : ""})
              </span>
            </>
          ) : (
            "Select a date to see events"
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {viewMode === "calendar" ? (
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiersClassNames={{
              selected: "bg-primary text-primary-foreground",
            }}
            modifiers={{
              hasEvent: (date) => 
                events.some(
                  event => 
                    event.date.getDate() === date.getDate() &&
                    event.date.getMonth() === date.getMonth() &&
                    event.date.getFullYear() === date.getFullYear()
                )
            }}
            modifiersStyles={{
              hasEvent: { backgroundColor: 'rgba(var(--primary), 0.2)', borderRadius: '100%', fontWeight: '500' }
            }}
          />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h3 className="font-medium">{format(new Date(), "MMMM yyyy")}</h3>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {events.length > 0 ? (
                events.map((event) => (
                  <div 
                    key={event.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(event.date, "MMM d, yyyy • h:mm a")}
                      </p>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${eventTypes[event.type].color} text-white`}
                    >
                      {eventTypes[event.type].label}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-6">
                  No upcoming events
                </p>
              )}
            </div>
          </div>
        )}
        
        {viewMode === "calendar" && selectedDayEvents.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="font-medium">
              Events on {format(selectedDate!, "MMMM d, yyyy")}
            </h3>
            {selectedDayEvents.map((event) => (
              <div 
                key={event.id}
                className="p-2 rounded-lg hover:bg-muted/50 flex justify-between items-center"
              >
                <span>{event.title}</span>
                <Badge 
                  variant="secondary" 
                  className={`${eventTypes[event.type].color} text-white`}
                >
                  {eventTypes[event.type].label}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
