import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth";
import type { Metadata } from "next";
import { Barlow_Condensed, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-headline",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Steffens Sign & Design | Portfolio by Robert Stewart",
  description:
    "Full-stack portfolio demo: Next.js shop with Supabase, Stripe, and AI copilots. Built by Robert Stewart — not an official business site.",
  icons: {
    icon: "/favicon-mark.svg",
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
    <html
      lang="en"
      className={cn(barlowCondensed.variable, workSans.variable, plexMono.variable)}
      suppressHydrationWarning
    >
      <body className={cn("min-h-screen overflow-x-hidden bg-background font-body antialiased", workSans.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <CartProvider>
            <div className="relative flex min-h-screen w-full min-w-0 flex-col">
              <Header username={user?.username ?? user?.email ?? null} />
              <main className="min-w-0 flex-1">{children}</main>
              <Footer />
            </div>
          </CartProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
