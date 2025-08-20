import PageContainer from '@/./components/ui/PageContainer';
import type { EventInfo, Product } from '@/./types';
import { Button } from '@/components/ui/button';
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
           Learn about the materials used so you can make informed decisions for your projects.
          </p>
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/steffens-showcase/products">Explore Options</Link>
          </Button>
        </div>
      </section>




    </PageContainer>
  );
}
