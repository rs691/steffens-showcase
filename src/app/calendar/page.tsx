import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

export default function CalendarPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Availability</h1>
        <p className="mt-4 text-lg text-muted-foreground">Check my schedule for commission availability and upcoming events.</p>
      </div>
      <Card className="shadow-lg">
        <CardContent className="p-2 md:p-4">
          <Calendar
            mode="single"
            className="rounded-md border"
          />
        </CardContent>
      </Card>
      <div className="mt-8 text-center text-muted-foreground">
        <p>Please <a href="/steffens-showcase/contact" className="text-primary underline hover:no-underline">contact me</a> to discuss project timelines and book a slot.</p>
      </div>
    </div>
  );
}
