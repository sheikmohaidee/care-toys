"use client";

import { Settings, Save, Lock, Mail, Percent, Truck, Building, Globe } from "lucide-react";
import { useState } from "react";

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState({
        siteName: "Care Toys",
        contactEmail: "support@caretoys.com",
        contactPhone: "+1 (555) 0123-4567",
        taxPercentage: 8.5,
        shippingCharge: 15.00,
        maintenanceMode: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = () => {
        // Implement save logic here
        alert("Settings saved successfully!");
    };

    return (
        <div className="p-10 space-y-8 max-w-5xl mx-auto">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">System <span className="text-neon-orange">Settings</span></h1>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Configure core platform parameters</p>
                </div>
                <button
                    onClick={handleSave}
                    className="bg-neon-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-orange-600 transition-all shadow-[0_20px_40px_rgba(255,92,0,0.2)] active:scale-95"
                >
                    <Save className="w-4 h-4" /> Save Configuration
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* General Settings */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-500">
                                <Building className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">General Information</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Site Name</label>
                                <input
                                    type="text"
                                    name="siteName"
                                    value={settings.siteName}
                                    onChange={handleChange}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm text-white focus:outline-none focus:border-neon-orange/50 transition-all font-bold"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Support Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="email"
                                            name="contactEmail"
                                            value={settings.contactEmail}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-neon-orange/50 transition-all font-bold"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Support Phone</label>
                                    <input
                                        type="tel"
                                        name="contactPhone"
                                        value={settings.contactPhone}
                                        onChange={handleChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-4 text-sm text-white focus:outline-none focus:border-neon-orange/50 transition-all font-bold"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                            <div className="p-3 bg-green-500/20 rounded-xl text-green-500">
                                <Percent className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">Commerce Settings</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Global Tax Rate (%)</label>
                                <div className="relative">
                                    <Percent className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="number"
                                        name="taxPercentage"
                                        value={settings.taxPercentage}
                                        onChange={handleChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-neon-orange/50 transition-all font-bold"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Base Shipping Charge ($)</label>
                                <div className="relative">
                                    <Truck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="number"
                                        name="shippingCharge"
                                        value={settings.shippingCharge}
                                        onChange={handleChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-neon-orange/50 transition-all font-bold"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-8">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                        <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                            <div className="p-3 bg-red-500/20 rounded-xl text-red-500">
                                <Lock className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">Platform Status</h2>
                        </div>

                        <div className="flex items-center justify-between bg-black/40 p-6 rounded-2xl border border-white/5">
                            <div>
                                <div className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                    <Globe className="w-4 h-4" />
                                    Maintenance Mode
                                </div>
                                <div className="text-[10px] font-bold text-gray-500 mt-1 uppercase">Temporarily disable storefront</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="maintenanceMode"
                                    checked={settings.maintenanceMode}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                            </label>
                        </div>

                        {settings.maintenanceMode && (
                            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-bold text-red-500 uppercase tracking-widest text-center">
                                Warning: Storefront is offline
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
