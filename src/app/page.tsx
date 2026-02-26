"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import SpecialOffer from "../components/SpecialOffer";
import BestSeller from "../components/BestSeller";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { PRODUCTS, Product } from "../lib/data";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <main className="min-h-screen bg-deep-navy overflow-x-hidden">
            <Navbar />
            <Hero />
            <CategorySection />

            {/* Featured Products Grid */}
            <section className="py-24 bg-deep-navy">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                        <div>
                            <div className="h-1 w-12 bg-neon-orange mb-4"></div>
                            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                                Featured <span className="text-neon-orange">Gear</span>
                            </h2>
                        </div>
                        <button className="text-neon-orange font-black uppercase tracking-widest text-xs border-b border-neon-orange/20 pb-1 hover:border-neon-orange transition-all">
                            View All Products
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {PRODUCTS.map((product: Product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <ProductCard {...product} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <SpecialOffer />
            <BestSeller />
            <Footer />
        </main>
    );
}
