import { EventCard } from '@/components/events/EventCard';
import PageContainer from '@/components/ui/PageContainer';
import type { EventInfo } from '@/types';

const events: EventInfo[] = [
  { id: '1', name: 'Spring Craft Fair', date: 'May 15, 2024, 10:00 AM - 5:00 PM', location: 'Downtown Plaza, Anytown, USA', description: 'Join us for the annual Spring Craft Fair! Discover unique handmade items from local artisans, including our latest woodworking creations.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'craft fair spring' },
  { id: '2', name: 'Summer Market Days', date: 'July 20-21, 2024, 9:00 AM - 6:00 PM', location: 'City Park Pavilion, Anytown, USA', description: 'Find unique handcrafted goods all weekend long. We\'ll have a booth showcasing our custom signs, furniture, and home decor.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'summer market stall' },
  { id: '3', name: 'Fall Festival of Arts', date: 'October 5, 2024, 11:00 AM - 7:00 PM', location: 'Maple Street, Old Town District', description: 'Celebrate the autumn season with art, music, and crafts. We\'ll be featuring our seasonal woodworking items.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'fall festival art' },
  { id: '4', name: 'Holiday Craft Show', date: 'December 7-8, 2024, 10:00 AM - 4:00 PM', location: 'Community Center Auditorium', description: 'Get your holiday shopping done early! Find perfect, handcrafted gifts for everyone on your list.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'holiday craft show' },
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
