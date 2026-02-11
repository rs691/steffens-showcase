"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, Sprout } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  // { href: "/projects", label: "Projects" },
    { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  // { href: "/calendar", label: "Calendar" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/custom-sign", label: "Custom Sign" },
  { href: "/learn", label: "Everything Wood" },
  { href: "/events", label: "Events" },
];

const accountLinks = [
  // connects to the shopify headless store and cart. Needs to be configured before use. By default, shopify landing page
  // { href: "https://shopify.com", label: "Shopify" },
  // { href: "/checkout", label: "Checkout" },
   { href: "/cart", label: "Cart" },
  { href: "/register", label: "Register" },
   { href: "/login", label: "Login" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser({ email: user.email });
      }
    };
    fetchUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ email: session.user.email });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/";
  };

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
             <NavLink href="/cart" label="Cart" />
             {user ? (
               <div className="flex items-center gap-4">
                 <span className="text-sm font-medium text-muted-foreground">Welcome, {user.email?.split('@')[0]}</span>
                 <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
               </div>
             ) : (
               <>
                 <NavLink href="/register" label="Register" />
                 <NavLink href="/login" label="Login" />
               </>
             )}
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
                <NavLink href="/cart" label="Cart" />
                 {user ? (
                   <div className="flex flex-col gap-2">
                     <span className="text-muted-foreground">Welcome, {user.email?.split('@')[0]}</span>
                     <Button variant="ghost" className="justify-start px-0" onClick={handleLogout}>Logout</Button>
                   </div>
                 ) : (
                   <>
                     <NavLink href="/register" label="Register" />
                     <NavLink href="/login" label="Login" />
                   </>
                 )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
