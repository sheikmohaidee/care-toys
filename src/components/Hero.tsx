"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-deep-navy pt-32 pb-20">
            {/* Background Track Lines */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-orange/20 to-transparent -rotate-12 blur-sm"></div>
                <div className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-electric-blue/20 to-transparent rotate-6 blur-sm"></div>
                <div className="absolute bottom-1/4 left-1/4 w-[200%] h-[500px] border-[40px] border-white/5 rounded-[200px] -rotate-12"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-block px-4 py-1 rounded-full bg-neon-orange/10 border border-neon-orange/30 text-neon-orange text-xs font-black uppercase tracking-[0.2em] mb-6">
                        New Arrival: 2026 Elite Series
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white leading-none mb-6">
                        UNLEASH THE <br />
                        <span className="text-neon-orange glow-orange">SPEED</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-lg mb-10 font-medium">
                        Premium Hot Wheels cars & display stands for serious collectors and speed demons. Experience the rush of the track.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="bg-neon-orange hover:bg-[#ff7a33] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,92,0,0.4)]">
                            Shop Cars <ChevronRight className="w-5 h-5" />
                        </button>
                        <button className="bg-transparent border-2 border-white/20 hover:border-white text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all hover:bg-white/5">
                            Explore Stands
                        </button>
                    </div>
                </motion.div>

                {/* Visual Element */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="relative w-full aspect-square flex items-center justify-center">
                        {/* Gradient Glow */}
                        <div className="absolute inset-0 bg-neon-orange/20 blur-[120px] rounded-full"></div>

                        {/* Main Image Replacement Placeholder */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            {/* Visualizing a car drifting with a real image */}
                            <div className="w-full h-80 bg-gradient-to-br from-gray-900 to-black rounded-3xl border-2 border-white/10 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8">
                                    <div className="text-white/10 font-black italic text-9xl tracking-tighter select-none group-hover:text-neon-orange/20 transition-colors duration-500">RACE</div>
                                </div>

                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center p-6"
                                    whileHover={{ scale: 1.05, rotate: -2 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop"
                                        alt="Hot Wheels Premium Car"
                                        className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(255,92,0,0.3)] filter contrast-125 brightness-110"
                                    />
                                </motion.div>

                                <div className="absolute bottom-6 left-8 z-20">
                                    <div className="text-white font-black italic text-2xl tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                        LIMITED <span className="text-neon-orange">EDITION</span>
                                    </div>
                                </div>

                                {/* Drifting Effect / Smoke */}
                                <motion.div
                                    animate={{
                                        x: [-20, 20, -20],
                                        opacity: [0.3, 0.6, 0.3]
                                    }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                    className="absolute -bottom-10 left-10 w-96 h-40 bg-neon-orange/20 blur-[80px] rotate-12 pointer-events-none"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-neon-orange to-transparent"></div>
            </div>
        </section>
    );
}
