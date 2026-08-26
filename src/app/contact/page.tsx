import { ContactForm } from "@/components/ContactForm";
import { Github, Globe, Linkedin } from "lucide-react";

const hiringLinks = [
  {
    href: "https://robert-stewart.dev",
    label: "Portfolio",
    detail: "robert-stewart.dev",
    icon: Globe,
  },
  {
    href: "https://github.com/rs691/steffens-showcase",
    label: "GitHub",
    detail: "Source for this demo",
    icon: Github,
  },
  {
    href: "https://linkedin.com/in/robert-stewart-m",
    label: "LinkedIn",
    detail: "Robert Stewart",
    icon: Linkedin,
  },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-10 text-center sm:mb-12">
        <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">Get in Touch</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Hiring or curious about the stack? Reach Robert Stewart below. The form exercises the demo
          inquiry pipeline (Supabase).
        </p>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
        <div className="rounded-lg bg-card p-6 shadow-lg sm:p-8">
          <h2 className="mb-2 font-headline text-2xl font-semibold">Demo inquiry form</h2>
          <p className="mb-6 text-base text-muted-foreground">
            Submissions are stored for the admin dashboard walkthrough — not routed to a woodworking
            shop.
          </p>
          <ContactForm />
        </div>
        <div className="flex flex-col justify-center space-y-8">
          {hiringLinks.map((link) => (
            <div key={link.href} className="flex items-start">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <link.icon className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <h3 className="font-headline text-lg font-semibold">{link.label}</h3>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-primary hover:underline"
                >
                  {link.detail}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
