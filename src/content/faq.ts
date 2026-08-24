export type FaqEntry = {
  question: string;
  answer: string;
};

export const faqs: FaqEntry[] = [
  {
    question: "What types of wood do you typically work with?",
    answer:
      "I work with a wide variety of hardwoods, including oak, walnut, maple, and cherry. I also source exotic and specialty woods upon request for custom projects. Sustainability is key, so I prioritize locally sourced or FSC-certified lumber whenever possible.",
  },
  {
    question: "How long does a custom project usually take?",
    answer:
      "The timeline for a custom project varies greatly depending on the complexity, size, and my current workload. A small piece might take a few weeks, while a large dining set or built-in could take several months. I provide a detailed timeline estimate after our initial consultation.",
  },
  {
    question: "Can you restore antique furniture?",
    answer:
      "Absolutely. Restoration is one of my passions. I take great care to preserve the original character and integrity of each piece while making necessary repairs to ensure it can be enjoyed for generations to come. I use traditional techniques and materials appropriate for the period of the furniture.",
  },
  {
    question: "What is the process for starting a custom commission?",
    answer:
      "It starts with a conversation. You can contact me through the website with your ideas. We'll then have a consultation to discuss design, materials, and budget. Once we have a plan, I'll create a detailed proposal and design sketches. A deposit is required to secure your spot in my schedule and begin work.",
  },
  {
    question: "Do you deliver the furniture?",
    answer:
      "Yes, I offer delivery services. For local clients, I can often deliver the piece myself. For long-distance or international orders, I work with trusted shipping partners who specialize in handling fine furniture to ensure your piece arrives safely.",
  },
];

/** Extra process docs for RAG (not shown as FAQ accordion items). */
export const processDocs: FaqEntry[] = [
  {
    question: "Custom wooden sign process",
    answer:
      "Custom signs are designed in the on-site designer: choose text, wood stain, and size (small 12x8, medium 18x12, large 24x16). Each custom sign is priced at $120 before shipping. Add the design to your cart, then check out with Stripe. The Design Copilot can suggest wood, size, and wording, but the server always owns the final price.",
  },
  {
    question: "Outdoor vs indoor wood for signs",
    answer:
      "For outdoor signs prefer durable species and finishes. Red oak takes stain evenly for outdoor-facing pieces when sealed well. Walnut is premium for indoor display. Ask about weather-resistant finishes during consultation for porch or garden signs.",
  },
];
