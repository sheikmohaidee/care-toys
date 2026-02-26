"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { PRODUCTS, Product } from "../../lib/data";
import { motion } from "framer-motion";
import { Crown, Sparkles, Timer } from "lucide-react";

export default function LimitedPage() {
    const limitedProducts = PRODUCTS.filter(p => p.category === 'limited');

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            {/* Luxury Header */}
            <section className="pt-40 pb-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-600/10 via-transparent to-transparent opacity-50"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 mb-8"
                    >
                        <Crown className="w-6 h-6 text-yellow-500" />
                        <span className="text-yellow-500 text-sm font-black uppercase tracking-[0.4em]">Vault Access</span>
                        <Crown className="w-6 h-6 text-yellow-500" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter text-white mb-8 leading-none"
                    >
                        THE <span className="text-transparent border-white/20 border-1 [-webkit-text-stroke:2px_#fbbf24]">LIMITED</span><br />EDITION
                    </motion.h1>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-16">
                        <div className="bg-white/5 backdrop-blur-md border border-yellow-500/20 px-8 py-6 rounded-2xl flex items-center gap-4">
                            <Timer className="w-6 h-6 text-yellow-500" />
                            <div className="text-left">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Next Drop In</p>
                                <p className="text-white font-black text-2xl italic tracking-tighter">04 : 12 : 33 : 09</p>
                            </div>
                        </div>
                        <p className="text-gray-400 max-w-xs text-sm font-medium italic">
                            Rare anniversary castings and gold-chrome variants. Once they're gone, the mold is retired.
                        </p>
                    </div>
                </div>
            </section>

            {/* Exclusive Grid */}
            <section className="py-24 relative">
                {/* Decorative Accents */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-500/5 blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {limitedProducts.map((product: Product) => (
                            <motion.div
                                key={product.id}
                                whileHover={{ y: -10 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-transparent rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                <div className="relative">
                                    <ProductCard {...product} />
                                    {/* Scarcity Badge */}
                                    <div className="absolute top-4 left-4 bg-yellow-500 text-black text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg">
                                        Low Stock
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Sparkles className="w-10 h-10 text-yellow-500 mx-auto mb-8" />
                    <h2 className="text-4xl font-black italic uppercase text-white mb-6">Join the Inner Circle</h2>
                    <p className="text-gray-400 mb-10 text-lg">Get early access to exclusive drops and members-only variants.</p>
                    <div className="flex gap-4 max-w-md mx-auto">
                        <input type="email" placeholder="Enter Email" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-yellow-500" />
                        <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase px-8 py-4 rounded-xl transition-colors">Apply</button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
