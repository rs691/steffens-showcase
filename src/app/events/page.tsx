import { EventCard } from '@/components/events/EventCard';
import PageContainer from '@/components/ui/PageContainer';
import type { EventInfo } from '@/types';

const events: EventInfo[] = [
  { id: '1', name: 'Fall Festival', date: 'Oct 4 - Oct 5, 2025, 10:00 AM - 12:00 AM', location: 'Florence, Omaha, USA', description: 'Join us for the annual Fall Festival! Discover unique handmade items from local artisans, including our latest woodworking creations.', imageUrl: '/steffens-showcase/fallFestEvent.jpg' },
  { id: '2', name: 'Summer Market Days', date: 'Dec 13, 2025, 9:00 AM - 6:00 PM', location: 'Aksarben Village, Omaha, USA', description: 'Find unique handcrafted goods all weekend long. We\'ll have a booth showcasing our custom signs, furniture, and home decor.', imageUrl: '/steffens-showcase/jingleMingle.jpg', dataAiHint: 'summer market stall' },
  { id: '3', name: 'Fall Festival of Arts', date: 'October 5, 2024, 11:00 AM - 7:00 PM', location: 'Maple Street, Old Town District', description: 'Celebrate the autumn season with art, music, and crafts. We\'ll be featuring our seasonal woodworking items.', imageUrl: '/steffens-showcase/fallFestivalArts.png', dataAiHint: 'fall festival art' },
  { id: '4', name: 'Holiday Craft Show', date: 'December 7-8, 2024, 10:00 AM - 4:00 PM', location: 'Community Center Auditorium', description: 'Get your holiday shopping done early! Find perfect, handcrafted gifts for everyone on your list.', imageUrl: '/steffens-showcase/holidayCraftShow.png', dataAiHint: 'holiday craft show' },
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
