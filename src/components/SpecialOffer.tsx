"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function SpecialOffer() {
    const [offer, setOffer] = useState({
        text: "FLAT 20% OFF",
        subtext: "Special Offer on Hot Wheels Sets",
        buttonText: "Claim Now"
    });

    useEffect(() => {
        const saved = localStorage.getItem("caretoys_active_offer");
        if (saved) {
            try {
                setOffer(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse offer data", e);
            }
        }
    }, []);
    return (
        <section className="relative overflow-hidden py-12">
            {/* Diagonal Stripe */}
            <div className="absolute inset-0 bg-neon-orange -skew-y-3 origin-center scale-x-110"></div>

            {/* Moving Racing Lines */}
            <div className="absolute inset-0 flex flex-col justify-around opacity-20 pointer-events-none">
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ x: [-1000, 1000] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: i * 0.5 }}
                        className="h-1 w-full bg-white"
                    ></motion.div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black italic text-deep-navy tracking-tighter uppercase mb-2">
                            {offer.text}
                        </h2>
                        <p className="text-xl font-bold text-deep-navy/80 uppercase tracking-widest italic">
                            {offer.subtext}
                        </p>
                    </div>

                    <Link href="/deals">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-deep-navy text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-lg shadow-2xl flex items-center gap-3"
                        >
                            🔥 {offer.buttonText}
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
