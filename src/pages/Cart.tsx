import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/cart-context";
import { useState, useEffect } from "react";

export default function Cart() {
    const { cart, updateQuantity, removeFromCart, cartTotal, loading } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const shipping: number = 0; // Free
    const total: number = cartTotal + shipping;

    if (!mounted || loading) return <div className="min-h-screen bg-background py-12 text-center pt-32 font-bold uppercase tracking-widest text-primary">Syncing with Archive...</div>;

    return (
        <div className="min-h-screen bg-background pb-16 pt-40 lg:pt-48">
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="border-b-4 border-primary inline-block mb-12">
                    <h1 className="text-4xl md:text-7xl font-heading font-black uppercase tracking-tighter italic text-foreground px-4 py-2">
                        YOUR <span className="text-primary">PIT STOP</span>
                    </h1>
                </div>

                {cart.length === 0 ? (
                    <div className="text-center py-32 border-2 border-dashed border-black/5 rounded-none bg-secondary/30">
                        <p className="text-muted-foreground text-xl mb-10 font-bold uppercase tracking-widest opacity-50 italic">Inventory is empty. Sector requires stock.</p>
                        <Link to="/shop">
                            <Button size="lg" className="bg-foreground text-background hover:bg-primary hover:text-white font-black uppercase italic tracking-widest px-12 py-8 text-xl rounded-none shadow-xl transition-all">
                                ACCESS THE ARCHIVE
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-8">
                            {cart.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row gap-8 p-8 bg-card border border-black/5 rounded-none items-center shadow-lg shadow-black/[0.03] hover:shadow-black/[0.1] transition-shadow">
                                    <div className="w-32 h-32 bg-secondary rounded-none flex-shrink-0 overflow-hidden relative border border-black/5">
                                        {item.image ? (
                                            <img loading="lazy"
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-110 hover:scale-100"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[8px] text-muted-foreground p-2 text-center uppercase font-black tracking-widest">
                                                {item.name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-grow text-center sm:text-left">
                                        <div className="mb-2">
                                            <span className="text-primary font-black uppercase text-[10px] tracking-[0.3em] bg-primary/10 px-3 py-1 rounded-full">{item.category}</span>
                                        </div>
                                        <h3 className="font-heading font-black text-2xl mb-2 text-foreground uppercase tracking-tight italic">{item.name}</h3>
                                        <div className="font-black text-2xl text-primary italic tracking-tight">₹{item.price}</div>
                                    </div>

                                    <div className="flex flex-col items-center sm:items-end gap-6">
                                        <div className="flex items-center border border-black/10 rounded-none bg-background">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-3 hover:bg-black/5 text-foreground"><Minus className="h-4 w-4" /></button>
                                            <span className="w-12 text-center text-sm font-black text-foreground">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-3 hover:bg-black/5 text-foreground"><Plus className="h-4 w-4" /></button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-destructive transition-colors">
                                            <Trash2 className="h-4 w-4" /> Remove Item
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-foreground text-background rounded-none p-10 sticky top-32 shadow-2xl shadow-black/20">
                                <h3 className="font-heading font-black text-3xl uppercase mb-8 border-b-2 border-white/10 pb-4 italic tracking-tighter">Inventory Report</h3>

                                <div className="space-y-6 mb-10 text-[10px] uppercase font-black tracking-[0.2em] opacity-80">
                                    <div className="flex justify-between">
                                        <span className="italic">Archival Subtotal</span>
                                        <span>₹{cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="italic">Transport Logistics</span>
                                        <span className="text-primary">{shipping === 0 ? "Complimentary" : `₹${shipping}`}</span>
                                    </div>
                                    <div className="flex justify-between text-2xl pt-6 border-t border-white/10 opacity-100">
                                        <span className="italic tracking-tighter font-black">Total Due</span>
                                        <span className="text-primary italic tracking-tighter font-black">₹{total}</span>
                                    </div>
                                </div>

                                <Link to="/checkout">
                                    <Button size="lg" className="w-full h-16 bg-primary hover:bg-white hover:text-black font-black uppercase italic tracking-widest text-lg rounded-none shadow-xl border-none transition-all">
                                        FINALIZE UPLINK <ArrowRight className="ml-3 h-6 w-6" />
                                    </Button>
                                </Link>

                                <p className="mt-8 text-[8px] text-white/30 text-center uppercase font-black tracking-[0.3em] leading-relaxed">
                                    By proceeding, you agree to the archival terms of engagement and sector distribution protocols.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
