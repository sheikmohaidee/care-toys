"use client";

import { ShoppingCart, Menu, Search, ChevronDown, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

const SHOP_DROPDOWN = [
    { name: "All Products", href: "/shop" },
    { name: "Hot Wheels", href: "/shop?category=cars" },
    { name: "Die-Cast Cars", href: "/shop?category=exotic" },
    { name: "Racing Tracks", href: "/shop?category=tracks" },
    { name: "RC Cars", href: "/shop?category=rc" },
    { name: "Bundles", href: "/shop?category=packs" },
    { name: "Accessories", href: "/shop?category=stands" },
];

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Collectors", href: "/collectors" },
    { name: "Limited", href: "/limited" },
    { name: "Deals", href: "/deals" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

const MOBILE_LINKS = [
    { name: "Home", href: "/" },
    { name: "— All Products", href: "/shop" },
    { name: "— Hot Wheels", href: "/shop?category=cars" },
    { name: "— Die-Cast Cars", href: "/shop?category=exotic" },
    { name: "— Racing Tracks", href: "/shop?category=tracks" },
    { name: "— RC Cars", href: "/shop?category=rc" },
    { name: "— Bundles", href: "/shop?category=packs" },
    { name: "— Accessories", href: "/shop?category=stands" },
    { name: "Collectors", href: "/collectors" },
    { name: "Limited", href: "/limited" },
    { name: "Deals", href: "/deals" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [shopOpen, setShopOpen] = useState(false);
    const { totalItems } = useCart();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShopOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                            {/* Home */}
                            <Link
                                href="/"
                                className="text-gray-300 hover:text-neon-orange px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors relative group"
                            >
                                Home
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-orange transition-all group-hover:w-full"></span>
                            </Link>

                            {/* Shop Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setShopOpen(!shopOpen)}
                                    onMouseEnter={() => setShopOpen(true)}
                                    className="text-gray-300 hover:text-neon-orange px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors relative group flex items-center gap-1"
                                >
                                    Shop
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopOpen ? 'rotate-180 text-neon-orange' : ''}`} />
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-orange transition-all group-hover:w-full"></span>
                                </button>

                                <AnimatePresence>
                                    {shopOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                            transition={{ duration: 0.15 }}
                                            onMouseLeave={() => setShopOpen(false)}
                                            className="absolute top-full left-0 mt-2 w-52 bg-deep-navy/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl shadow-black/50 py-2 overflow-hidden"
                                        >
                                            {SHOP_DROPDOWN.map((item, idx) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() => setShopOpen(false)}
                                                    className={`block px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-neon-orange/10 hover:text-neon-orange ${idx === 0 ? 'text-white border-b border-white/10 mb-1' : 'text-gray-400'}`}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Rest of nav links */}
                            {NAV_LINKS.slice(1).map((item) => (
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
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-deep-navy/95 border-b border-white/10 px-4 pt-2 pb-6"
                    >
                        <p className="text-neon-orange text-[9px] font-black uppercase tracking-[0.3em] px-3 pt-4 pb-2 opacity-60">Shop</p>
                        {MOBILE_LINKS.map((item) => {
                            const isShopHeader = item.name === "Home";
                            const isShopCategory = item.name.startsWith("—");
                            const isSectionHead = !isShopCategory && item.name !== "Home";

                            return (
                                <div key={item.name}>
                                    {isSectionHead && item.name === "Collectors" && (
                                        <div className="border-t border-white/5 mt-2 pt-2" />
                                    )}
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-3 py-3 text-base font-bold uppercase tracking-widest transition-colors hover:text-neon-orange ${isShopCategory ? 'text-gray-500 text-sm pl-6' : 'text-gray-300'}`}
                                    >
                                        {isShopCategory ? item.name.replace("— ", "") : item.name}
                                    </Link>
                                </div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
