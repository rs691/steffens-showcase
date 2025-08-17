import { Facebook, Instagram, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

// Simple Etsy SVG Icon
const EtsyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${props.className ?? ''}`} {...props}>
    <path d="M10.39 7.66h3.22c1.74 0 2.76.97 2.76 2.36 0 .9-.5 1.55-1.21 1.88L17.5 17H15.2l-2.03-4.35h-1.15v4.35H9.89V7.66h.5zm0 1.13v2.75h2.1c1.03 0 1.63-.58 1.63-1.38 0-.74-.55-1.37-1.58-1.37h-2.15z"></path>
  </svg>
);

const footerLinks = [
  { href: 'mailto:Steffens028@gmail.com', label: 'Steffens028@gmail.com', icon: Mail },
  { href: 'tel:402-676-2352', label: '(402) 676-2352', icon: Phone },
  { href: 'https://www.instagram.com/steffenssignanddesign', label: 'Instagram', icon: Instagram, target: '_blank' },
  { href: 'https://www.facebook.com/SteffensSignAndDesign', label: 'Facebook', icon: Facebook, target: '_blank' },
  { href: 'https://steffenssigndesign.etsy.com', label: 'Etsy', icon: EtsyIcon, target: '_blank' },
];

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          <div className="flex-1 min-w-[200px]">
            <h3 className="font-headline text-xl font-semibold text-foreground mb-3">Steffens Sign & Design</h3>
            <p className="text-sm">Crafted with passion, built to last.</p>
          </div>
          <div className="flex-1 min-w-[200px]">
            <h4 className="font-headline text-lg font-semibold text-foreground mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-primary">Products</Link></li>
              <li><Link href="/custom-design" className="hover:text-primary">Custom Design</Link></li>
              <li><Link href="/events" className="hover:text-primary">Events</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div className="flex-1 min-w-[200px]">
            <h4 className="font-headline text-lg font-semibold text-foreground mb-3">Connect With Us</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.target || '_self'}
                    rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    {/* Pass className to icons for consistent sizing */}
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Steffens Sign & Design. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
