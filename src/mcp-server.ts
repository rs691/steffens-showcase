import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import Stripe from 'stripe';
import pkg from 'pg';

const { Client } = pkg;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const db = new Client({ connectionString: process.env.DATABASE_URL });

const server = new Server(
  { name: "wood-design-bi-agent", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_sales_vs_inventory",
      description: "Correlates Stripe revenue with PostgreSQL stock levels.",
      inputSchema: {
        type: "object",
        properties: { productId: { type: "string" } },
        required: ["productId"]
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_sales_vs_inventory") {
    const { productId } = request.params.arguments as { productId: string };
    
    try {
      await db.connect();
      // Fetch stock from Postgres 
      const dbRes = await db.query('SELECT stock_level, name FROM products WHERE id = $1', [productId]);
      
      if (dbRes.rows.length === 0) {
        return {
          content: [{ type: "text", text: `Product with ID ${productId} not found.` }]
        };
      }

      const product = dbRes.rows[0];

      // Fetch sales from Stripe 
      const charges = await stripe.charges.list({ limit: 100 });
      const productSales = charges.data.filter(c => c.description?.includes(product.name));
      const totalRevenue = productSales.reduce((acc, c) => acc + c.amount, 0) / 100;

      return {
        content: [{ 
          type: "text", 
          text: `Product: ${product.name} | Current Stock: ${product.stock_level} | Total Revenue: $${totalRevenue}` 
        }]
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }]
      };
    } finally {
      await db.end();
    }
  }
  throw new Error("Tool not found");
});

const transport = new StdioServerTransport();
await server.connect(transport);
