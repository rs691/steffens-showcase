import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What types of wood do you typically work with?",
    answer: "I work with a wide variety of hardwoods, including oak, walnut, maple, and cherry. I also source exotic and specialty woods upon request for custom projects. Sustainability is key, so I prioritize locally sourced or FSC-certified lumber whenever possible."
  },
  {
    question: "How long does a custom project usually take?",
    answer: "The timeline for a custom project varies greatly depending on the complexity, size, and my current workload. A small piece might take a few weeks, while a large dining set or built-in could take several months. I provide a detailed timeline estimate after our initial consultation."
  },
  {
    question: "Can you restore antique furniture?",
    answer: "Absolutely. Restoration is one of my passions. I take great care to preserve the original character and integrity of each piece while making necessary repairs to ensure it can be enjoyed for generations to come. I use traditional techniques and materials appropriate for the period of the furniture."
  },
  {
    question: "What is the process for starting a custom commission?",
    answer: "It starts with a conversation. You can contact me through the website with your ideas. We'll then have a consultation to discuss design, materials, and budget. Once we have a plan, I'll create a detailed proposal and design sketches. A deposit is required to secure your spot in my schedule and begin work."
  },
  {
    question: "Do you deliver the furniture?",
    answer: "Yes, I offer delivery services. For local clients, I can often deliver the piece myself. For long-distance or international orders, I work with trusted shipping partners who specialize in handling fine furniture to ensure your piece arrives safely."
  }
];

export default function FAQPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-muted-foreground">Answers to common inquiries about my work and process.</p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-left font-headline text-lg hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
