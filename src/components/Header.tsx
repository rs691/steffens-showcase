"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, ShoppingCart, Sprout } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/custom-sign", label: "Custom Sign" },
  { href: "/learn", label: "Everything Wood" },
  { href: "/events", label: "Events" },
];

type HeaderProps = {
  username?: string | null;
};

export function Header({ username }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-muted-foreground",
        )}
        onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
      >
        {label}
      </Link>
    );
  };

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    setIsMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  const accountLinks = (
    <>
      <Link
        href="/cart"
        className="relative text-sm font-medium text-muted-foreground hover:text-primary"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <span className="inline-flex items-center gap-1">
          <ShoppingCart className="h-4 w-4" />
          Cart
          {totalItems > 0 ? (
            <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {totalItems}
            </span>
          ) : null}
        </span>
      </Link>
      {username ? (
        <>
          <span className="text-sm text-muted-foreground">{username}</span>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <NavLink href="/register" label="Register" />
          <NavLink href="/login" label="Login" />
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Sprout className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline">Steffen&apos;s Showcase</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-6">{accountLinks}</nav>

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
                  <span className="font-bold font-headline">Steffen&apos;s Showcase</span>
                </Link>
                {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
                ))}
                <hr />
                {accountLinks}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
