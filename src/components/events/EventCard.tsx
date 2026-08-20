import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { EventInfo } from "@/types";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";

interface EventCardProps {
  event: EventInfo;
}

export function EventCard({ event }: EventCardProps) {
  const imageSrc = event.imageUrl ?? event.image;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {imageSrc ? (
        <CardHeader className="p-0">
          <div className="aspect-video relative w-full">
            <Image
              src={imageSrc}
              alt={event.name}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        </CardHeader>
      ) : null}
      <CardContent className="p-6">
        <CardTitle className="font-headline text-xl mb-2">{event.name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <CalendarDays className="w-4 h-4 mr-2 text-primary" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 mr-2 text-primary" />
          <span>{event.location}</span>
        </div>
        {event.description ? (
          <CardDescription className="text-sm">{event.description}</CardDescription>
        ) : null}
      </CardContent>
    </Card>
  );
}
