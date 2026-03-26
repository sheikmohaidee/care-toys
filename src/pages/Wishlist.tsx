import { useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/data";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Wishlist() {
    const [wishlistItems] = useState(products.slice(0, 3)); // Placeholder items

    return (
        <div className="min-h-screen bg-background pb-12 pt-40 lg:pt-48">
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="flex items-center gap-4 mb-12">
                    <Heart className="h-8 w-8 text-primary" />
                    <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter text-foreground">
                        Your <span className="text-primary italic">Wishlist</span>
                    </h1>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="text-center py-20 bg-secondary border border-black/5 rounded-2xl">
                        <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-6 opacity-50" />
                        <h2 className="text-2xl font-bold font-heading uppercase text-foreground mb-4">Your Wishlist is Empty</h2>
                        <p className="text-muted-foreground mb-8">Save your favorite models and track sets here.</p>
                        <Link to="/shop">
                            <Button size="lg" className="rounded-none font-bold uppercase tracking-widest">
                                Explore The Archive
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wishlistItems.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
