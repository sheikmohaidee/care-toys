"use client";

import { useParams, useRouter } from "next/navigation";
import { Product } from "../../../lib/data";
import { useProducts } from "../../../context/ProductContext";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { motion } from "framer-motion";
import { ChevronLeft, Star, ShoppingCart, ShieldCheck, Truck, RefreshCcw, Plus, Minus } from "lucide-react";
import { useState, useMemo } from "react";
import { useCart } from "../../../context/CartContext";

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { getProduct } = useProducts();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const product = useMemo(() => {
        return getProduct(id as string);
    }, [id, getProduct]);

    if (!product) {
        return (
            <div className="min-h-screen bg-deep-navy flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-white mb-4">ENGINE NOT FOUND</h1>
                    <button
                        onClick={() => router.push("/shop")}
                        className="text-neon-orange font-bold uppercase tracking-widest hover:underline"
                    >
                        Back to Collection
                    </button>
                </div>
            </div>
        );
    }

    const { name, price, description, rating, reviewsCount, details, stock, image, category } = product;

    return (
        <main className="min-h-screen bg-deep-navy text-white">
            <Navbar />

            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group"
                >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold uppercase tracking-widest text-xs">Back to Collection</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 item-start">
                    {/* Left: Image Showcase */}
                    <div className="sticky top-32">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-black/40 border border-white/10 rounded-3xl aspect-square relative overflow-hidden flex items-center justify-center group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/5 to-transparent"></div>
                            {/* Static Placeholder for premium feel */}
                            <div className="text-white/5 font-black text-8xl italic rotate-12 select-none group-hover:scale-110 transition-transform duration-700">{name}</div>

                            {/* Animated Decoration */}
                            <motion.div
                                animate={{
                                    rotate: [0, 360],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -bottom-20 -right-20 w-80 h-80 bg-neon-orange/10 blur-[100px] rounded-full"
                            ></motion.div>
                        </motion.div>

                        <div className="grid grid-cols-4 gap-4 mt-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square bg-white/5 rounded-xl border border-white/5 hover:border-neon-orange/40 transition-all cursor-pointer flex items-center justify-center opacity-40 hover:opacity-100">
                                    <span className="text-[10px] font-black italic text-white/20 uppercase tracking-tighter">View {i}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="space-y-10">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="bg-neon-orange/10 text-neon-orange text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-neon-orange/20">
                                    {category}
                                </span>
                                {stock && stock < 10 && (
                                    <span className="text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                                        Limited Stock: {stock} Left
                                    </span>
                                )}
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 leading-none">
                                {name}
                            </h1>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-700"}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-white">{rating}</span>
                                </div>
                                <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                                <button className="text-gray-500 text-sm font-bold hover:text-white hover:underline transition-all">
                                    {reviewsCount} Customer Reviews
                                </button>
                            </div>
                        </div>

                        <div className="text-4xl font-black text-white">
                            ${price}
                        </div>

                        <p className="text-gray-400 text-lg leading-relaxed font-medium">
                            {description || "Experience the pinnacle of die-cast engineering. This model features a high-performance chassis, precision wheels, and a level of detail that satisfies the most demanding collectors."}
                        </p>

                        <div className="space-y-6 pt-6 border-t border-white/10">
                            <h3 className="font-black uppercase tracking-widest text-xs text-neon-orange">Technical Breakdown</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                                {(details || [
                                    "Aerodynamic Carbon Body",
                                    "Ultra-Glide Ball Bearings",
                                    "Precision 1:64 Scale",
                                    "Hand-Finished Interior"
                                ]).map((detail, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-sm font-bold text-gray-300">
                                        <div className="w-1.5 h-1.5 bg-neon-orange rounded-full"></div>
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Purchase Options */}
                        <div className="space-y-8 pt-10 border-t border-white/10">
                            <div className="flex flex-wrap items-center gap-8">
                                <div className="flex items-center bg-white/5 rounded-2xl p-1 border border-white/10">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 flex items-center justify-center hover:bg-white/5 rounded-xl transition-all"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center font-black text-xl">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-12 h-12 flex items-center justify-center hover:bg-white/5 rounded-xl transition-all"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                <button
                                    onClick={() => {
                                        for (let i = 0; i < quantity; i++) addToCart(product);
                                    }}
                                    className="flex-1 min-w-[200px] h-14 bg-white text-black font-black uppercase tracking-widest italic flex items-center justify-center gap-3 rounded-2xl hover:bg-neon-orange hover:text-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95"
                                >
                                    <ShoppingCart className="w-5 h-5" /> Add to Garage
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-6 py-8 px-6 bg-white/5 rounded-3xl border border-white/5">
                                <div className="flex flex-col items-center gap-3 text-center">
                                    <ShieldCheck className="w-5 h-5 text-neon-orange" />
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500">Secure Warranty</span>
                                </div>
                                <div className="flex flex-col items-center gap-3 text-center border-x border-white/5">
                                    <Truck className="w-5 h-5 text-neon-orange" />
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500">Global Shipping</span>
                                </div>
                                <div className="flex flex-col items-center gap-3 text-center">
                                    <RefreshCcw className="w-5 h-5 text-neon-orange" />
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500">7-Day Return</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
