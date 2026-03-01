"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { useProducts } from "../../context/ProductContext";
import { Product } from "../../lib/data";
import { motion } from "framer-motion";
import { Star, Shield } from "lucide-react";

export default function CollectorsPage() {
    const { products } = useProducts();
    const collectorProducts = products.filter(
        (p) => p.category === "exotic" || p.category === "limited"
    );

    return (
        <main className="min-h-screen bg-deep-navy">
            <Navbar />

            {/* Header */}
            <section className="pt-40 pb-24 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/8 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-orange/4 blur-[140px] rounded-full -mr-80 -mt-80 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-5 h-5 text-neon-orange" />
                            <span className="text-neon-orange font-black uppercase tracking-[0.3em] text-[10px]">
                                Premium Tier
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white mb-6 leading-[0.9]">
                            COLLECTORS<br />
                            <span className="text-neon-orange">VAULT</span>
                        </h1>
                        <p className="text-gray-400 max-w-xl text-lg font-medium leading-relaxed">
                            Precision die-cast models and limited editions for serious collectors. Every piece is a rare find.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Row */}
            <section className="border-y border-white/5 bg-black/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex divide-x divide-white/5">
                        {[
                            { label: "Exclusive Models", value: `${collectorProducts.length}+` },
                            { label: "Avg Rating", value: "4.9★" },
                            { label: "Collector Grade", value: "1:43 & 1:64" },
                        ].map((stat) => (
                            <div key={stat.label} className="flex-1 py-8 px-8 text-center">
                                <p className="text-3xl font-black italic text-white mb-1">{stat.value}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-24 bg-black/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-16">
                        <h2 className="text-3xl font-black italic uppercase text-white">
                            The <span className="text-neon-orange">Collection</span>
                        </h2>
                        <div className="h-[1px] flex-1 bg-white/10 mx-8" />
                        <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
                            <Star className="w-4 h-4 text-neon-orange" />
                            {collectorProducts.length} Items
                        </div>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        {collectorProducts.map((product: Product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <ProductCard {...product} />
                            </motion.div>
                        ))}
                    </motion.div>

                    {collectorProducts.length === 0 && (
                        <div className="py-32 text-center">
                            <p className="text-gray-500 font-bold uppercase tracking-widest">No collector items found.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
