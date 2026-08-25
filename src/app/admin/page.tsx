import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, Images, LayoutDashboard, Mail, Receipt } from "lucide-react";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { getSupabaseServiceRoleKey } from "@/lib/supabase/env";
import { countRecentAgentSessions } from "@/lib/agent/sessions";
import { SeedKnowledgeButton } from "@/components/SeedKnowledgeButton";
import { AdminAssistant } from "@/components/AdminAssistant";

type RecentInquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

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
  let recentInquiries: RecentInquiry[] = [];
  const sessionCount = await countRecentAgentSessions(24);

  if (getSupabaseServiceRoleKey()) {
    try {
      const admin = createAdminSupabaseClient();
      const [inquiries, orders, knowledge, recent] = await Promise.all([
        admin.from("inquiries").select("id", { count: "exact", head: true }),
        admin.from("orders").select("id", { count: "exact", head: true }),
        admin.from("knowledge_chunks").select("id", { count: "exact", head: true }),
        admin
          .from("inquiries")
          .select("id, name, email, message, created_at")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);
      inquiryCount = inquiries.count ?? 0;
      orderCount = orders.count ?? 0;
      knowledgeCount = knowledge.count ?? 0;
      recentInquiries = (recent.data ?? []) as RecentInquiry[];
    } catch {
      inquiryCount = 0;
      orderCount = 0;
      knowledgeCount = 0;
      recentInquiries = [];
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
        <Card className="md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Mail /> Inquiries
            </CardTitle>
            <CardDescription>
              {inquiryCount} contact messages stored in Supabase.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentInquiries.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No inquiries yet. Submit one from /contact to populate this list.
              </p>
            ) : (
              <ul className="space-y-3">
                {recentInquiries.map((inquiry) => (
                  <li key={inquiry.id} className="rounded-md border bg-muted/20 p-3 text-sm">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-medium text-foreground">
                        {inquiry.name}{" "}
                        <span className="font-normal text-muted-foreground">
                          &lt;{inquiry.email}&gt;
                        </span>
                      </p>
                      <time className="text-xs text-muted-foreground">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </time>
                    </div>
                    <p className="mt-1 text-muted-foreground line-clamp-2">{inquiry.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
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
              <Images /> Public site
            </CardTitle>
            <CardDescription>Quick links to pages visitors see.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/gallery">Gallery</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/products">Products</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/custom-sign">Custom Sign</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
