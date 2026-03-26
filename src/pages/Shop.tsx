import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { ProductCard } from "@/components/product/ProductCard";
import { categories } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { productsApi } from "@/lib/api";

function ShopContent() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const categorySlug = searchParams.get("category");
    const subcategorySlug = searchParams.get("subcategory");
    const searchQuery = searchParams.get("q")?.toLowerCase() || "";
    const maxPrice = Number(searchParams.get("maxPrice")) || 15000;
    const [sortBy, setSortBy] = useState("priority");
    
    // API State
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        productsApi.getAll()
            .then(res => {
                setProducts(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load archive data.");
                setLoading(false);
            });
    }, []);

    const filteredProducts = useMemo(() => {
        let result = products.filter(product => {
            // Because the backend only gives category_id right now, if categories mapping is complex we just do basic filters.
            // If the category system is highly specific we might need to map it. We keep price and search filters intact.
            if (product.price > maxPrice) return false;
            if (searchQuery && !product.name.toLowerCase().includes(searchQuery)) return false;
            return true;
        });

        switch (sortBy) {
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;
            case "newest":
                result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                break;
            default:
                break;
        }

        return result;
    }, [products, categorySlug, subcategorySlug, sortBy, maxPrice, searchQuery]);

    const categoryName = categories.find(c => c.slug === categorySlug)?.name || "The Archive";
    const subcategoryName = categories.find(c => c.slug === categorySlug)?.subcategories?.find(s => s.slug === subcategorySlug)?.name;

    if (loading) {
        return (
            <div className="min-h-screen bg-background pt-40 lg:pt-48 flex items-center justify-center">
                <div className="text-primary font-black uppercase tracking-widest animate-pulse">Initialising Archive...</div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="min-h-screen bg-background pt-40 lg:pt-48 flex items-center justify-center">
                <div className="text-destructive font-black uppercase tracking-widest">{error}</div>
            </div>
        );
    }

    return (
        <div className="pt-40 lg:pt-48 bg-background">
            <div className="bg-secondary border-y border-black/5 py-4 overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary z-10" />
                <div className="container px-4 mx-auto flex items-center justify-center">
                    <div className="flex items-center gap-4 text-foreground font-heading font-black uppercase tracking-[0.3em] text-[10px] md:text-sm">
                        <span className="text-primary italic">⚡</span>
                        <span>Est. 1968</span>
                        <span className="mx-2 opacity-10">|</span>
                        <span>The World's #1 Speed Brand</span>
                    </div>
                </div>
            </div>

            <div className="bg-secondary/30 py-16 border-b border-black/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/[0.03] skew-y-1 transform origin-right -translate-y-12" />
                <div className="container px-4 mx-auto relative z-10">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter text-foreground mb-3 italic">
                            {subcategoryName || categoryName} <span className="text-primary">{subcategoryName ? "" : "Garage"}</span>
                        </h1>
                    </motion.div>
                </div>
            </div>

            <div className="container px-4 mx-auto py-12 flex flex-col lg:flex-row gap-12">
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <ShopFilters />
                </aside>

                <main className="flex-grow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-black/5 pb-6 gap-4">
                        <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em]">
                            Current Archive Depth: <span className="text-primary">{filteredProducts.length}</span> Objects
                        </p>
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest hidden sm:inline">Sort:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full sm:w-auto bg-card border border-black/5 rounded-none text-[10px] font-black uppercase tracking-widest p-3 focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer hover:border-primary/50 transition-colors shadow-sm"
                            >
                                <option value="priority">Priority Access</option>
                                <option value="price-low">Value: Ascending</option>
                                <option value="price-high">Value: Descending</option>
                                <option value="newest">Recent Acquisition</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ProductCard 
                                      id={product.id.toString()}
                                      name={product.name}
                                      price={product.price}
                                      image={product.image_url || '/placeholder.jpg'}
                                      category="Model" 
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-32 border border-dashed border-black/10 rounded-xl bg-black/5">
                            <h3 className="text-2xl font-heading font-bold mb-4 uppercase tracking-tighter text-foreground">No Engineering Matches</h3>
                            <button onClick={() => navigate("/shop")} className="mt-8 text-primary border border-primary/20 px-6 py-2 text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm">
                                Reset Uplink
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default function Shop() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background pt-24 text-center text-primary font-black uppercase tracking-widest">Initialising Archive...</div>}>
            <ShopContent />
        </Suspense>
    );
}
