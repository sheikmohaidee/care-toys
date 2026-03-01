"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [sent, setSent] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSent(true);
    }

    return (
        <main className="min-h-screen bg-deep-navy">
            <Navbar />

            {/* Hero */}
            <section className="pt-40 pb-24 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/8 to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="text-neon-orange font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
                            Get In Touch
                        </span>
                        <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white mb-6 leading-[0.9]">
                            CONTACT<br />
                            <span className="text-neon-orange">US</span>
                        </h1>
                        <p className="text-gray-400 max-w-xl text-lg font-medium">
                            Questions about an order, product availability, or wholesale? We're here and fast.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Grid */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-10"
                        >
                            {[
                                { icon: Mail, label: "Email", value: "support@caretoys.com" },
                                { icon: Phone, label: "Phone", value: "+1 (800) 555-RACE" },
                                { icon: MapPin, label: "Address", value: "2026 Speed Lane, Detroit, MI 48201" },
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-neon-orange/10 border border-neon-orange/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-5 h-5 text-neon-orange" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{label}</p>
                                        <p className="text-white font-bold text-lg">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            {sent ? (
                                <div className="bg-neon-orange/10 border border-neon-orange/20 rounded-2xl p-12 text-center">
                                    <Send className="w-10 h-10 text-neon-orange mx-auto mb-6" />
                                    <h3 className="text-white font-black italic uppercase text-2xl mb-2">Message Sent!</h3>
                                    <p className="text-gray-400 font-medium">We'll get back to you within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {[
                                        { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
                                        { id: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                                    ].map((field) => (
                                        <div key={field.id}>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">
                                                {field.label}
                                            </label>
                                            <input
                                                type={field.type}
                                                id={field.id}
                                                placeholder={field.placeholder}
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-orange/50 transition-all font-bold"
                                            />
                                        </div>
                                    ))}
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={5}
                                            placeholder="Tell us how we can help..."
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-orange/50 transition-all font-bold resize-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-neon-orange hover:bg-neon-orange/90 text-white font-black uppercase tracking-widest py-4 rounded-xl transition-colors flex items-center justify-center gap-3"
                                    >
                                        <Send className="w-4 h-4" />
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
