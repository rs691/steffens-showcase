
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
import { Palette, Pencil, Ruler, Type, Square, Upload } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from 'react';
import { CUSTOM_SIGN_PRICE_USD } from "@/lib/pricing";
import { useCart } from "../context/CartContext";
import { DesignAssistant } from "@/components/DesignAssistant";
import type { DesignDraft } from "@/lib/agent/design-tools";

const stainColors: { [key: string]: string } = {
    // add an image as a background possibility
    'woodBackground': 'bg-[url("/woodBack.svg")]',
    'amerBlackWalnut': 'bg-[url("/amerBlackWalnut.svg")]',
    'amerWhiteAsh': 'bg-[url("/amerWhiteAsh.svg")]',
    'zebrano': 'bg-[url("/zebrano.svg")]',
    'redOak': 'bg-[url("/redOak.svg")]',
    'americanCherry': 'bg-[url("/americanCherry.svg")]'
};

const sizeClasses: { [key: string]: string } = {
    small: "text-xl sm:text-2xl",
    medium: "text-2xl sm:text-4xl",
    large: "text-3xl sm:text-5xl md:text-6xl",
};

type SignShape = "rectangle" | "oval" | "arch" | "house";

const shapeStyles: Record<SignShape, React.CSSProperties> = {
    rectangle: {},
    oval: { clipPath: "ellipse(50% 42% at 50% 50%)" },
    arch: { borderRadius: "50% 50% 8px 8px / 60% 60% 8px 8px" },
    house: { clipPath: "polygon(50% 0%, 100% 28%, 100% 100%, 0% 100%, 0% 28%)" },
};

const shapeLabels: Record<SignShape, string> = {
    rectangle: "Rectangle",
    oval: "Oval",
    arch: "Arch",
    house: "House",
};

const textColorSwatches: { value: string; label: string }[] = [
    { value: "#F7F3E8", label: "Paper" },
    { value: "#1C1A16", label: "Charcoal" },
    { value: "#D9A441", label: "Gold leaf" },
    { value: "#5B8CA6", label: "Chalk blue" },
];


