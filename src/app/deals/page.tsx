"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { PRODUCTS, Product } from "../../lib/data";
import { motion } from "framer-motion";
import { Tag, Percent, Flame } from "lucide-react";

export default function DealsPage() {
    return (
        <main className="min-h-screen bg-deep-navy">
            <Navbar />

            {/* Flash Sale Banner */}
            <section className="pt-20">
                <div className="bg-neon-orange text-black py-4 overflow-hidden relative group">
                    <div className="flex whitespace-nowrap animate-scroll items-center gap-12">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <Flame className="w-6 h-6" />
                                <span className="text-2xl font-black italic uppercase tracking-tighter">FLASH SALE LIVE • UP TO 50% OFF • LIMITED TIME ONLY •</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Header */}
            <section className="py-24 bg-deep-navy relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white mb-6 leading-[0.8]">
                                    THE <span className="text-neon-orange">CLEARANCE</span><br />HOSPITAL
                                </h1>
                                <p className="text-gray-400 text-xl font-medium max-w-xl">
                                    Last chance to grab these high-performance engines and track sets at unbeatable prices.
                                </p>
                            </motion.div>
                        </div>
                        <div className="w-full md:w-auto">
                            <div className="bg-white/5 border-2 border-neon-orange border-dashed p-8 rounded-3xl relative">
                                <div className="absolute -top-6 -right-6 w-20 h-20 bg-neon-orange rounded-full flex items-center justify-center rotate-12 shadow-xl shadow-neon-orange/20">
                                    <Percent className="w-8 h-8 text-white font-black" />
                                </div>
                                <h3 className="text-neon-orange font-black italic uppercase text-4xl mb-2">EXTRA 10%</h3>
                                <p className="text-white text-sm font-bold uppercase tracking-widest mb-6">Use Code: <span className="bg-white/10 px-3 py-1 rounded select-all cursor-copy">DRIFT10</span></p>
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="w-[85%] h-full bg-neon-orange animate-pulse"></div>
                                </div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase mt-2">85% of coupons claimed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deals Grid */}
            <section className="py-24 bg-black/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-16">
                        {PRODUCTS.map((product: Product) => (
                            <div key={product.id} className="relative">
                                <ProductCard {...product} />
                                <div className="absolute -top-4 -right-2 bg-red-600 text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full shadow-lg -rotate-12 border-2 border-black">
                                    SAVE ${(product.price * 0.2).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 30-px linear infinite;
                    animation-duration: 20s;
                }
            `}</style>

            <Footer />
        </main>
    );
}
