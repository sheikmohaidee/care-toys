"use client";

import { useState, useEffect } from "react";
import { Product } from "../../lib/data";
import { ChevronLeft, Save, Plus, X, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductFormProps {
    initialData?: Product;
    onSubmit: (data: Omit<Product, "id"> | Product) => void;
    title: string;
}

export default function ProductForm({ initialData, onSubmit, title }: ProductFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<Omit<Product, "id">>({
        name: "",
        price: 0,
        category: "cars",
        image: "/images/placeholder.webp",
        description: "",
        details: [],
        stock: 0,
        rating: 4.5,
        reviewsCount: 0,
        isBestSeller: false,
    });

    const [detailInput, setDetailInput] = useState("");

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(initialData ? { ...formData, id: initialData.id } as Product : formData);
    };

    const addDetail = () => {
        if (detailInput.trim()) {
            setFormData({ ...formData, details: [...(formData.details || []), detailInput.trim()] });
            setDetailInput("");
        }
    };

    const removeDetail = (index: number) => {
        setFormData({
            ...formData,
            details: (formData.details || []).filter((_, i) => i !== index),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-10 max-w-5xl mx-auto space-y-12">
            <header className="flex items-center justify-between sticky top-0 bg-deep-navy/80 backdrop-blur-md py-4 z-10 border-b border-white/10">
                <div className="flex items-center gap-6">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-500 hover:text-white transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">{title}</h1>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">Configure your high-performance engine</p>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-neon-orange text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-orange-600 transition-all shadow-[0_20px_40px_rgba(255,92,0,0.2)]"
                >
                    <Save className="w-4 h-4" /> Save Configuration
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left: Metadata */}
                <div className="lg:col-span-2 space-y-10">
                    <section className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
                        <h3 className="text-lg font-black uppercase tracking-widest text-white/40 italic">Primary Blueprint</h3>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Product Designation</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:outline-none focus:border-neon-orange/50 transition-all"
                                placeholder="e.g. TITANIUM RACER"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Price ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:outline-none focus:border-neon-orange/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:outline-none focus:border-neon-orange/50 transition-all appearance-none"
                                >
                                    {["cars", "exotic", "rc", "stands", "tracks", "limited", "packs", "toys"].map(cat => (
                                        <option key={cat} value={cat} className="bg-deep-navy">{cat.toUpperCase()}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Description</label>
                            <textarea
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:outline-none focus:border-neon-orange/50 transition-all resize-none"
                                placeholder="Core details about the performance..."
                            />
                        </div>
                    </section>

                    <section className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
                        <h3 className="text-lg font-black uppercase tracking-widest text-white/40 italic">Technical Specifications</h3>

                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={detailInput}
                                    onChange={(e) => setDetailInput(e.target.value)}
                                    className="flex-1 bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:outline-none focus:border-neon-orange/50 transition-all"
                                    placeholder="Add a spec like 'Scale: 1:64'..."
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDetail())}
                                />
                                <button
                                    type="button"
                                    onClick={addDetail}
                                    className="px-6 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-neon-orange/10 hover:border-neon-orange/50 transition-all"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {(formData.details || []).map((detail, idx) => (
                                    <div key={idx} className="bg-black/40 border border-white/5 px-4 py-2 rounded-lg flex items-center gap-3 group">
                                        <span className="text-xs font-bold text-gray-300">{detail}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeDetail(idx)}
                                            className="text-gray-600 hover:text-racing-red transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right: Sidebar Controls */}
                <div className="space-y-10">
                    <section className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
                        <h3 className="text-lg font-black uppercase tracking-widest text-white/40 italic">Visual Assets</h3>
                        <div className="aspect-[4/3] bg-black/60 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-neon-orange/40 transition-all">
                            <div className="text-white/5 font-black text-2xl italic rotate-12 select-none uppercase">{formData.name || 'IMAGE'}</div>
                            <Upload className="w-8 h-8 text-gray-700 group-hover:text-neon-orange transition-colors" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-gray-600">Click to upload render</span>
                        </div>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-2 px-4 text-[10px] text-gray-500 font-bold focus:outline-none"
                            placeholder="Manual path override..."
                        />
                    </section>

                    <section className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6">
                        <h3 className="text-lg font-black uppercase tracking-widest text-white/40 italic">Live Status</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Best Seller</label>
                                <input
                                    type="checkbox"
                                    checked={formData.isBestSeller}
                                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                                    className="w-5 h-5 accent-neon-orange"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Current Stock</label>
                                <input
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:outline-none"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
}
