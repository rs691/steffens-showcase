
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Palette, Pencil, Ruler, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from 'react';

const stainColors: { [key: string]: string } = {
    // add an image as a background possibility
    // 'woodBackground': 'bg-[url("/steffens-showcase/woodBack.svg")]',
    'natural-pine': 'bg-[#f3d4a3]',
    'dark-walnut': 'bg-[#5a3825]',
    'classic-gray': 'bg-[#a3a3a3]',
    'woodTexture2': 'bg-[url("/steffens-showcase/woodTexture2.svg")]',
    // 'woodTexture': 'bg-[url("/steffens-showcase/woodTexture4.svg")]',
    // 'woodTextureLighter': 'bg-[url("/steffens-showcase/woodTextureLighter.svg")]',
    
    
};

const sizeClasses: { [key: string]: string } = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-6xl',
    // extraLarge: 'text-8xl',
};


export default function CustomSignDesignerPage() {
    const { toast } = useToast();
    const [text, setText] = useState("Enter text");
    const [graphic, setGraphic] = useState<string | null>(null);
    const [stain, setStain] = useState('dark-walnut');
    const [size, setSize] = useState('medium');

    function handleAddToCart(event: React.FormEvent) {
        event.preventDefault();
        toast({
            title: "Added to Cart!",
            description: "Your custom sign has been added to your cart.",
            variant: 'default',
        });
    }

    // function to handle graphic changes. This works by reading the uploaded file and setting it as the graphic.
    const handleGraphicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setGraphic(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

  return (
    
    <div className="container mx-auto max-w-6xl py-12 px-4">
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 items-start">
            <div className="sticky top-24">
                <Card className="overflow-hidden shadow-lg">
                    <CardContent className="p-4 bg-muted/30">
                        <div className={cn("aspect-square rounded-lg flex items-center justify-center p-8 relative overflow-hidden", stainColors[stain])}>
                            {graphic ? (
                                <Image 
                                    src={graphic} 
                                    alt="Custom Sign Preview"
                                    layout="fill"
                                    className="object-contain"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-black/10"></div>
                            )}
                            <div className={cn("relative text-center text-white font-headline whitespace-pre-wrap", sizeClasses[size])} style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>
                                {text}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="mt-4 text-sm text-muted-foreground text-center">
                    <p>See how your choice of background looks with text.</p>
                </div>
            </div>

            <div>
                <h1 className="text-3xl lg:text-4xl font-bold font-headline text-primary">Custom Wooden Sign</h1>
                <p className="text-2xl font-semibold mt-2 text-foreground/90">$120.00</p>
                <p className="text-muted-foreground mt-4 text-base">
                    Create a one-of-a-kind wooden sign, personalized by you. Perfect for homes, businesses, or as a thoughtful gift. Select your options below to get started.
                </p>

                <form onSubmit={handleAddToCart} className="mt-8 space-y-8">
                    <div className="space-y-4">
                        <Label htmlFor="custom-text" className="text-lg font-semibold font-headline flex items-center gap-2">
                           <Pencil className="h-5 w-5" /> Personalized Text
                        </Label>
                        <Textarea 
                            id="custom-text" 
                            placeholder="e.g., The Millers Est. 2023" 
                            rows={3} 
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">Enter the text exactly as you want it to appear on the sign.</p>
                    </div>

                    <div className="space-y-4">
                        <Label htmlFor="logo-upload" className="text-lg font-semibold font-headline flex items-center gap-2">
                           <Upload className="h-5 w-5" /> Upload Your Graphic
                        </Label>
                        <Input id="logo-upload" type="file" className="file:text-primary file:font-semibold" onChange={handleGraphicChange} accept="image/png, image/jpeg, image/svg+xml"/>
                        <p className="text-sm text-muted-foreground">Optional. We accept PNG, JPG, and SVG files.</p>
                    </div>
                    
                    <Separator/>

                     <div className="space-y-4">
                        <Label className="text-lg font-semibold font-headline flex items-center gap-2">
                            <Palette className="h-5 w-5" /> Wood Stain
                        </Label>
                        <RadioGroup defaultValue="dark-walnut" className="flex flex-wrap gap-4" value={stain} onValueChange={setStain}>
                            <Label htmlFor="natural-pine" className="flex flex-col items-center gap-2 cursor-pointer p-2 border-2 border-transparent rounded-md hover:bg-muted has-[:checked]:border-primary transition-all">
                                <RadioGroupItem value="natural-pine" id="natural-pine" className="sr-only"/>
                                <div className="w-16 h-16 rounded-full bg-[#f3d4a3] border-2 border-muted/50 shadow-inner"></div>
                                <span className="text-sm font-medium">Natural Pine</span>
                            </Label>
                             <Label htmlFor="dark-walnut" className="flex flex-col items-center gap-2 cursor-pointer p-2 border-2 border-transparent rounded-md hover:bg-muted has-[:checked]:border-primary transition-all">
                                <RadioGroupItem value="dark-walnut" id="dark-walnut" className="sr-only" />
                                <div className="w-16 h-16 rounded-full bg-[#5a3825] border-2 border-muted/50 shadow-inner"></div>
                                <span className="text-sm font-medium">Dark Walnut</span>
                            </Label>
                             <Label htmlFor="classic-gray" className="flex flex-col items-center gap-2 cursor-pointer p-2 border-2 border-transparent rounded-md hover:bg-muted has-[:checked]:border-primary transition-all">
                                <RadioGroupItem value="classic-gray" id="classic-gray" className="sr-only"/>
                                <div className="w-16 h-16 rounded-full bg-[#a3a3a3] border-2 border-muted/50 shadow-inner"></div>
                                <span className="text-sm font-medium">Classic Gray</span>
                            </Label>
                                    <Label htmlFor="woodTexture2" className="flex flex-col items-center gap-2 cursor-pointer p-2 border-2 border-transparent rounded-md hover:bg-muted has-[:checked]:border-primary transition-all">
                                <RadioGroupItem value="woodTexture2" id="woodTexture2" className="sr-only"/>
                                <div className="w-16 h-16 rounded-full bg-[url('/steffens-showcase/woodTexture2.svg')] border-2 border-muted/50 shadow-inner"></div>
                                <span className="text-sm font-medium">Wood Texture</span>
                            </Label>
                          {/*  <Label htmlFor="woodBackground" className="flex flex-col items-center gap-2 cursor-pointer p-2 border-2 border-transparent rounded-md hover:bg-muted has-[:checked]:border-primary transition-all">
                                <RadioGroupItem value="woodBackground" id="woodBackground" className="sr-only"/>
                                <div className="w-16 h-16 rounded-full bg-[url('/steffens-showcase/woodBack.svg')] border-2 border-muted/50 shadow-inner"></div>
                                <span className="text-sm font-medium">Fine Wood Texture</span>
                             </Label>
                                   <Label htmlFor="woodTexture" className="flex flex-col items-center gap-2 cursor-pointer p-2 border-2 border-transparent rounded-md hover:bg-muted has-[:checked]:border-primary transition-all">
                                <RadioGroupItem value="woodTexture" id="woodTexture" className="sr-only"/>
                                <div className="w-16 h-16 rounded-full bg-[url('/steffens-showcase/woodTexture4.svg')] border-2 border-muted/50 shadow-inner"></div>
                                <span className="text-sm font-medium">Wood Texture</span>
                            </Label> */}
                     
                                {/* <Label htmlFor="straightTexture" className="flex flex-col items-center gap-2 cursor-pointer p-2 border-2 border-transparent rounded-md hover:bg-muted has-[:checked]:border-primary transition-all">
                                <RadioGroupItem value="straightTexture" id="straightTexture" className="sr-only"/>
                                <div className="w-16 h-16 rounded-full bg-[url('/steffens-showcase/straightTexture.svg')] border-2 border-muted/50 shadow-inner"></div>
                                <span className="text-sm font-medium">Straight Wood Texture</span>
                            </Label> */}
                        </RadioGroup>
                    </div>

                    <div className="space-y-4">
                        <Label htmlFor="size-select" className="text-lg font-semibold font-headline flex items-center gap-2">
                            <Ruler className="h-5 w-5" /> Sign Size
                        </Label>
                        <Select value={size} onValueChange={setSize}>
                            <SelectTrigger id="size-select" className="w-full md:w-[280px]">
                                <SelectValue placeholder="Select a size" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="small">Small (12" x 8")</SelectItem>
                                <SelectItem value="medium">Medium (18" x 12")</SelectItem>
                                <SelectItem value="large">Large (24" x 16")</SelectItem>
                                {/* <SelectItem value="extra-large">Extra Large (36" x 24")</SelectItem> */}
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator />
                    
                    <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold">
                        Add to Cart
                    </Button>
                </form>
            </div>
        </div>
    </div>
  );
}
