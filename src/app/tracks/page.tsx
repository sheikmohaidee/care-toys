"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { PRODUCTS, Product } from "../../lib/data";
import { motion } from "framer-motion";
import { Zap, MapPin, Gauge } from "lucide-react";

export default function TracksPage() {
    const trackProducts = PRODUCTS.filter(p => p.category === 'tracks');

    return (
        <main className="min-h-screen bg-deep-navy">
            <Navbar />

            {/* Cinematic Hero */}
            <section className="pt-32 pb-24 bg-black relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-black/80 to-black/40"></div>
                    {/* Animated "Track" Lines */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-neon-orange/20 -rotate-12 translate-y-12 blur-sm"></div>
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-neon-orange/10 -rotate-12 translate-y-24 blur-md"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 bg-neon-orange/10 border border-neon-orange/20 px-4 py-2 rounded-full mb-8"
                            >
                                <Zap className="w-4 h-4 text-neon-orange" />
                                <span className="text-neon-orange text-xs font-black uppercase tracking-widest">High-Speed Setup</span>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white mb-8 leading-[0.8]"
                            >
                                GRAVITY <span className="text-neon-orange">DEFYING</span><br />TRACKS
                            </motion.h1>
                            <p className="text-gray-400 text-lg max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0">
                                From vertical loops to multi-car launchers, build the circuit of your dreams with our pro-grade racing kits.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-60">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-neon-orange" />
                                    <span className="text-white text-xs font-bold uppercase tracking-widest">Modular Design</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Gauge className="w-5 h-5 text-neon-orange" />
                                    <span className="text-white text-xs font-bold uppercase tracking-widest">Extreme Velocity</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 w-full max-w-md aspect-square bg-white/5 border border-white/10 rounded-[3rem] rotate-6 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/20 to-transparent opacity-50"></div>
                            <div className="p-12 absolute inset-0 flex flex-col items-center justify-center text-center">
                                <div className="text-white/10 font-black italic text-9xl absolute -top-10 -right-10 pointer-events-none select-none">TRACK</div>
                                <h3 className="text-white font-black italic uppercase text-3xl mb-4 group-hover:scale-110 transition-transform">Circuit<br />Master</h3>
                                <p className="text-gray-500 text-xs uppercase tracking-widest">Coming Soon: Interactive Track Builder</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-16">
                        <h2 className="text-3xl font-black italic uppercase text-white">The <span className="text-neon-orange">Series</span></h2>
                        <div className="h-[1px] flex-1 bg-white/10 mx-8"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {trackProducts.map((product: Product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                        {/* Placeholder for more tracks if data is small */}
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="aspect-[3/4] rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center grayscale opacity-40">
                                <Zap className="w-12 h-12 text-gray-600 mb-6" />
                                <h4 className="text-white font-black uppercase tracking-tighter text-sm italic">New Circuit<br />Propulsion Kit</h4>
                                <p className="text-gray-500 text-[10px] uppercase font-bold mt-4 tracking-widest">Arriving Q2</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
