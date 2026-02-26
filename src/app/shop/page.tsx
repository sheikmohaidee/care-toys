"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { Product } from "../../lib/data";
import { useProducts } from "../../context/ProductContext";
import { Filter, SlidersHorizontal, ChevronDown, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ShopPage() {
    const { products } = useProducts();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Popularity");
    const [priceRange, setPriceRange] = useState(500);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const categories = ["All", "cars", "exotic", "rc", "stands", "tracks", "limited", "packs", "toys"];

    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat && categories.includes(cat)) {
            setSelectedCategory(cat);
        }
    }, [searchParams]);

    const filteredProducts = useMemo(() => {
        const filtered = products.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
            const matchesPrice = product.price <= priceRange;
            return matchesSearch && matchesCategory && matchesPrice;
        }).sort((a, b) => {
            if (sortBy === "Price: Low to High") return a.price - b.price;
            if (sortBy === "Price: High to Low") return b.price - a.price;
            if (sortBy === "Name") return a.name.localeCompare(b.name);
            return 0;
        });

        // Reset page if filters change
        return filtered;
    }, [searchTerm, selectedCategory, sortBy, priceRange]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, priceRange, sortBy]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const displayedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <main className="min-h-screen bg-deep-navy">
            <Navbar />

            {/* Header */}
            <section className="pt-40 pb-20 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/10 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-4"
                    >
                        THE <span className="text-neon-orange">COLLECTION</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl text-lg font-medium"
                    >
                        Browse our full catalog of elite die-cast cars, racing tracks, and custom display solutions.
                    </motion.p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Search Bar */}
                    <div className="mb-12 relative">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-neon-orange transition-colors" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-orange/50 transition-all font-bold"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Sidebar Filters */}
                        <aside className="w-full lg:w-64 space-y-12">
                            {/* Category Filter */}
                            <div>
                                <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8 flex items-center gap-2 opacity-50">
                                    <Filter className="w-3 h-3 text-neon-orange" /> Categories
                                </h4>
                                <ul className="space-y-4">
                                    {categories.map((cat) => (
                                        <li key={cat}>
                                            <button
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`flex items-center gap-3 group cursor-pointer w-full text-left`}
                                            >
                                                <div className={`w-4 h-4 border transition-all rounded ${selectedCategory === cat ? 'border-neon-orange bg-neon-orange' : 'border-white/20 group-hover:border-neon-orange'}`}></div>
                                                <span className={`transition-colors text-sm font-bold uppercase tracking-wider ${selectedCategory === cat ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{cat}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8 flex items-center gap-2 opacity-50">
                                    <SlidersHorizontal className="w-3 h-3 text-neon-orange" /> Price Range
                                </h4>
                                <div className="px-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="500"
                                        step="10"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-orange"
                                    />
                                    <div className="flex justify-between mt-4">
                                        <span className="text-white/40 text-[10px] font-bold">$0</span>
                                        <span className="text-neon-orange text-[10px] font-bold italic underline decoration-white/10 underline-offset-4">Up to ${priceRange}</span>
                                        <span className="text-white/40 text-[10px] font-bold">$500+</span>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Product Grid */}
                        <div className="flex-1">
                            {/* Toolbar */}
                            <div className="flex items-center justify-between mb-12 bg-white/5 p-4 rounded-xl border border-white/10">
                                <p className="text-gray-400 text-sm font-bold">Showing <span className="text-white">{displayedProducts.length}</span> of <span className="text-white">{filteredProducts.length}</span> Products</p>
                                <div className="relative group">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-transparent text-white text-sm font-black uppercase tracking-widest pr-8 focus:outline-none cursor-pointer"
                                    >
                                        <option className="bg-deep-navy text-white" value="Popularity">Popularity</option>
                                        <option className="bg-deep-navy text-white" value="Price: Low to High">Price: Low to High</option>
                                        <option className="bg-deep-navy text-white" value="Price: High to Low">Price: High to Low</option>
                                        <option className="bg-deep-navy text-white" value="Name">Name</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 text-neon-orange pointer-events-none" />
                                </div>
                            </div>

                            <motion.div
                                layout
                                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                            >
                                <AnimatePresence mode="popLayout">
                                    {displayedProducts.map((product: Product) => (
                                        <motion.div
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ProductCard {...product} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {displayedProducts.length === 0 && (
                                    <div className="col-span-full py-20 text-center">
                                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Search className="w-8 h-8 text-gray-600" />
                                        </div>
                                        <h3 className="text-white font-black italic uppercase text-2xl mb-2">No Engines Found</h3>
                                        <p className="text-gray-400 font-medium">Try adjusting your filters or search terms.</p>
                                        <button
                                            onClick={() => {
                                                setSearchTerm("");
                                                setSelectedCategory("All");
                                                setPriceRange(500);
                                            }}
                                            className="mt-8 text-neon-orange font-black uppercase tracking-widest text-xs border-b border-neon-orange/20 pb-1 hover:border-neon-orange transition-all"
                                        >
                                            Reset All Filters
                                        </button>
                                    </div>
                                )}
                            </motion.div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-20 flex items-center justify-center gap-4">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`w-12 h-12 flex items-center justify-center rounded-lg transition-all font-bold ${currentPage === i + 1 ? 'bg-neon-orange text-white shadow-lg shadow-neon-orange/20' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    {currentPage < totalPages && (
                                        <button
                                            onClick={() => setCurrentPage(prev => prev + 1)}
                                            className="px-6 h-12 flex items-center justify-center rounded-lg bg-white/5 text-white/50 hover:bg-white/10 transition-all font-bold uppercase tracking-widest"
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
