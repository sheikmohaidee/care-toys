"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";

export default function CollectorsVault() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative px-6 py-12 md:px-10 lg:py-20 bg-slate-100 dark:bg-slate-900/50 overflow-hidden">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
                        <div className="w-full md:w-1/2 aspect-video md:aspect-square rounded-2xl bg-slate-200 dark:bg-slate-800 bg-cover bg-center shadow-2xl ring-1 ring-slate-200 dark:ring-slate-800" />
                        <div className="w-full md:w-1/2 flex flex-col gap-8">
                            <div className="space-y-4">
                                <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">Premium Access</span>
                                <h1 className="text-slate-900 dark:text-slate-100 text-5xl lg:text-7xl font-black leading-[1.1] tracking-tighter">
                                    The Collector's <span className="text-primary">Vault</span>
                                </h1>
                                <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium max-w-lg">
                                    Discover rare editions, archived prototypes, and high-end collectibles designed for the world's most dedicated enthusiasts.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-4 rounded-xl bg-primary text-white text-base font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-95">
                                    Explore the Collection
                                </button>
                                <button className="px-8 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-base font-bold hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all">
                                    Membership Perks
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
                    <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
                </section>

                {/* Featured Collector Picks */}
                <section className="py-16 px-6 md:px-10 bg-background-light dark:bg-background-dark">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-end justify-between mb-8">
                            <div className="space-y-2">
                                <h2 className="text-slate-900 dark:text-slate-100 text-3xl font-extrabold tracking-tight">Featured Collector Picks</h2>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">Hand-selected by our master curators for investment and display.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-6">
                            {[
                                { name: "Chrome Series 01", price: "$249.00", tag: "Limited Edition" },
                                { name: "Nebula Guardian", price: "$320.00", tag: "Special Release" },
                                { name: "Golden Sentinel", price: "$1,450.00", tag: "Archived Prototype" },
                                { name: "Obsidian Ghost", price: "$185.00", tag: "Vault Exclusive" }
                            ].map((item, idx) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex-none w-72 md:w-80 group"
                                >
                                    <div className="relative aspect-[3/4] rounded-2xl bg-slate-200 dark:bg-slate-800 overflow-hidden mb-4">
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute top-4 left-4">
                                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur text-primary text-[10px] font-black uppercase tracking-wider border border-primary/30">
                                                <span className="material-symbols-outlined text-[14px]">star_rate</span> Collector Pick
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-slate-900 dark:text-slate-100 font-bold text-lg">{item.name}</h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">{item.tag}</p>
                                        <div className="flex items-center justify-between pt-2">
                                            <span className="text-primary font-bold text-xl">{item.price}</span>
                                            <button className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold transition-transform active:scale-95">View Details</button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
