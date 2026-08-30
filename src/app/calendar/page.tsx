import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

export default function CalendarPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Availability</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Demo scheduling UI — part of the shop experience replica.
        </p>
      </div>
      <Card className="shadow-lg">
        <CardContent className="p-2 md:p-4">
          <Calendar
            mode="single"
            className="rounded-md border"
          />
        </CardContent>
      </Card>
      <div className="mt-8 text-center text-lg text-muted-foreground">
        <p>
          Use the{" "}
          <a href="/contact" className="text-primary underline hover:no-underline">
            contact form
          </a>{" "}
          to exercise the inquiry pipeline in this demo.
        </p>
      </div>
    </div>
  );
}
