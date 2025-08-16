import PageContainer from '@/./components/ui/PageContainer';
import type { EventInfo, Product } from '@/./types';
import { EventCard } from '@/components/events/EventCard';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { CalendarDays, ShoppingBag, Wand2 } from 'lucide-react';
import Link from 'next/link';

const featuredProducts: Product[] = [
  { id: '1', name: 'Custom Family Name Sign', description: 'Beautifully handcrafted wooden sign, personalized with your family name and established date.', price: '$75.00', imageUrl: '/images/woodGrain.jpg', category: 'Signs', dataAiHint: 'wood sign' },
  { id: '2', name: 'Rustic Wooden Coasters (Set of 4)', description: 'Protect your surfaces with style. These rustic coasters are made from reclaimed wood.', price: '$25.00', imageUrl: '/images/sunset.jpg', category: 'Decor', dataAiHint: 'wood coasters' },
  { id: '3', name: 'Handmade Bookshelf', description: 'A sturdy and elegant bookshelf, perfect for any room. Available in various finishes.', price: '$150.00', imageUrl: '/images/woodMachine.jpg', category: 'Furniture', dataAiHint: 'wood bookshelf' },
];

const upcomingEvents: EventInfo[] = [
 { id: '1', name: 'Spring Craft Fair', date: 'May 15, 2024', location: 'Downtown Plaza', description: 'Join us for the annual Spring Craft Fair!', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'craft fair' },
 { id: '2', name: 'Summer Market Days', date: 'July 20-21, 2024', location: 'City Park Pavilion', description: 'Find unique handcrafted goods all weekend long.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'summer market' },
];


export default function Home() {
  return (
    <PageContainer className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] rounded-lg overflow-hidden shadow-xl">
   
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Crafted Woodworks, Uniquely Yours
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
            Discover bespoke signs, decor, and furniture, handcrafted with passion and precision at Steffens Sign & Design.
          </p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/steffens-showcase/products">Explore Our Collections</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="font-headline text-3xl md:text-4xl font-semibold text-center mb-10">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="outline" asChild>
            <Link href="/steffens-showcase/products" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> View All Products
            </Link>
          </Button>
        </div>
      </section>

      {/* Custom Design Section */}
      <section className="bg-muted p-8 md:p-12 rounded-lg shadow-lg">
        <div className="text-center">
          <Wand2 className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="font-headline text-3xl md:text-4xl font-semibold mb-4">Design Your Own Masterpiece</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
            Have a unique idea? Use our custom design tool to bring your vision to life, or contact us for a consultation.
          </p>
          <Button size="lg" asChild>
            <Link href="/steffens-showcase/custom-design">Start Designing</Link>
          </Button>
        </div>
      </section>
      
      {/* Upcoming Events Section */}
      <section>
        <h2 className="font-headline text-3xl md:text-4xl font-semibold text-center mb-10">Upcoming Shows & Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingEvents.slice(0,2).map((event) => ( // Show only first 2 events on homepage
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="outline" asChild>
            <Link href="/steffens-showcase/events" className="flex items-center gap-2">
             <CalendarDays className="w-4 h-4" /> View All Events
            </Link>
          </Button>
        </div>
      </section>
    </PageContainer>
  );
}
