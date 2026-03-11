"use client";

import { ShoppingCart, Menu, Search, ChevronDown, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Deals", href: "/deals" },
];

const MOBILE_LINKS = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "New Arrivals", href: "/new-arrivals" },
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
        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-3xl font-bold">rocket_launch</span>
                            <h2 className="text-slate-900 dark:text-white text-xl font-extrabold tracking-tight">Care Toys</h2>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-6">
                            {NAV_LINKS.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-semibold hover:text-primary transition-colors text-slate-600 dark:text-slate-400"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Search & Actions */}
                    <div className="flex items-center gap-4 flex-1 justify-end">
                        <div className="hidden lg:flex relative max-w-xs w-full">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                            <input
                                type="text"
                                placeholder="Search collectibles..."
                                className="w-full bg-primary/5 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 placeholder:text-slate-400 outline-none"
                            />
                        </div>

                        <div className="flex gap-2 items-center">
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                            >
                                <span className="material-symbols-outlined">shopping_cart</span>
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                            <Link href="/collectors" className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                                <span className="material-symbols-outlined">person</span>
                            </Link>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="md:hidden p-2 text-slate-600 dark:text-slate-300"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
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
                        className="absolute top-16 sm:top-20 left-0 right-0 md:hidden bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 shadow-xl"
                    >
                        {MOBILE_LINKS.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-3 text-base font-bold uppercase tracking-widest transition-colors hover:text-primary text-slate-700 dark:text-slate-300"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
