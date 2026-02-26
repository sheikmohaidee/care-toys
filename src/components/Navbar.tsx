"use client";

import { ShoppingCart, Menu, Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { totalItems } = useCart();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-navy/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2 group hover:opacity-90 transition-opacity">
                        <div className="w-10 h-10 bg-neon-orange rounded-lg flex items-center justify-center rotate-3 border-2 border-white/20 group-hover:rotate-6 transition-transform">
                            <span className="text-white font-black text-xl italic">C</span>
                        </div>
                        <span className="text-2xl font-black tracking-tighter italic text-white">
                            CARE<span className="text-neon-orange">TOYS</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {[
                                { name: "Shop", href: "/shop" },
                                { name: "Collections", href: "/collections" },
                                { name: "Tracks", href: "/tracks" },
                                { name: "Limited", href: "/limited" },
                                { name: "Deals", href: "/deals" }
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-300 hover:text-neon-orange px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors relative group"
                                >
                                    {item.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-orange transition-all group-hover:w-full"></span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-4">
                        <button className="text-gray-300 hover:text-white transition-colors">
                            <Search className="w-6 h-6" />
                        </button>
                        <div
                            onClick={() => setIsCartOpen(true)}
                            className="relative cursor-pointer group"
                        >
                            <ShoppingCart className="w-6 h-6 text-gray-300 group-hover:text-neon-orange transition-colors" />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-neon-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                                    {totalItems}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-gray-300 hover:text-white"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-deep-navy/95 border-b border-white/10 px-4 pt-2 pb-6"
                >
                    {[
                        { name: "Shop", href: "/shop" },
                        { name: "Collections", href: "/collections" },
                        { name: "Tracks", href: "/tracks" },
                        { name: "Limited", href: "/limited" },
                        { name: "Deals", href: "/deals" }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-gray-300 hover:text-neon-orange px-3 py-4 text-base font-bold uppercase tracking-widest"
                        >
                            {item.name}
                        </Link>
                    ))}
                </motion.div>
            )}
        </nav>
    );
}
