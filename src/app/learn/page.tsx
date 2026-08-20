import PageContainer from "@/components/ui/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getWoods } from "@/lib/catalog";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const externalLinks = [
  {
    name: "The Wood Database",
    url: "https://www.wood-database.com/",
    description:
      "An extensive online resource for wood identification, properties, and characteristics.",
  },
  {
    name: "American Hardwood Information Center",
    url: "https://www.hardwoodinfo.com/specifying-professionals/species-guide/",
    description:
      "A comprehensive guide to American hardwood species, their properties, and sustainability.",
  },
  {
    name: "Wood Magazine",
    url: "https://www.woodmagazine.com/wood-supplies/wood-species",
    description:
      "Offers a guide to various wood species, their properties, and tips for working with them.",
  },
];

export default async function WoodsPage() {
  const woods = await getWoods();

  return (
    <PageContainer>
      <div className="py-12 md:py-20">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
            A Guide to Our Woods
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the unique characteristics of the hardwoods we use to craft
            custom furniture and signs.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {woods.map((wood) => (
            <Card key={wood.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
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

        <section className="mt-16 md:mt-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Curious for More?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            These external resources are great places to dive even deeper into woodworking and lumber.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {externalLinks.map((link) => (
              <Card key={link.url} className="flex flex-col items-center p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{link.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-primary hover:underline"
                >
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
