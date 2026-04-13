"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ChatWidget } from "@/components/ChatWidget";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { FileText, GalleryHorizontal, LayoutDashboard, LogIn, LogOut, TrendingUp, Package, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// This is a mock authentication state.
// In a real app, this would be handled by another authentication provider.
let mockIsAuthenticated = false;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(mockIsAuthenticated);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "password") {
      mockIsAuthenticated = true;
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel.",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. (Hint: admin@example.com / password)",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    mockIsAuthenticated = false;
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-background">
        <Card className="w-full max-w-sm mx-auto shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold font-headline">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="admin@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full">
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
           <LayoutDashboard className="h-8 w-8 text-primary"/>
           <h1 className="text-4xl font-headline font-bold">Admin Dashboard</h1>
        </div>
        <Button onClick={handleLogout} variant="outline">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      <Separator className="my-8" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card className="bg-slate-900 border-slate-800 text-white p-6 shadow-xl relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Revenue</p>
              <h3 className="text-3xl font-bold mt-1">$12,450.00</h3>
              <p className="text-emerald-400 text-xs mt-2 flex items-center gap-1">
                <TrendingUp size={12} /> +12% from last month
              </p>
            </div>
            <div className="p-3 bg-slate-800 rounded-xl group-hover:scale-110 transition-transform">
              <TrendingUp className="text-primary h-6 w-6" />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUp size={120} />
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-white p-6 shadow-xl relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-slate-400 text-sm font-medium">Active Inventory</p>
              <h3 className="text-3xl font-bold mt-1">42 Pieces</h3>
              <p className="text-amber-400 text-xs mt-2">5 items low on stock</p>
            </div>
            <div className="p-3 bg-slate-800 rounded-xl group-hover:scale-110 transition-transform">
              <Package className="text-primary h-6 w-6" />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Package size={120} />
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-white p-6 shadow-xl relative overflow-hidden group">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-slate-400 text-sm font-medium">Registered Users</p>
              <h3 className="text-3xl font-bold mt-1">156</h3>
              <p className="text-slate-400 text-xs mt-2">8 new this week</p>
            </div>
            <div className="p-3 bg-slate-800 rounded-xl group-hover:scale-110 transition-transform">
              <Users className="text-primary h-6 w-6" />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users size={120} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline"><FileText/> Manage Projects</CardTitle>
            <CardDescription>Add, edit, or remove projects from your showcase.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">You have 6 projects currently listed.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/projects">View Projects</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline"><GalleryHorizontal/> Update Gallery</CardTitle>
            <CardDescription>Upload new images to your gallery.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Your gallery contains 9 images.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" variant="outline">
              <Link href="/gallery">Edit Gallery</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <ChatWidget isAdmin={true} />
    </div>
  );
}
