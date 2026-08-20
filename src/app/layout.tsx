import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth";
import type { Metadata } from "next";
import { Literata } from "next/font/google";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Steffen's Showcase",
  description: "Custom woodworking, furniture, and handcrafted signs.",
  icons: {
    icon: "/sd1.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en" className={cn("dark", literata.variable)}>
      <body className={cn("min-h-screen bg-background font-body antialiased", literata.className)}>
        <CartProvider>
          <div className="relative flex min-h-screen w-full flex-col">
            <Header username={user?.username ?? user?.email ?? null} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}
