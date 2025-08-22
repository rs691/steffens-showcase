import PageContainer from '@/components/ui/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

const woods = [
  {
    name: "American Cherry 🍒",
    origin: "Eastern United States",
    characteristics: "Known for its rich, reddish-brown color that darkens with age and exposure to light. It has a fine, uniform grain and is moderately hard.",
    pricing: "Typically a mid-to-high priced hardwood, valued for its beautiful aging process and smooth finish.",
    facts: "Also known as Black Cherry. It's a popular choice for fine furniture and cabinetry."
  },
  {
    name: "Red Oak 🌳",
    origin: "Eastern and Central United States",
    characteristics: "A very popular and durable wood with a distinctive, coarse, open grain pattern. Its color ranges from a light reddish-brown to pinkish-red.",
    pricing: "Generally an affordable and widely available hardwood, making it a great value for many projects.",
    facts: "Its open grain accepts stain very well, which allows for a wide range of finishes. The pores can be seen and felt in the grain."
  },
  {
    name: "American White Ash 🪵",
    origin: "Eastern North America",
    characteristics: "A light-colored, straight-grained wood with a very similar appearance to oak, but without the pronounced grain pattern. It's known for its excellent strength and shock resistance.",
    pricing: "Similar to oak, it's an accessible and cost-effective option for many applications.",
    facts: "Due to its flexibility and durability, ash is the traditional wood used for baseball bats and tool handles."
  },
  {
    name: "American Black Walnut 🌰",
    origin: "Eastern United States",
    characteristics: "Prized for its beautiful, deep chocolate-brown color and often stunning grain patterns, which can include swirls and burls. It's a strong and stable wood.",
    pricing: "One of the more expensive domestic hardwoods due to its desirability, color, and workability.",
    facts: "The color of walnut can lighten over time with exposure to sunlight, so some finishes are used to help preserve its deep tone."
  },
  {
    name: "European Ash 🌳",
    origin: "Europe and Western Asia",
    characteristics: "Similar to its American cousin but can have a slightly creamier color. It shares the same toughness and resistance to splitting.",
    pricing: "Its price is comparable to American Ash and is often chosen for similar projects like furniture and sports equipment.",
    facts: "It's a common choice for bentwood furniture due to its ability to be steamed and shaped."
  },
  {
    name: "Tropical Hardwoods (Sapele, Zebrano) 🌴",
    origin: "Africa (Sapele, Zebrano)",
    characteristics: "These woods are known for their exotic colors and striking grain patterns. Sapele has a lustrous, ribbon-like grain, while Zebrano is famous for its bold, zebra-like stripes.",
    pricing: "Pricing varies greatly, but they are generally on the higher end due to their unique appearance and import costs. Zebrano, in particular, is one of the more expensive choices.",
    facts: "Sapele is often used as a sustainable alternative to Mahogany. The grain of Zebrano can make it a challenging wood to work with, but the final aesthetic is worth it."
  },
  {
    name: "American Hard Maple 🍁",
    origin: "Northeastern United States and Canada",
    characteristics: "A very hard, dense wood with a fine, uniform grain. Its color is a creamy white, and it can feature unique patterns like 'bird's eye' or 'curly' maple.",
    pricing: "A durable and moderately priced option. The price increases significantly for pieces with unique grain patterns.",
    facts: "Maple's hardness makes it ideal for butcher blocks, cutting boards, and high-traffic flooring."
  },
  {
    name: "Poplar 🌱",
    origin: "Eastern North America",
    characteristics: "A lightweight, soft hardwood with a uniform, straight grain. Its color is often a pale yellowish-white, and it can have streaks of green or purple.",
    pricing: "One of the most affordable and widely available hardwoods, making it a budget-friendly option.",
    facts: "Because of its smooth surface and lack of prominent grain, poplar is an excellent choice for painted projects."
  },
  {
    name: "Pine 🌲",
    origin: "North America, Europe, and Asia",
    characteristics: "A common softwood known for its creamy white to yellowish color and distinct knots. It's lightweight and easy to work with.",
    pricing: "One of the most inexpensive and accessible woods, perfect for rustic or budget-conscious projects.",
    facts: "There are many species of pine, with some of the most common being White Pine and Yellow Pine."
  }
];

const externalLinks = [
  {
    name: "The Wood Database",
    url: "https://www.wood-database.com/",
    description: "An extensive online resource for wood identification, properties, and characteristics."
  },
  {
    name: "American Hardwood Information Center",
    url: "https://www.hardwoodinfo.com/specifying-professionals/species-guide/",
    description: "A comprehensive guide to American hardwood species, their properties, and sustainability."
  },
  {
    name: "Wood Magazine",
    url: "https://www.woodmagazine.com/wood-supplies/wood-species",
    description: "Offers a guide to various wood species, their properties, and tips for working with them."
  }
];

export default function WoodsPage() {
  return (
    <PageContainer>
      <div className="py-12 md:py-20">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">A Guide to Our Woods</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the unique characteristics of the hardwoods we use to craft custom furniture and signs. Learn about their origins, appearance, and what makes each one special.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {woods.map((wood, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary">{wood.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span className="font-medium">Origin:</span>
                  <span>{wood.origin}</span>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Characteristics</h3>
                  <p className="text-sm text-muted-foreground">{wood.characteristics}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Pricing</h3>
                  <p className="text-sm text-muted-foreground">{wood.pricing}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Interesting Fact</h3>
                  <p className="text-sm text-muted-foreground">{wood.facts}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Learn More Section */}
        <section className="mt-16 md:mt-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Curious for More?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            These external resources are great places to dive even deeper into the world of woodworking and lumber.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {externalLinks.map((link, index) => (
              <Card key={index} className="flex flex-col items-center p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{link.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                <Link href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-primary hover:underline">
                  <span>Visit Website</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>

  );
}
