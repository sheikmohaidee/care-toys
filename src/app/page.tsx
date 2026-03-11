"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
                {/* Hero Section */}
                <section className="relative rounded-xl overflow-hidden mb-12">
                    <div className="flex flex-col lg:flex-row bg-white dark:bg-slate-900 min-h-[500px]">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center items-start gap-6"
                        >
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">Limited Edition Drop</span>
                            <h1 className="text-4xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                                The Ultimate <br/><span className="text-primary">Collector's</span> Destination
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
                                Discover rare finds, limited editions, and high-octane racing sets for the serious enthusiast and weekend hobbyist alike.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <button className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2">
                                    Shop Collections <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                                <button className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-lg hover:bg-slate-200 transition-all">
                                    Join the Club
                                </button>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="lg:w-1/2 min-h-[300px] lg:min-h-full bg-center bg-cover"
                            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=2000&auto=format&fit=crop")' }}
                        />
                    </div>
                </section>

                {/* Category Scroll */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">category</span> Shop by Category
                    </h2>
                    <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
                        <button className="flex-none px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-md">Die-cast</button>
                        {['Model Kits', 'Racing Tracks', 'Action Figures', 'Remote Control', 'Exclusives'].map(cat => (
                            <button key={cat} className="flex-none px-6 py-3 bg-white dark:bg-slate-800 hover:bg-primary/5 border border-primary/10 font-semibold rounded-xl transition-all">
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Featured Collections */}
                <section className="mb-16">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Collections</h2>
                            <p className="text-slate-500 mt-2">Curated sets for the dedicated collector</p>
                        </div>
                        <Link href="/collections" className="text-primary font-bold flex items-center gap-1 hover:underline">
                            View All <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: 'Hot Wheels Pro', desc: 'Master the tracks with premium sets.', img: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=800' },
                            { name: 'Collector Series', desc: 'Highly detailed 1:18 scale replicas.', img: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=800' },
                            { name: 'Racing Circuits', desc: 'Everything needed for professional racing.', img: 'https://images.unsplash.com/photo-1536643265147-385012586689?q=80&w=800' }
                        ].map((col, idx) => (
                            <motion.div
                                key={col.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-xl"
                            >
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url('${col.img}')` }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 p-6">
                                    <h3 className="text-white text-2xl font-black mb-2">{col.name}</h3>
                                    <p className="text-slate-300 text-sm mb-4">{col.desc}</p>
                                    <span className="inline-block px-4 py-2 bg-white text-black text-xs font-bold rounded-lg uppercase">Explore</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Trending Now */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Trending Now</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                        {[
                            { name: 'Porsche 911 Turbo', tag: 'Scale 1:64', price: '$24.99' },
                            { name: 'Aventador SVJ Yellow', tag: 'Limited Edition', price: '$32.00' },
                            { name: 'Ferrari 488 GTE Red', tag: 'Hot Wheels', price: '$18.99' },
                            { name: 'Blue Streak Racer', tag: 'Custom Series', price: '$29.99' },
                            { name: 'Retro Utility Truck', tag: 'Vintage Series', price: '$21.50' },
                            { name: 'Aero Stream Orange', tag: 'Concept Line', price: '$45.00' }
                        ].map((prod, idx) => (
                            <motion.div
                                key={prod.name}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group"
                            >
                                <div className="relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden mb-3 border border-slate-100 dark:border-slate-700">
                                    <div className="aspect-square bg-slate-100 dark:bg-slate-700 bg-cover bg-center group-hover:scale-105 transition-transform" />
                                    <button className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 mb-1">{prod.tag}</p>
                                <h4 className="font-bold text-sm truncate">{prod.name}</h4>
                                <p className="text-primary font-bold text-sm">{prod.price}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Collector Picks */}
                <section className="mb-16 bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 lg:p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/3">
                            <h2 className="text-white text-3xl font-black mb-4">Collector Picks</h2>
                            <p className="text-slate-400 mb-8 leading-relaxed">Our curation team identifies the highest-value and most desirable pieces in our current inventory.</p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-white">
                                    <span className="material-symbols-outlined text-primary">verified</span>
                                    <span>Authenticity Guaranteed</span>
                                </li>
                                <li className="flex items-center gap-3 text-white">
                                    <span className="material-symbols-outlined text-primary">auto_graph</span>
                                    <span>Investment Quality</span>
                                </li>
                            </ul>
                        </div>
                        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex items-center gap-6">
                                <div className="w-24 h-24 rounded-lg bg-slate-700 flex-none" />
                                <div>
                                    <span className="text-[10px] px-2 py-0.5 bg-yellow-500 text-black font-bold rounded-full mb-2 inline-block">MINT CONDITION</span>
                                    <h5 className="text-white font-bold">1964 Shelby Cobra</h5>
                                    <p className="text-primary font-black">$299.00</p>
                                </div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex items-center gap-6">
                                <div className="w-24 h-24 rounded-lg bg-slate-700 flex-none" />
                                <div>
                                    <span className="text-[10px] px-2 py-0.5 bg-red-500 text-white font-bold rounded-full mb-2 inline-block">ULTRA RARE</span>
                                    <h5 className="text-white font-bold">Formula One Team Set</h5>
                                    <p className="text-primary font-black">$149.99</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Newsletter */}
                <section className="mb-16 border-t border-primary/10 pt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Join the Inner Circle</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">Get exclusive early access to rare drops, community-only discounts, and invites to our private auctions.</p>
                            <form className="flex flex-col sm:flex-row gap-4">
                                <input type="email" placeholder="Enter your email" className="flex-1 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                                <button className="bg-primary text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all">Subscribe</button>
                            </form>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-primary/5 p-6 rounded-2xl text-center">
                                <h3 className="text-4xl font-black text-primary mb-1">50K+</h3>
                                <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Members</p>
                            </div>
                            <div className="bg-primary/5 p-6 rounded-2xl text-center">
                                <h3 className="text-4xl font-black text-primary mb-1">100%</h3>
                                <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Authentic</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
