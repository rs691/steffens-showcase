#!/usr/bin/env node
/**
 * TEST SCRIPT: SI-ST-V1 (Stripe-Inventory-Verification)
 * Use this to verify your 2026 AI Workflow locally.
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use Service Role for testing triggers
);

async function testVercelWorkflow() {
  console.log("🚀 Starting Local Workflow Test...");

  // 1. Check if Products table is upgraded
  const { data: product, error: pError } = await supabase
    .from('products')
    .select('stock_level, low_stock_threshold')
    .limit(1)
    .single();

  if (pError) {
    console.error("❌ Products table not upgraded. Did you run schema.sql?", pError.message);
    return;
  }
  console.log("✅ Products table verified with AI columns.");

  // 2. Test the Low Stock Trigger
  console.log("Testing Database Trigger...");
  const testId = (await supabase.from('products').select('id').limit(1).single()).data.id;
  
  const { error: uError } = await supabase
    .from('products')
    .update({ stock_level: 2, low_stock_threshold: 5 }) // Force a low stock state
    .eq('id', testId);

  if (uError) {
    console.error("❌ Failed to update stock:", uError.message);
    return;
  }

  // 3. Verify the Audit Log was created
  const { data: log, error: lError } = await supabase
    .from('admin_audit_logs')
    .select('*')
    .eq('action_type', 'AI_LOW_STOCK_ALERT')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (lError || !log) {
    console.error("❌ Trigger failed to create audit log. Check trigger definition.");
  } else {
    console.log("✅ SUCCESS: Database Trigger automatically created an AI Stock Alert!");
    console.log(`📝 Log Detail: ${log.description}`);
  }

  console.log("\n--- NEXT STEPS FOR VERCEL ---");
  console.log("1. Run 'npm run build' to ensure no TypeScript errors.");
  console.log("2. Push to GitHub to trigger Vercel Preview.");
  console.log("3. Add your .env variables to Vercel Dashboard.");
}

testVercelWorkflow();