export default function CustomSignDesignerPage() {
    const { toast } = useToast();
    const {addToCart} = useCart();
    const [text, setText] = useState<string>('');
    const [graphic, setGraphic] = useState<string | null>(null);
    const [stain, setStain] = useState<DesignDraft["stain"]>('amerBlackWalnut');
    const [size, setSize] = useState<DesignDraft["size"]>('medium');
    const [textColor, setTextColor] = useState<string>(textColorSwatches[0].value);
    const [shape, setShape] = useState<SignShape>('rectangle');

    // Bumped on any change that should re-trigger the engraving reveal animation.
    const revealKey = useMemo(
        () => [text, graphic, stain, size, textColor, shape].join('|'),
        [text, graphic, stain, size, textColor, shape],
    );

    function handleAddToCart(event: React.FormEvent) {
        event.preventDefault();

 addToCart({
      kind: "custom-sign",
      text,
      graphic,
      stain,
      size,
      price: CUSTOM_SIGN_PRICE_USD,
      textColor,
      shape,
    });


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
    
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="grid items-start gap-x-12 gap-y-8 md:grid-cols-2">
            <div className="md:sticky md:top-24">
                <Card className="overflow-hidden shadow-lg">
                    <CardContent className="bg-muted/30 p-3 sm:p-4">
                        <div
                            key={revealKey}
                            className={cn(
                                "relative flex aspect-square items-center justify-center overflow-hidden rounded-lg p-4 sm:p-8 animate-engrave",
                                stainColors[stain],
                            )}
                            style={shapeStyles[shape]}
                        >
                            {graphic ? (
                                <Image 
                                    src={graphic} 
                                    alt="Custom Sign Preview"
                                    fill
                                    className="object-contain"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-black/10"></div>
                            )}
                            <div
                                className={cn("relative max-w-full break-words px-2 text-center font-headline whitespace-pre-wrap", sizeClasses[size])}
                                style={{ color: textColor, textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
                            >
                                {text}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="mt-4 text-center text-base text-muted-foreground">
                    <p>See how your choice of background looks with text.</p>
                </div>
            </div>

            <div className="min-w-0">
                <h1 className="font-headline text-4xl font-bold text-primary md:text-5xl">Custom Wooden Sign</h1>
                <p className="mt-2 text-xl font-semibold text-foreground/90 sm:text-2xl">$120.00</p>
                <p className="mt-4 text-lg text-muted-foreground">
                    Create a one-of-a-kind wooden sign, personalized by you. Perfect for homes, businesses, or as a thoughtful gift. Select your options below to get started.
                </p>

                <form onSubmit={handleAddToCart} className="mt-8 space-y-8">
                    <div className="space-y-4">
                        <Label htmlFor="custom-text" className="text-lg font-semibold font-headline flex items-center gap-2">
                           <Pencil className="h-5 w-5" /> Personalized Text
                        </Label>
                        <Textarea 
                            id="custom-text" 
                            placeholder="e.g., The Stewart's Est. 2010" 
                            rows={3} 
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <p className="text-base text-muted-foreground">Enter the text exactly as you want it to appear on the sign.</p>
                    </div>

                    <div className="space-y-4">
                        <Label htmlFor="logo-upload" className="text-lg font-semibold font-headline flex items-center gap-2">
                           <Upload className="h-5 w-5" /> Upload Your Graphic
                        </Label>
                        <Input id="logo-upload" type="file" className="file:text-primary file:font-semibold" onChange={handleGraphicChange} accept="image/png, image/jpeg, image/svg+xml"/>
                        <p className="text-base text-muted-foreground">Optional. We accept PNG, JPG, and SVG files.</p>
                    </div>
                    
                    <Separator/>

                     <div className="space-y-4">
                        <Label className="text-lg font-semibold font-headline flex items-center gap-2">
                            <Palette className="h-5 w-5" /> Choose a color type of wood
                        </Label>
            <RadioGroup
    className="grid grid-cols-2 sm:grid-cols-3 gap-4"
    value={stain}
    onValueChange={(value) => setStain(value as DesignDraft["stain"])}
>
    <Label htmlFor="amerBlackWalnut" className="flex flex-col items-center gap-2 cursor-pointer p-2 border-2 border-transparent rounded-md hover:bg-muted has-[:checked]:border-primary transition-all">
        <RadioGroupItem value="amerBlackWalnut" id="amerBlackWalnut" className="sr-only"/>
        <div className="w-16 h-16 rounded-full bg-[url('/amerBlackWalnut.svg')] border-2 border-muted/50 shadow-inner transition-transform duration-150 hover:-translate-y-0.5 hover:-rotate-2"></div>
        <span className="text-sm font-medium text-center">American Black Walnut</span>
    </Label>
    <Label htmlFor="amerWhiteAsh" className="flex flex-col items-center gap-2 cursor-pointer p-2 border-2 border-transparent rounded-md hover:bg-muted has-[:checked]:border-primary transition-all">
        <RadioGroupItem value="amerWhiteAsh" id="amerWhiteAsh" className="sr-only" />
        <div className="w-16 h-16 rounded-full bg-[url('/amerWhiteAsh.svg')] border-2 border-muted/50 shadow-inner transition-transform duration-150 hover:-translate-y-0.5 hover:-rotate-2"></div>
        <span className="text-sm font-medium text-center">American White Ash</span>
    </Label>
    <Label htmlFor="zebrano" className="flex flex-col items-center gap-2 cursor-pointer p-2 border-2 border-transparent rounded-md hover:bg-muted has-[:checked]:border-primary transition-all">
        <RadioGroupItem value="zebrano" id="zebrano" className="sr-only"/>
        <div className="w-16 h-16 rounded-full bg-[url('/zebrano.svg')] border-2 border-muted/50 shadow-inner transition-transform duration-150 hover:-translate-y-0.5 hover:-rotate-2"></div>
        <span className="text-sm font-medium text-center">Zebrano</span>
    </Label>
    <Label htmlFor="redOak" className="flex flex-col items-center gap-2 cursor-pointer p-2 border-2 border-transparent rounded-md hover:bg-muted has-[:checked]:border-primary transition-all">
        <RadioGroupItem value="redOak" id="redOak" className="sr-only"/>
        <div className="w-16 h-16 rounded-full bg-[url('/redOak.svg')] border-2 border-muted/50 shadow-inner transition-transform duration-150 hover:-translate-y-0.5 hover:-rotate-2"></div>
        <span className="text-sm font-medium text-center">Red Oak</span>
    </Label>
    <Label htmlFor="americanCherry" className="flex flex-col items-center gap-2 cursor-pointer p-2 border-2 border-transparent rounded-md hover:bg-muted has-[:checked]:border-primary transition-all">
        <RadioGroupItem value="americanCherry" id="americanCherry" className="sr-only"/>
        <div className="w-16 h-16 rounded-full bg-[url('/americanCherry.svg')] border-2 border-muted/50 shadow-inner transition-transform duration-150 hover:-translate-y-0.5 hover:-rotate-2"></div>
        <span className="text-sm font-medium text-center">American Cherry</span>
    </Label>
</RadioGroup>

                    </div>

                    <div className="space-y-4">
                        <Label className="text-lg font-semibold font-headline flex items-center gap-2">
                            <Type className="h-5 w-5" /> Text Color
                        </Label>
                        <div className="flex flex-wrap gap-3">
                            {textColorSwatches.map((swatch) => (
                                <button
                                    key={swatch.value}
                                    type="button"
                                    onClick={() => setTextColor(swatch.value)}
                                    title={swatch.label}
                                    aria-label={swatch.label}
                                    aria-pressed={textColor === swatch.value}
                                    className={cn(
                                        "h-9 w-9 rounded-full border-2 shadow-inner transition-transform duration-150 hover:-translate-y-0.5",
                                        textColor === swatch.value ? "border-primary" : "border-muted/50",
                                    )}
                                    style={{ backgroundColor: swatch.value }}
                                />
                            ))}
                            <label className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-muted/60 text-xs text-muted-foreground cursor-pointer">
                                <input
                                    type="color"
                                    value={textColor}
                                    onChange={(e) => setTextColor(e.target.value)}
                                    className="sr-only"
                                    aria-label="Custom text color"
                                />
                                +
                            </label>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-lg font-semibold font-headline flex items-center gap-2">
                            <Square className="h-5 w-5" /> Sign Shape
                        </Label>
                        <RadioGroup
                            className="grid grid-cols-4 gap-3"
                            value={shape}
                            onValueChange={(value) => setShape(value as SignShape)}
                        >
                            {(Object.keys(shapeLabels) as SignShape[]).map((key) => (
                                <Label
                                    key={key}
                                    htmlFor={`shape-${key}`}
                                    className="flex flex-col items-center gap-2 cursor-pointer p-2 border-2 border-transparent rounded-md hover:bg-muted has-[:checked]:border-primary transition-all"
                                >
                                    <RadioGroupItem value={key} id={`shape-${key}`} className="sr-only" />
                                    <div
                                        className="h-10 w-10 bg-muted-foreground/40 transition-transform duration-150 hover:-translate-y-0.5"
                                        style={shapeStyles[key]}
                                    />
                                    <span className="text-xs font-medium text-center">{shapeLabels[key]}</span>
                                </Label>
                            ))}
                        </RadioGroup>
                    </div>

                    <div className="space-y-4">
                        <Label htmlFor="size-select" className="text-lg font-semibold font-headline flex items-center gap-2">
                            <Ruler className="h-5 w-5" /> Sign Size
                        </Label>
                        <Select value={size} onValueChange={(value) => setSize(value as DesignDraft["size"])}>
                            <SelectTrigger id="size-select" className="w-full md:w-[280px]">
                                <SelectValue placeholder="Select a size" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="small">Small (12&quot; x 8&quot;)</SelectItem>
                                <SelectItem value="medium">Medium (18&quot; x 12&quot;)</SelectItem>
                                <SelectItem value="large">Large (24&quot; x 16&quot;)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator />
                    <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold">
                        Add to Cart
                    </Button>
                </form>
                <div className="mt-8">
                  <DesignAssistant
                    draft={{ text, stain, size }}
                    onApply={(next) => {
                      setText(next.text);
                      setStain(next.stain);
                      setSize(next.size);
                    }}
                  />
                </div>
            </div>
        </div>
    </div>
  );
}
