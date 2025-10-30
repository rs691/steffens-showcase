"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { FileText, GalleryHorizontal, LayoutDashboard, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline"><FileText/> Manage Projects</CardTitle>
            <CardDescription>Add, edit, or remove projects from your showcase.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">You have 6 projects currently listed.</p>
            <Button asChild><Link href="/projects">View Projects</Link></Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline"><GalleryHorizontal/> Update Gallery</CardTitle>
            <CardDescription>Upload new images to your gallery.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Your gallery contains 9 images.</p>
            <Button asChild><Link href="/gallery">Edit Gallery</Link></Button>
          </CardContent>
        </Card>
   
      </div>
    </div>
  );
}
