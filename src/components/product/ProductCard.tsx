import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    category: string;
    image?: string;
    isNew?: boolean;
}

export function ProductCard({ id, name, price, category, isNew, image }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent Link navigation
        e.stopPropagation(); // Double safety
        addToCart({ id, name, price, category, image });
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative bg-card border border-black/5 rounded-none overflow-hidden hover:border-primary transition-all duration-300 shadow-md hover:shadow-xl"
        >
            {/* Heart/Wishlist Action */}
            <button
                className="absolute top-4 left-4 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 transform group-hover:scale-110"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); /* Add wishlist logic here */ }}
            >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
            </button>

            {/* New Badge */}
            {isNew && (
                <div className="absolute top-0 right-0 z-10 bg-primary text-white text-[10px] font-black px-3 py-1 uppercase tracking-tighter skew-x-[15deg] translate-x-2 -translate-y-1">
                    NEW RELEASE
                </div>
            )}

            {/* Image Area */}
            <Link to={`/product/${id}`}>
                <div className="aspect-square bg-secondary relative overflow-hidden">
                    {image ? (
                        <img loading="lazy"
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-foreground/5 font-heading text-6xl uppercase font-black italic">
                            {name.substring(0, 2)}
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <motion.div
                        className="absolute bottom-6 left-6 right-6 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20"
                    >
                        <Button
                            onClick={handleAddToCart}
                            className="w-full rounded-none skew-x-[-12deg] font-black py-8 bg-primary text-white hover:bg-foreground hover:text-background border-none shadow-2xl shadow-primary/20"
                            size="sm"
                        >
                            <ShoppingCart className="mr-3 h-5 w-5" /> ADD TO GARAGE
                        </Button>
                    </motion.div>
                </div>
            </Link>

            {/* Info */}
            <div className="p-5 border-t border-black/5">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] text-primary uppercase font-black tracking-widest">{category}</p>
                    <div className="h-1 w-8 bg-primary/20" />
                </div>
                <Link to={`/product/${id}`}>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-1 italic uppercase tracking-tighter">
                        {name}
                    </h3>
                </Link>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-heading font-black text-foreground italic">₹{price}</span>
                    <div className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">Ready to Ship</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
