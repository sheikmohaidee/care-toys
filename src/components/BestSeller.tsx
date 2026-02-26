"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";

export default function BestSeller() {
    const { addToCart } = useCart();
    const { products } = useProducts();
    const bestSeller = products.find(p => p.isBestSeller) || products[0];

    if (!bestSeller) return null;

    return (
        <section className="py-32 bg-deep-navy overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center mb-20">
                    <span className="text-neon-orange font-black uppercase tracking-[0.3em] text-xs mb-4">Elite Drops</span>
                    <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
                        BEST <span className="text-neon-orange">SELLER</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md">
                            ULTRA LIMITED DROP
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black tracking-widest italic text-white uppercase mb-6 leading-tight">
                            {bestSeller.name.split(' ').slice(0, 2).join(' ')} <br />
                            <span className="text-neon-orange underline decoration-4 underline-offset-8">{bestSeller.name.split(' ').slice(2).join(' ')}</span>
                        </h3>

                        <p className="text-gray-400 text-lg mb-8 max-w-md">
                            {bestSeller.description || "The pinnacle of engineering. Featuring a die-cast titanium body, ultra-low friction axles, and exclusive glow-in-the-dark racing stripes."}
                        </p>

                        <div className="flex items-center gap-6 mb-12">
                            <div className="text-5xl font-black text-white italic">${bestSeller.price}</div>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Star key={i} className={`w-5 h-5 ${i <= Math.floor(bestSeller.rating || 5) ? "fill-neon-orange text-neon-orange" : "text-gray-700"}`} />
                                ))}
                                <span className="ml-2 text-white/40 font-bold text-sm">({bestSeller.reviewsCount || 120}+ Reviews)</span>
                            </div>
                        </div>

                        <button
                            onClick={() => addToCart(bestSeller)}
                            className="w-full md:w-auto bg-neon-orange text-white px-12 py-5 rounded-xl font-black uppercase tracking-widest text-lg transition-transform hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,92,0,0.3)]"
                        >
                            RESERVE NOW
                        </button>
                    </motion.div>

                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-neon-orange/20 blur-[100px] rounded-full"></div>
                        <div className="relative z-10 glass-card p-4 rounded-3xl rotate-3 hover:rotate-0 transition-transform duration-700">
                            <div className="bg-slate-900 rounded-2xl w-full h-[400px] overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy to-transparent opacity-60"></div>
                                <div className="absolute inset-0 flex items-center justify-center p-12">
                                    {/* Car Placeholder */}
                                    <div className="w-full h-full relative flex items-center justify-center">
                                        {bestSeller.image ? (
                                            <motion.img
                                                key={bestSeller.id}
                                                src={bestSeller.image}
                                                alt={bestSeller.name}
                                                className="w-full h-full object-contain filter drop-shadow-[0_25px_50px_rgba(255,92,0,0.5)] z-20"
                                                whileHover={{ scale: 1.1, rotate: -2 }}
                                                transition={{ type: "spring", stiffness: 200 }}
                                            />
                                        ) : (
                                            <span className="text-white/20 font-black italic text-3xl">PREMIUM 3D ASSET</span>
                                        )}
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                            transition={{ repeat: Infinity, duration: 4 }}
                                            className="absolute w-64 h-12 bg-neon-orange blur-3xl rounded-full z-10"
                                        />
                                    </div>
                                </div>
                                {/* Floating Labels */}
                                <div className="absolute top-8 right-8 flex flex-col items-end gap-2">
                                    <span className="text-[10px] font-black text-neon-orange bg-deep-navy/80 px-2 py-1 rounded">V1.0</span>
                                    <span className="text-[10px] font-black text-white bg-deep-navy/80 px-2 py-1 rounded italic uppercase tracking-tighter">Performance Series</span>
                                </div>
                            </div>
                        </div>

                        {/* Reflection Shadow */}
                        <div className="mt-8 h-4 w-3/4 mx-auto bg-black/40 blur-xl rounded-[100%]"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
