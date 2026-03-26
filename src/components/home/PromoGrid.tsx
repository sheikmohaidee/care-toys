import { useState, useEffect } from "react";
import { couponsApi } from "@/lib/api";
import { TagIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function PromoGrid() {
    const [coupons, setCoupons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const res = await couponsApi.getAll();
                if (res.data.success) {
                    setCoupons(res.data.data.filter((c: any) => c.is_active));
                }
            } catch (err) {
                console.error("Failed loading promos:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCoupons();
    }, []);

    // Graceful DOM fallback preventing ugly containers when inactive
    if (loading) return null;
    if (coupons.length === 0) return null;

    return (
        <section className="py-12 bg-background border-b border-black/5">
            <div className="container px-4 mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-3xl font-heading font-black italic uppercase tracking-tighter">Active <span className="text-primary">Deployments</span></h2>
                    <div className="h-px bg-black/10 flex-grow" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coupons.map((coupon) => (
                        <div key={coupon.id} className="relative group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                            <Link to="/shop">
                                {/* Visually tracks 1:1 with Admin UI Coupon generator */}
                                <div className={`p-8 rounded-3xl relative overflow-hidden shadow-2xl ${coupon.bg_color || "bg-gradient-to-tr from-zinc-900 via-black to-zinc-900"}`}>
                                    <div className="relative z-10 flex flex-col h-full justify-between min-h-[220px]">
                                        <div className="flex justify-between items-start mb-6">
                                            {coupon.badge_text ? (
                                                <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded text-[9px] font-black uppercase tracking-[0.2em] shadow-lg border border-white/10">
                                                    {coupon.badge_text}
                                                </span>
                                            ) : <div/>}
                                            <div className="bg-black/40 backdrop-blur text-white px-3 py-1.5 rounded text-[10px] uppercase font-black tracking-widest ml-auto border border-white/10 flex items-center gap-2">
                                                <TagIcon className="h-3 w-3" /> {coupon.code}
                                            </div>
                                        </div>
                                        
                                        <div className="mt-auto">
                                            <h3 className="text-4xl font-heading font-black italic tracking-tighter text-white drop-shadow-md mb-2 leading-none uppercase">
                                                {coupon.title}
                                            </h3>
                                            <p className="text-white/80 text-sm font-medium leading-relaxed max-w-[85%] truncate sm:whitespace-normal">
                                                {coupon.description}
                                            </p>
                                            
                                            <div className="mt-6 flex items-center gap-2">
                                                <span className="text-5xl font-black text-white tracking-tighter italic">
                                                    {coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : `₹${coupon.discount_value}`}
                                                </span>
                                                <span className="text-white/60 text-xs font-bold uppercase tracking-widest mt-3 block">
                                                    OFF
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
                                    {coupon.image_url && (
                                        <div className="absolute bottom-0 right-0 w-40 h-40 opacity-20 transform translate-x-1/4 translate-y-1/4 grayscale contrast-200">
                                            <img src={coupon.image_url} alt="" className="w-full h-full object-contain mix-blend-overlay" />
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
