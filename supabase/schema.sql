-- ==========================================================
-- 2026 AI-READY PROJECT SCHEMA (SUPABASE / POSTGRESQL)
-- ==========================================================

-- 0. ENABLE EXTENSIONS
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. UPGRADE EXISTING PRODUCTS TABLE
-- Adding AI-ready columns to your existing structure
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS stock_level INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS low_stock_threshold INTEGER DEFAULT 5,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- 2. AI KNOWLEDGE BASE (For the Customer Chatbot)
CREATE TABLE IF NOT EXISTS ai_knowledge_base (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(50) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    embedding vector(1536),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed data for AI Knowledge Base
INSERT INTO ai_knowledge_base (category, question, answer) VALUES 
('shipping', 'How long does shipping take?', 'Most of our handcrafted pieces take 2-3 weeks to build and ship. Custom orders may take up to 5 weeks.'),
('custom_orders', 'Can I request a specific wood type?', 'Yes! Steffen works primarily with Cedar, Oak, and reclaimed Pine. Contact us for exotic wood requests.'),
('pricing', 'Do you offer bulk discounts?', 'We offer a 10% discount for orders over 5 pieces of the same design—perfect for corporate wedding gifts or restaurant seating.');

-- 3. ORDERS & SALES (Linked to Stripe Sync Engine)
CREATE TABLE IF NOT EXISTS stripe_customers (
    id TEXT PRIMARY KEY,
    email TEXT,
    name TEXT,
    supa_user_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stripe_payments (
    id TEXT PRIMARY KEY,
    customer_id TEXT REFERENCES stripe_customers(id),
    amount INTEGER NOT NULL,
    currency TEXT,
    status TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stripe_payment_id TEXT REFERENCES stripe_payments(id),
    user_id UUID,
    status VARCHAR(50) DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    order_items JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ADMIN AUDIT LOGS
CREATE TABLE IF NOT EXISTS admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID,
    action_type VARCHAR(100) NOT NULL,
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. DATABASE TRIGGERS (Automated Low Stock Alerts)

-- Improved handler specifically for stock
CREATE OR REPLACE FUNCTION public.handle_low_stock_notification()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.stock_level < NEW.low_stock_threshold AND OLD.stock_level >= NEW.low_stock_threshold THEN
        INSERT INTO admin_audit_logs (action_type, description, metadata)
        VALUES (
            'AI_LOW_STOCK_ALERT',
            'Product "' || NEW.name || '" has fallen below threshold.',
            jsonb_build_object('product_id', NEW.id, 'stock', NEW.stock_level)
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Final Trigger Attachment
DROP TRIGGER IF EXISTS "automated-low-stock" ON public.products;
CREATE TRIGGER "automated-low-stock"
    AFTER UPDATE OF stock_level ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_low_stock_notification();

-- RLS & INDEXES
CREATE INDEX IF NOT EXISTS idx_products_stock ON public.products(stock_level);
ALTER TABLE ai_knowledge_base ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on AI KB" ON ai_knowledge_base FOR SELECT USING (true);

