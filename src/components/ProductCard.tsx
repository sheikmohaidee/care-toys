"use client";

import { motion } from "framer-motion";

import { Plus, Heart, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { Product } from "../lib/data";

export default function ProductCard(product: Product) {
    const { name, price, image, id, rating, reviewsCount, stock, category } = product;
    const { addToCart } = useCart();

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group relative glass-card p-4 rounded-2xl transition-all hover:glow-border-orange"
        >
            <Link href={`/product/${id}`} className="block">
                <div className="relative bg-slate-900 rounded-xl overflow-hidden aspect-[4/3] mb-4">
                    {/* Placeholder for Product Image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden">
                        {image && (
                            <motion.div
                                className="w-full h-full p-4 flex items-center justify-center relative z-10"
                                whileHover={{ scale: 1.15, rotate: -3 }}
                            >
                                <img
                                    src={image}
                                    alt={name}
                                    className="w-full h-full object-contain drop-shadow-[0_10px_30px_rgba(255,92,0,0.2)]"
                                />
                            </motion.div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <div className="text-white/5 font-black text-4xl italic rotate-45 select-none uppercase">{name}</div>
                        </div>
                    </div>

                    {/* Stock Badge */}
                    {stock && stock < 10 && (
                        <div className="absolute top-3 left-3 bg-red-600 text-white text-[8px] font-black uppercase px-2 py-1 rounded-sm z-10">
                            Low Stock: {stock}
                        </div>
                    )}

                    {/* Wishlist Button */}
                    <button className="absolute top-3 right-3 p-2 rounded-full bg-deep-navy/50 text-white/50 hover:text-racing-red transition-colors backdrop-blur-sm z-10">
                        <Heart className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex flex-col gap-1 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-neon-orange/50 uppercase tracking-widest">{category}</span>
                        <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-[10px] text-gray-400 font-bold">{rating || '4.5'}</span>
                        </div>
                    </div>
                    <h3 className="text-white font-black italic uppercase tracking-tight text-lg leading-tight group-hover:text-neon-orange transition-colors line-clamp-1">
                        {name}
                    </h3>
                    <div className="text-xl font-bold text-white">${price}</div>
                </div>
            </Link>

            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => addToCart(product)}
                className="w-full py-3 bg-white/5 hover:bg-neon-orange text-white rounded-xl font-black italic uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all border border-white/5 hover:border-neon-orange/50 group/btn"
            >
                <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" /> Add to Cart
            </motion.button>
        </motion.div>
    );
}
