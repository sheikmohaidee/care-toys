"use client";

import { Facebook, Twitter, Instagram, Youtube, Send } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-primary/5 pt-16 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 text-primary mb-6">
                            <span className="material-symbols-outlined text-3xl font-bold">rocket_launch</span>
                            <h2 className="text-slate-900 dark:text-white text-xl font-extrabold tracking-tight">Care Toys</h2>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            The premier marketplace for serious toy collectors and racing enthusiasts across the globe.
                        </p>
                    </div>

                    <div>
                        <h5 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-[0.2em]">Shop</h5>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Hot Wheels</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Model Kits</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Racing Sets</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Exclusives</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-[0.2em]">Company</h5>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Our Story</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Careers</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Press</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-[0.2em]">Support</h5>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Shipping Info</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Returns</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">FAQ</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Size Guide</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-400">© 2024 Care Toys Collector's Hub. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-xl">share</span></a>
                        <a href="#" className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-xl">public</span></a>
                        <a href="#" className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-xl">camera</span></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
