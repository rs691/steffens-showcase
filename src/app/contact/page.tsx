import { ContactForm } from "@/components/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Get in Touch</h1>
        <p className="mt-4 text-lg text-muted-foreground">I'd love to hear about your project ideas. Let's create something together.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-card p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-headline font-semibold mb-6">Contact Form</h2>
          <ContactForm />
        </div>
        <div className="flex flex-col justify-center space-y-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
              <Mail className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold font-headline">Email</h3>
              <p className="text-muted-foreground">Send your inquiries and ideas to</p>
              <a href="mailto:steffen@showcase.com" className="text-primary hover:underline">
               Steffens028@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
              <Phone className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold font-headline">Phone</h3>
              <p className="text-muted-foreground">For direct consultations, call</p>
              <a href="tel:+4026762352" className="text-primary hover:underline">
                (402) 676-2352
              </a>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPin className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold font-headline">Workshop</h3>
              <p className="text-muted-foreground">Visits by appointment only</p>
              <p className="text-primary">123 Craftsmanship Lane, Woodwork City</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
