import { useSearchParams, useNavigate } from "react-router-dom";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ChevronRight, Search } from "lucide-react";

export function ShopFilters() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const currentCategory = searchParams.get("category");
    const currentSubcategory = searchParams.get("subcategory");
    const searchQuery = searchParams.get("q") || "";

    const updateParams = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        setSearchParams(params);
    };

    const handleCategoryToggle = (slug: string) => {
        const params = new URLSearchParams(searchParams);
        if (currentCategory === slug) {
            params.delete("category");
            params.delete("subcategory");
        } else {
            params.set("category", slug);
            params.delete("subcategory");
        }
        setSearchParams(params);
    };

    const handleSubcategoryToggle = (slug: string) => {
        const params = new URLSearchParams(searchParams);
        if (currentSubcategory === slug) {
            params.delete("subcategory");
        } else {
            params.set("subcategory", slug);
        }
        setSearchParams(params);
    };

    return (
        <div className="space-y-8 sticky top-24">
            {/* Search */}
            <div>
                <h3 className="font-heading font-bold uppercase mb-4 text-sm tracking-widest text-muted-foreground">Search Garage</h3>
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Scan inventory..."
                        value={searchQuery}
                        onChange={(e) => updateParams("q", e.target.value)}
                        className="w-full bg-secondary border border-black/5 p-3 pl-10 text-xs uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all rounded-none text-foreground"
                    />
                </div>
            </div>

            {/* Categories */}
            <div>
                <h3 className="font-heading font-bold uppercase mb-6 text-lg tracking-wider border-b border-primary/20 pb-2 text-foreground">Collections</h3>
                <div className="space-y-4">
                    {categories.map((cat) => (
                        <div key={cat.slug} className="space-y-2">
                            <button
                                onClick={() => handleCategoryToggle(cat.slug)}
                                className={cn(
                                    "flex items-center justify-between w-full group transition-colors",
                                    currentCategory === cat.slug ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <span className="text-sm uppercase tracking-wide">{cat.name}</span>
                                <ChevronRight className={cn(
                                    "h-4 w-4 transition-transform",
                                    currentCategory === cat.slug ? "rotate-90 text-primary" : "group-hover:translate-x-1"
                                )} />
                            </button>

                            {currentCategory === cat.slug && (
                                <div className="pl-4 space-y-2 mt-2 border-l border-black/10 ml-1">
                                    {cat.subcategories?.map((sub) => (
                                        <button
                                            key={sub.slug}
                                            onClick={() => handleSubcategoryToggle(sub.slug)}
                                            className={cn(
                                                "block text-xs uppercase tracking-wider text-left w-full py-1 transition-colors",
                                                currentSubcategory === sub.slug
                                                    ? "text-primary font-bold"
                                                    : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            {sub.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-heading font-bold uppercase text-sm tracking-widest text-muted-foreground">Price Limit</h3>
                    <span className="text-primary font-bold text-xs">₹{searchParams.get("maxPrice") || "15000"}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="15000"
                    step="500"
                    value={searchParams.get("maxPrice") || "15000"}
                    onChange={(e) => {
                        const params = new URLSearchParams(searchParams);
                        params.set("maxPrice", e.target.value);
                        setSearchParams(params);
                    }}
                    className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between mt-2 text-[10px] text-muted-foreground uppercase tracking-tighter">
                    <span>₹0</span>
                    <span>₹15000+</span>
                </div>
            </div>

            {/* Reset Filters */}
            {(currentCategory || currentSubcategory || searchParams.get("maxPrice")) && (
                <button
                    onClick={() => navigate("/shop")}
                    className="flex items-center gap-2 text-xs text-primary underline underline-offset-4 uppercase font-bold tracking-widest hover:text-foreground transition-colors mt-4"
                >
                    Reset Gearbox
                </button>
            )}
        </div>
    );
}
