"use client";

import { motion } from "framer-motion";

const categories = [
    { name: "Hot Wheels Cars", icon: "🏎", color: "from-neon-orange to-orange-600", slug: "cars" },
    { name: "Exotic Cars", icon: "🏎️", color: "from-yellow-400 to-yellow-600", slug: "exotic" },
    { name: "RC Masters", icon: "🎮", color: "from-electric-blue to-blue-600", slug: "rc" },
    { name: "Racing Tracks", icon: "🏁", color: "from-racing-red to-red-600", slug: "tracks" },
    { name: "Global Toys", icon: "🧩", color: "from-purple-500 to-purple-700", slug: "toys" },
];

export default function CategorySection() {
    return (
        <section className="py-24 bg-deep-navy relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center mb-16 text-center">
                    <div className="h-1 w-20 bg-neon-orange mb-4"></div>
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                        Shop by <span className="text-neon-orange">Category</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => window.location.href = `/shop?category=${cat.slug}`}
                            className="group cursor-pointer flex flex-col items-center text-center"
                        >
                            <div className={`w-36 h-36 rounded-full bg-gradient-to-br ${cat.color} p-1 mb-6 relative group-hover:shadow-[0_0_30px_rgba(255,92,0,0.3)] transition-all`}>
                                <div className="w-full h-full rounded-full bg-deep-navy flex items-center justify-center text-5xl group-hover:bg-transparent transition-colors">
                                    {cat.icon}
                                </div>
                                {/* Orbital Ring Effects */}
                                <div className="absolute -inset-2 border border-white/5 rounded-full group-hover:border-neon-orange/20 transition-colors"></div>
                            </div>
                            <h3 className="text-white font-black italic uppercase tracking-widest text-sm group-hover:text-neon-orange transition-colors">
                                {cat.name}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
