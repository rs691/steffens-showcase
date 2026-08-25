import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import Link from "next/link";

const EtsyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`h-5 w-5 shrink-0 ${props.className ?? ""}`}
    {...props}
  >
    <path d="M10.39 7.66h3.22c1.74 0 2.76.97 2.76 2.36 0 .9-.5 1.55-1.21 1.88L17.5 17H15.2l-2.03-4.35h-1.15v4.35H9.89V7.66h.5zm0 1.13v2.75h2.1c1.03 0 1.63-.58 1.63-1.38 0-.74-.55-1.37-1.58-1.37h-2.15z" />
  </svg>
);

const footerLinks = [
  { href: "mailto:Steffens028@gmail.com", label: "Steffens028@gmail.com", icon: Mail },
  { href: "tel:402-676-2352", label: "(402) 676-2352", icon: Phone },
  {
    href: "https://www.instagram.com/steffenssignanddesign",
    label: "Instagram",
    icon: Instagram,
    target: "_blank",
  },
  {
    href: "https://www.facebook.com/SteffensSignAndDesign",
    label: "Facebook",
    icon: Facebook,
    target: "_blank",
  },
  {
    href: "https://steffenssigndesign.etsy.com",
    label: "Etsy",
    icon: EtsyIcon,
    target: "_blank",
  },
];

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/custom-sign", label: "Custom Design" },
  { href: "/faq", label: "FAQ" },
  { href: "/learn", label: "Wood Guide" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-3 font-headline text-xl font-semibold text-foreground">
              Steffens Sign &amp; Design
            </h3>
            <p className="text-base leading-relaxed">
              Handcrafted signs and furniture from the Omaha area — built to last.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-headline text-lg font-semibold text-foreground">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-base sm:grid-cols-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="mb-3 font-headline text-lg font-semibold text-foreground">
              Connect With Us
            </h4>
            <ul className="space-y-3 text-base">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.target || "_self"}
                    rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-2 break-all transition-colors hover:text-primary sm:break-normal"
                  >
                    <link.icon className="mt-0.5 h-5 w-5 shrink-0" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm sm:text-base">
          <p>
            &copy; {new Date().getFullYear()} Steffens Sign &amp; Design. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
