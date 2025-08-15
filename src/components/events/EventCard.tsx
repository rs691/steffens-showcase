import Image from 'next/image';
import type { EventInfo } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, MapPin } from 'lucide-react';

interface EventCardProps {
  event: EventInfo;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {event.imageUrl && (
        <CardHeader className="p-0">
          <div className="aspect-video relative w-full">
            <Image
              src={event.imageUrl}
              alt={event.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={event.dataAiHint || "event location"}
            />
          </div>
        </CardHeader>
      )}
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
        {event.description && (
          <CardDescription className="text-sm">{event.description}</CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
