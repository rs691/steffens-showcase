import { EventCard } from "@/components/events/EventCard";
import PageContainer from "@/components/ui/PageContainer";
import { getEvents } from "@/lib/catalog";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <PageContainer>
      <h1 className="font-headline text-4xl md:text-5xl font-semibold text-center mb-12">
        Upcoming Shows & Events
      </h1>
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
