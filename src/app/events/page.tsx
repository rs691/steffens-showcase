import { EventCard } from "@/components/events/EventCard";
import PageContainer from "@/components/ui/PageContainer";
import { getEvents } from "@/lib/catalog";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <PageContainer>
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">
          Upcoming Shows &amp; Events
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Markets and demos where this portfolio shop theme would appear.
        </p>
      </div>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-muted-foreground">
          No upcoming events scheduled at this time. Check back soon!
        </p>
      )}
    </PageContainer>
  );
}
