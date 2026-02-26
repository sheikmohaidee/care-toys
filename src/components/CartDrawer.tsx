"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ChevronRight, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";
import Image from "next/image";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-deep-navy border-l border-white/10 z-[101] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/20">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <ShoppingBag className="w-5 h-5 text-neon-orange" />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-white text-black text-[8px] font-black w-3 h-3 rounded-full flex items-center justify-center">
                                            {totalItems}
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">Your Garage</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length > 0 ? (
                                cart.map((item) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        className="flex gap-4 group"
                                    >
                                        <div className="w-24 h-20 bg-white/5 rounded-xl flex-shrink-0 relative overflow-hidden flex items-center justify-center border border-white/5 group-hover:border-white/10 transition-colors">
                                            <div className="text-white/10 font-black text-xs italic rotate-12 select-none">{item.name}</div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <h3 className="text-white font-black italic uppercase text-sm tracking-tight truncate group-hover:text-neon-orange transition-colors">
                                                    {item.name}
                                                </h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-600 hover:text-racing-red transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="text-neon-orange font-bold text-sm mb-4">${item.price}</div>

                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/5">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-all"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-white font-black text-sm">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-all"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                        <ShoppingBag className="w-10 h-10 text-white/20" />
                                    </div>
                                    <p className="text-white font-bold text-lg mb-2">YOUR GARAGE IS EMPTY</p>
                                    <p className="text-gray-500 text-sm mb-8 max-w-[240px]">Fuel up your collection with the latest Hot Wheels drops.</p>
                                    <button
                                        onClick={onClose}
                                        className="bg-white text-black px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs transition-transform hover:scale-105 active:scale-95"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Shipping</span>
                                        <span className="text-white font-bold text-[10px] uppercase">FREE</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Subtotal</span>
                                        <span className="text-2xl font-black text-white">${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button className="w-full bg-neon-orange text-white py-5 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-[0_0_30px_rgba(255,92,0,0.2)]">
                                    Proceed to Checkout <ChevronRight className="w-5 h-5" />
                                </button>
                                <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-[0.2em]">Secure Checkout Powered by CareToys</p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
