import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth";
import type { Metadata } from "next";
import { Literata, Source_Sans_3 } from "next/font/google";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Steffens Sign & Design | Portfolio by Robert Stewart",
  description:
    "Full-stack portfolio demo: Next.js shop with Supabase, Stripe, and AI copilots. Built by Robert Stewart — not an official business site.",
  icons: {
    icon: "/sd1.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en" className={cn("dark", literata.variable, sourceSans.variable)}>
      <body className={cn("min-h-screen overflow-x-hidden bg-background font-body antialiased", sourceSans.className)}>
        <CartProvider>
          <div className="relative flex min-h-screen w-full min-w-0 flex-col">
            <Header username={user?.username ?? user?.email ?? null} />
            <main className="min-w-0 flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}
