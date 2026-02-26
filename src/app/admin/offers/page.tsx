"use client";

import { useState, useEffect } from "react";
import { Save, Tag, Percent, Type, Link as LinkIcon } from "lucide-react";

export default function OffersManagementPage() {
    const [offerData, setOfferData] = useState({
        text: "FLAT 20% OFF",
        subtext: "Special Offer on Hot Wheels Sets",
        discount: 20,
        buttonText: "Claim Now",
    });

    useEffect(() => {
        const savedOffer = localStorage.getItem("caretoys_active_offer");
        if (savedOffer) {
            setOfferData(JSON.parse(savedOffer));
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem("caretoys_active_offer", JSON.stringify(offerData));
        alert("Campaign Broadcast Updated!");
    };

    return (
        <div className="p-10 space-y-10">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Broadcast <span className="text-neon-orange">Control</span></h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Configure sitewide deals and campaigns</p>
                </div>
                <button
                    onClick={handleSave}
                    className="bg-neon-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-orange-600 transition-all shadow-[0_20px_40px_rgba(255,92,0,0.2)]"
                >
                    <Save className="w-4 h-4" /> Deploy Campaign
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6 flex items-center gap-3">
                        <Tag className="w-5 h-5 text-neon-orange" /> Active Offer Config
                    </h3>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Main Heading</label>
                            <div className="relative group">
                                <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-neon-orange" />
                                <input
                                    type="text"
                                    value={offerData.text}
                                    onChange={(e) => setOfferData({ ...offerData, text: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white font-bold focus:outline-none focus:border-neon-orange/50 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Subtext</label>
                            <input
                                type="text"
                                value={offerData.subtext}
                                onChange={(e) => setOfferData({ ...offerData, subtext: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:outline-none focus:border-neon-orange/50 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Discount %</label>
                                <div className="relative group">
                                    <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-neon-orange" />
                                    <input
                                        type="number"
                                        value={offerData.discount}
                                        onChange={(e) => setOfferData({ ...offerData, discount: parseInt(e.target.value) })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white font-bold focus:outline-none focus:border-neon-orange/50 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Button Text</label>
                                <input
                                    type="text"
                                    value={offerData.buttonText}
                                    onChange={(e) => setOfferData({ ...offerData, buttonText: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:outline-none focus:border-neon-orange/50 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                        <h3 className="text-xl font-black italic uppercase tracking-tighter mb-8">Campaign Preview</h3>

                        <div className="relative overflow-hidden rounded-2xl py-12 px-8 bg-neon-orange group">
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10 text-center space-y-2">
                                <h2 className="text-3xl font-black italic text-deep-navy uppercase tracking-tighter">
                                    {offerData.text || "FLAT 20% OFF"}
                                </h2>
                                <p className="text-sm font-bold text-deep-navy/70 uppercase tracking-widest italic">
                                    {offerData.subtext || "Special Offer"}
                                </p>
                                <div className="pt-4">
                                    <button className="bg-deep-navy text-white px-6 py-2 rounded-full font-black uppercase tracking-[0.2em] text-[10px]">
                                        {offerData.buttonText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center justify-between">
                        <div>
                            <h4 className="font-black italic uppercase tracking-tighter text-white">Live Broadcast</h4>
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Currently appearing sitewide</p>
                        </div>
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
