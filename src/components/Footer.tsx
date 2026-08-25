import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import Link from "next/link";

const EtsyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`h-5 w-5 ${props.className ?? ""}`}
    aria-hidden
    {...props}
  >
    <path d="M10.39 7.66h3.22c1.74 0 2.76.97 2.76 2.36 0 .9-.5 1.55-1.21 1.88L17.5 17H15.2l-2.03-4.35h-1.15v4.35H9.89V7.66h.5zm0 1.13v2.75h2.1c1.03 0 1.63-.58 1.63-1.38 0-.74-.55-1.37-1.58-1.37h-2.15z" />
  </svg>
);

const socialLinks = [
  {
    href: "https://www.instagram.com/steffenssignanddesign",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://www.facebook.com/SteffensSignAndDesign",
    label: "Facebook",
    icon: Facebook,
  },
  {
    href: "https://steffenssigndesign.etsy.com",
    label: "Etsy",
    icon: EtsyIcon,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-md space-y-4">
            <div>
              <h3 className="font-headline text-xl font-semibold text-foreground">
                Steffens Sign &amp; Design
              </h3>
              <p className="mt-2 text-base leading-relaxed">
                Handcrafted signs and furniture from the Omaha area.
              </p>
            </div>
            <ul className="space-y-2 text-base">
              <li>
                <a
                  href="mailto:Steffens028@gmail.com"
                  className="inline-flex items-center gap-2 break-all hover:text-primary sm:break-normal"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                  Steffens028@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+14026762352"
                  className="inline-flex items-center gap-2 hover:text-primary"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden />
                  (402) 676-2352
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background/40 text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm sm:text-left sm:text-base">
          <p>
            &copy; {new Date().getFullYear()} Steffens Sign &amp; Design. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
