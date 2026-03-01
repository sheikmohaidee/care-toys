"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Zap, Trophy, Globe } from "lucide-react";

const STATS = [
    { icon: Zap, label: "Years in Business", value: "10+" },
    { icon: Trophy, label: "Happy Collectors", value: "50K+" },
    { icon: Globe, label: "Countries Shipped", value: "40+" },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-deep-navy">
            <Navbar />

            {/* Hero */}
            <section className="pt-40 pb-24 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/8 to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="text-neon-orange font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
                            Our Story
                        </span>
                        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white mb-6 leading-[0.9]">
                            BUILT FOR<br />
                            <span className="text-neon-orange">SPEED DEMONS</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                            CareToys has been the go-to destination for die-cast collectors and RC enthusiasts since 2015.
                            We source the rarest models, the most thrilling tracks, and the most premium display solutions — all in one place.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="border-y border-white/5 bg-black/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex divide-x divide-white/5">
                        {STATS.map(({ icon: Icon, label, value }) => (
                            <div key={label} className="flex-1 py-12 px-8 text-center">
                                <Icon className="w-6 h-6 text-neon-orange mx-auto mb-4" />
                                <p className="text-4xl font-black italic text-white mb-2">{value}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-black italic uppercase text-white mb-8">
                            Our <span className="text-neon-orange">Mission</span>
                        </h2>
                        <p className="text-gray-400 text-xl font-medium leading-relaxed mb-8">
                            We believe every collector deserves access to the world's finest die-cast models,
                            RC machines, and racing equipment — without compromise. CareToys exists to fuel that passion.
                        </p>
                        <p className="text-gray-500 text-base font-medium leading-relaxed">
                            From limited edition anniversary castings to gravity-defying track sets, we curate only what
                            meets our obsessive quality standard. Because when it comes to speed, detail matters.
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
