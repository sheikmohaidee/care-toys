"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const COLLECTIONS = [
    {
        id: "cars",
        name: "Elite Die-Cast",
        description: "Precision engineered performance machines.",
        image: "/images/category-cars.webp",
        color: "from-blue-600/20",
        count: "124+ Items"
    },
    {
        id: "tracks",
        name: "Racing Tracks",
        description: "Gravity-defying loops and high-speed circuits.",
        image: "/images/category-tracks.webp",
        color: "from-neon-orange/20",
        count: "45+ Sets"
    },
    {
        id: "stands",
        name: "Display Solutions",
        description: "Premium racks for your ultimate collection.",
        image: "/images/category-stands.webp",
        color: "from-purple-600/20",
        count: "12+ Racks"
    },
    {
        id: "limited",
        name: "Limited Edition",
        description: "Rare finds and exclusive anniversary drops.",
        image: "/images/category-limited.webp",
        color: "from-yellow-600/20",
        count: "18+ Exclusive"
    }
];

export default function CollectionsPage() {
    return (
        <main className="min-h-screen bg-deep-navy font-sans">
            <Navbar />

            {/* Header */}
            <section className="pt-40 pb-20 border-b border-white/5 bg-black/40 backdrop-blur-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-orange/5 blur-[120px] rounded-full -mr-64 -mt-64"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="text-neon-orange font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Engine Room</span>
                        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white mb-6 leading-[0.9]">
                            ALL <span className="text-transparent border-t-2 border-b-2 border-white px-2">SERIES</span>
                        </h1>
                        <p className="text-gray-400 max-w-xl text-lg font-medium leading-relaxed">
                            Explore our curated collections, from high-octane racers to precision display systems designed for the ultimate enthusiast.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Collections Grid */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {COLLECTIONS.map((collection, idx) => (
                            <motion.div
                                key={collection.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
                            >
                                {/* Background Image/Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${collection.color} to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700`}></div>

                                {/* Content */}
                                <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12 flex flex-col justify-end h-full z-20">
                                    <div className="overflow-hidden">
                                        <motion.span
                                            className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2 block"
                                            initial={{ y: 20 }}
                                            whileInView={{ y: 0 }}
                                        >
                                            {collection.count}
                                        </motion.span>
                                    </div>
                                    <h2 className="text-3xl lg:text-5xl font-black text-white italic uppercase tracking-tighter mb-4 transition-transform duration-500 group-hover:-translate-y-2">
                                        {collection.name}
                                    </h2>
                                    <p className="text-gray-400 text-sm lg:text-base font-medium max-w-xs mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                                        {collection.description}
                                    </p>

                                    <Link
                                        href={`/shop?category=${collection.id}`}
                                        className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-[10px] group/btn transition-colors hover:text-neon-orange"
                                    >
                                        Inspect Collection
                                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-neon-orange group-hover/btn:bg-neon-orange transition-all">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </Link>
                                </div>

                                {/* Hover Image Effect Teaser */}
                                <div className="absolute top-0 right-0 w-1/2 h-full opacity-0 group-hover:opacity-20 transition-opacity duration-1000 scale-110 group-hover:scale-100">
                                    {/* Placeholder for actual image if available */}
                                    <div className="w-full h-full bg-white/10 skew-x-12"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
