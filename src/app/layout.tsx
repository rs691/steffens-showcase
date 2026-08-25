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
  title: "Steffens Sign & Design",
  description: "Custom woodworking, furniture, and handcrafted signs in Omaha, Nebraska.",
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
    <html lang="en" className={cn("dark", literata.variable, sourceSans.variable)}>
      <body className={cn("min-h-screen bg-background font-body antialiased", sourceSans.className)}>
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
