"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Past Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/calendar", label: "Calendar" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const externalLinks = [
  { href: "https://shopify.com", label: "Shop" },
  { href: "https://shopify.com/cart", label: "Cart" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, label, isExternal = false }: { href: string; label: string, isExternal?: boolean }) => {
    const isActive = !isExternal && pathname === href;
    return (
      <Link
        href={href}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : ""}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-muted-foreground"
        )}
        onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
      >
        {label}
      </Link>
    );
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Sprout className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">Steffen's Showcase</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => <NavLink key={link.href} {...link} />)}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            {externalLinks.map((link) => <NavLink key={link.href} {...link} isExternal />)}
          </nav>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium mt-10">
                <Link href="/" className="flex items-center space-x-2 mb-4">
                  <Sprout className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">Steffen's Showcase</span>
                </Link>
                {navLinks.map((link) => <NavLink key={link.href} {...link} />)}
                <hr/>
                {externalLinks.map((link) => <NavLink key={link.href} {...link} isExternal />)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
