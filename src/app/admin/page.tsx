import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, FileText, Images, LayoutDashboard, Mail, Receipt } from "lucide-react";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { getSupabaseServiceRoleKey } from "@/lib/supabase/env";
import { countRecentAgentSessions } from "@/lib/agent/sessions";
import { SeedKnowledgeButton } from "@/components/SeedKnowledgeButton";
import { AdminAssistant } from "@/components/AdminAssistant";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login?from=/admin");
  }
  if (!user.isAdmin) {
    redirect("/");
  }

  let inquiryCount = 0;
  let orderCount = 0;
  let knowledgeCount = 0;
  const sessionCount = await countRecentAgentSessions(24);

  if (getSupabaseServiceRoleKey()) {
    try {
      const admin = createAdminSupabaseClient();
      const [inquiries, orders, knowledge] = await Promise.all([
        admin.from("inquiries").select("id", { count: "exact", head: true }),
        admin.from("orders").select("id", { count: "exact", head: true }),
        admin.from("knowledge_chunks").select("id", { count: "exact", head: true }),
      ]);
      inquiryCount = inquiries.count ?? 0;
      orderCount = orders.count ?? 0;
      knowledgeCount = knowledge.count ?? 0;
    } catch {
      inquiryCount = 0;
      orderCount = 0;
      knowledgeCount = 0;
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 mb-8">
        <LayoutDashboard className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-4xl font-headline font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Signed in as {user.username}</p>
        </div>
      </div>

      <div className="mb-10">
        <AdminAssistant />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Mail /> Inquiries
            </CardTitle>
            <CardDescription>{inquiryCount} contact messages stored in Supabase.</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Receipt /> Orders
            </CardTitle>
            <CardDescription>{orderCount} Stripe checkouts recorded by webhook.</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Bot /> Design Copilot
            </CardTitle>
            <CardDescription>
              {sessionCount} sessions in the last 24h · {knowledgeCount} RAG chunks indexed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SeedKnowledgeButton />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <FileText /> Manage Projects
            </CardTitle>
            <CardDescription>Review the public project showcase.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/projects">View Projects</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Images /> Update Gallery
            </CardTitle>
            <CardDescription>Open the gallery that visitors see.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/gallery">View Gallery</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
