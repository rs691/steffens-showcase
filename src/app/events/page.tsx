import { EventCard } from '@/components/events/EventCard';
import PageContainer from '@/components/ui/PageContainer';
import type { EventInfo } from '@/types';

const events: EventInfo[] = [
  { id: '1', name: 'Fall Festival', date: 'Oct 4 - Oct 5, 2025, 10:00 AM - 12:00 AM', location: 'Florence, Omaha, NE', description: 'Join us for the annual Fall Festival! Discover unique handmade items from local artisans, including our latest woodworking creations.', imageUrl: '/fallFestEvent.jpg' },
  { id: '2', name: 'Summer Market Days', date: 'Dec 13, 2025, 9:00 AM - 6:00 PM', location: 'Aksarben Village, Omaha, NE', description: 'Find unique handcrafted goods all weekend long. We\'ll have a booth showcasing our custom signs, furniture, and home decor.', imageUrl: '/jingleMingle.jpg' },
  { id: '3', name: '54th Annual Rockbrook Village Art Fair', date: 'September 6-7, 2025, 10:00 AM - 2:00 PM', location: '2800 S 110th Street, Omaha, NE', description: 'Come see some of the best local artists and crafters at this annual event.', imageUrl: '/rockVill.svg' },
  { id: '4', name: 'Holiday Craft Show', date: 'December 7-8, 2025, 12:00 PM - 4:00 PM', location: 'Community Center Auditorium, Omaha, NE', description: 'Learn hand carving and techniques for creating beautiful wooden ornaments.', imageUrl: '/woodClassPoster2.png' },
];

export default function EventsPage() {
  return (
    <PageContainer>
      <h1 className="font-headline text-4xl md:text-5xl font-semibold text-center mb-12">Upcoming Shows & Events</h1>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">
          No upcoming events scheduled at this time. Check back soon!
        </p>
      )}
    </PageContainer>
  );
}
