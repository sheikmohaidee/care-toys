"use client";

import { Facebook, Twitter, Instagram, Youtube, Send } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black pt-24 pb-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-neon-orange rounded flex items-center justify-center rotate-3">
                                <span className="text-white font-black italic">C</span>
                            </div>
                            <span className="text-xl font-black tracking-tighter italic text-white">
                                CARE<span className="text-neon-orange">TOYS</span>
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            The ultimate destination for Hot Wheels enthusiasts. From rare die-cast cars to professional display solutions, we fuel your passion for speed.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-neon-orange hover:text-white transition-all">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8 italic">Quick Links</h4>
                        <ul className="flex flex-col gap-4">
                            {["Shop All", "New Arrivals", "Exclusive Drops", "Track Sets", "Display Stands"].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-500 hover:text-neon-orange transition-colors text-sm font-medium">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8 italic">Support</h4>
                        <ul className="flex flex-col gap-4">
                            {["Track Order", "Shipping Policy", "Returns & Exchanges", "Contact Us", "FAQ"].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-500 hover:text-neon-orange transition-colors text-sm font-medium">{link}</a>
                                </li>
                            ))}
                            <li>
                                <a href="/admin" className="text-gray-500 hover:text-neon-orange transition-colors text-sm font-medium opacity-50 hover:opacity-100 italic">Admin Dashboard</a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8 italic">Stay in the Loop</h4>
                        <p className="text-gray-500 text-sm mb-6">Join the racing crew and get 10% off your first order!</p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-4 px-6 text-white text-sm focus:outline-none focus:border-neon-orange transition-colors"
                            />
                            <button className="absolute right-2 top-2 p-3 bg-neon-orange rounded-md text-white hover:bg-[#ff7a33] transition-colors">
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-600 text-xs font-medium">
                        © 2026 CareToys Ecommerce. Engineered for Speed.
                    </p>
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-gray-600 hover:text-white text-xs transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-600 hover:text-white text-xs transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
