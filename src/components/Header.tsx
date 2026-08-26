"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/custom-sign", label: "Custom Sign" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

type HeaderProps = {
  username?: string | null;
};

function BrandMark({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      className={cn("flex min-w-0 items-center gap-2.5", className)}
    >
      <Image
        src="/sd1.png"
        alt=""
        width={32}
        height={32}
        className="h-8 w-8 shrink-0 rounded-sm object-cover"
        priority
      />
      <span className="font-headline text-base font-semibold leading-tight tracking-tight sm:text-lg">
        {compact ? (
          <>
            <span className="sm:hidden">Steffens</span>
            <span className="hidden sm:inline">Steffens Sign &amp; Design</span>
          </>
        ) : (
          "Steffens Sign & Design"
        )}
      </span>
    </Link>
  );
}

export function Header({ username }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const linkClass = (href: string) =>
    cn(
      "inline-flex h-10 items-center text-base font-medium leading-none transition-colors hover:text-primary",
      pathname === href ? "text-primary" : "text-muted-foreground",
    );

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={linkClass(href)}
      onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
    >
      {label}
    </Link>
  );

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
        className="inline-flex h-10 items-center gap-2 text-base font-medium leading-none text-muted-foreground transition-colors hover:text-primary"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <ShoppingCart className="h-5 w-5 shrink-0" aria-hidden />
        <span>Cart</span>
        {totalItems > 0 ? (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold leading-none text-primary-foreground">
            {totalItems}
          </span>
        ) : null}
      </Link>
      {username ? (
        <>
          <span className="inline-flex h-10 max-w-[10rem] items-center truncate text-base leading-none text-muted-foreground">
            {username}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-10 items-center text-base font-medium leading-none text-muted-foreground transition-colors hover:text-primary"
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
      <div className="container flex h-[4.25rem] items-center overflow-hidden">
        <BrandMark compact className="min-w-0 shrink" />
        <nav className="ml-8 hidden items-center gap-8 md:flex lg:ml-10 lg:gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="ml-auto flex shrink-0 items-center justify-end gap-2">
          <nav className="hidden items-center gap-8 md:flex">{accountLinks}</nav>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(100vw-2rem,20rem)] overflow-y-auto">
              <nav className="mt-10 grid gap-1 text-lg font-medium">
                <BrandMark className="mb-6" />
                {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
                ))}
                <hr className="my-4" />
                <div className="grid gap-1">{accountLinks}</div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
