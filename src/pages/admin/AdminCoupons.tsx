import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X, Tag as TagIcon, Zap, Power } from "lucide-react";
import { couponsApi } from "@/lib/api";

const PRESET_GRADIENTS = [
    { label: "Obsidian", value: "bg-gradient-to-tr from-zinc-900 via-black to-zinc-900" },
    { label: "Brand Primary", value: "bg-gradient-to-tr from-orange-600 to-amber-500" },
    { label: "Crimson Forge", value: "bg-gradient-to-r from-red-600 to-rose-900" },
    { label: "Neon Cyber", value: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" },
    { label: "Forest Vault", value: "bg-gradient-to-br from-emerald-600 to-teal-900" }
];

export default function AdminCoupons() {
    const [coupons, setCoupons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        code: "",
        discount_type: "percentage",
        discount_value: "10",
        expiry_date: "",
        title: "SPECIAL OFFER",
        description: "Get incredible discounts on your entire cart today.",
        bg_color: PRESET_GRADIENTS[0].value,
        badge_text: "LIMITED",
        image_url: "",
        is_active: true
    });

    const fetchCoupons = async () => {
        setLoading(true);
        try {
            const res = await couponsApi.getAll();
            if (res.data.success) {
                setCoupons(res.data.data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await couponsApi.create({
                ...formData,
                discount_value: parseFloat(formData.discount_value)
            });
            setIsModalOpen(false);
            fetchCoupons();
        } catch (err: any) {
            alert("Coupon Injection Failed.");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm(`Permanently wipe coupon module?`)) {
            await couponsApi.delete(id);
            fetchCoupons();
        }
    };

    const toggleActive = async (id: string, currentState: boolean) => {
        try {
            // Optimistic update locally
            setCoupons(prev => prev.map(c => c.id.toString() === id ? { ...c, is_active: !currentState } : c));
            await couponsApi.update(id, { is_active: !currentState });
        } catch (err) {
            alert("Status Toggle Failed");
            fetchCoupons(); // Revert on failure
        }
    };

    const generateRandomCode = () => {
        const str = Math.random().toString(36).substring(2, 8).toUpperCase();
        setFormData(prev => ({ ...prev, code: `PROMO-${str}` }));
    };

    if (loading) return <div className="p-12 font-black uppercase tracking-widest text-primary animate-pulse">Synchronizing Promo Engine...</div>;

    return (
        <div className="p-8 lg:p-12 relative h-full flex flex-col">
            <header className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-heading font-black uppercase italic tracking-tighter text-foreground">Promo <span className="text-primary">Configurator</span></h1>
                    <p className="text-muted-foreground mt-2 text-[10px] font-bold uppercase tracking-widest">Visual Discount Engine</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="font-black italic tracking-widest uppercase rounded-none bg-primary text-white hover:bg-foreground transition-all shadow-xl shadow-primary/20 text-xs py-6 px-10">
                    <Plus className="h-5 w-5 mr-3" /> Construct Offer
                </Button>
            </header>

            {/* Existing Coupons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-grow">
                {coupons.length === 0 ? (
                    <div className="col-span-full p-12 text-center border border-dashed border-black/10 bg-black/[0.02] flex items-center justify-center">
                        <p className="font-black uppercase tracking-widest text-muted-foreground text-[10px]">No Promos Detected in Database.</p>
                    </div>
                ) : coupons.map(coupon => (
                    <div key={coupon.id} className={`relative group transition-opacity ${!coupon.is_active ? 'opacity-50 grayscale select-none' : ''}`}>
                        <div className={`p-6 rounded-2xl relative overflow-hidden shadow-2xl transition-transform hover:-translate-y-1 ${coupon.bg_color || PRESET_GRADIENTS[0].value}`}>
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex justify-between p-4 items-start backdrop-blur-sm">
                                <button 
                                    onClick={() => toggleActive(coupon.id.toString(), coupon.is_active)}
                                    className={`p-2 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center shrink-0 ${coupon.is_active ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
                                    title={coupon.is_active ? "Disable Sequence" : "Re-Activate Sequence"}
                                >
                                    <Power className="h-4 w-4" />
                                </button>
                                <button onClick={() => handleDelete(coupon.id.toString())} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
                                <div className="flex justify-between items-start mb-4">
                                    {coupon.badge_text && (
                                        <span className="bg-white/20 backdrop-blur-md text-white px-2 py-1 rounded text-[8px] font-black uppercase tracking-[0.2em] shadow-lg border border-white/10 shrink-0">
                                            {coupon.badge_text}
                                        </span>
                                    )}
                                    <div className="bg-black/40 backdrop-blur text-white px-2 py-1 rounded text-[9px] uppercase font-black tracking-widest ml-auto border border-white/10 flex items-center gap-1">
                                        <TagIcon className="h-3 w-3 shrink-0" /> <span className="truncate max-w-[80px]">{coupon.code}</span>
                                    </div>
                                </div>
                                
                                <div className="mt-4">
                                    <h3 className="text-2xl font-heading font-black italic tracking-tighter text-white drop-shadow-md mb-1 leading-none uppercase truncate">
                                        {coupon.title}
                                    </h3>
                                    
                                    <div className="mt-4 flex items-center gap-2">
                                        <span className="text-3xl font-black text-white tracking-tighter italic">
                                            {coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : `₹${coupon.discount_value}`}
                                        </span>
                                        <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1 block">
                                            OFF
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 w-32 h-32 bg-white opacity-5 rounded-full blur-xl"></div>
                            {coupon.image_url && (
                                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-20 transform translate-x-1/4 translate-y-1/4 grayscale contrast-200">
                                    <img src={coupon.image_url} alt="" className="w-full h-full object-contain mix-blend-overlay" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Advanced Builder Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-0 lg:p-8 overflow-y-auto">
                    <div className="bg-background w-full max-w-7xl shadow-2xl relative overflow-hidden flex flex-col lg:flex-row h-full lg:h-[90vh] lg:rounded-xl border border-white/10">
                        {/* Editor Controls (Left) */}
                        <div className="w-full lg:w-1/2 p-6 lg:p-12 overflow-y-auto border-r border-white/5 bg-zinc-950 flex flex-col">
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5 shrink-0">
                                <h2 className="font-heading font-black text-xl uppercase italic tracking-tighter text-white">Visual Extractor</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors"><X className="h-6 w-6" /></button>
                            </div>

                            <form id="couponForm" onSubmit={handleFormSubmit} className="space-y-6 flex-grow">
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 border-l-2 border-primary pl-2 mb-2">Core Logistics</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Claim Code</label>
                                            <div className="relative">
                                                <input required type="text" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 pr-12 text-sm text-white focus:border-primary uppercase font-bold tracking-widest" placeholder="WINTER20" />
                                                <button type="button" onClick={generateRandomCode} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 hover:text-primary transition-colors hover:bg-white/5 rounded" title="Auto-Generate Cryptographic Serial">
                                                    <Zap className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Expiration</label>
                                            <input type="date" value={formData.expiry_date} onChange={e => setFormData({...formData, expiry_date: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-sm text-white focus:border-primary" />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Algorithm</label>
                                            <select value={formData.discount_type} onChange={e => setFormData({...formData, discount_type: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-sm text-white focus:border-primary appearance-none font-bold">
                                                <option value="percentage">Percentage (%)</option>
                                                <option value="fixed">Fixed Price (₹)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Discount Amount</label>
                                            <input required type="number" value={formData.discount_value} onChange={e => setFormData({...formData, discount_value: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-sm text-white focus:border-primary font-bold" />
                                        </div>
                                    </div>

                                    {/* System Status Toggle */}
                                    <div className="pt-2">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="w-5 h-5 text-primary border-white/20 focus:ring-primary rounded bg-black" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">Route Natively to Public Frontend Immediately upon Injection</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 border-l-2 border-primary pl-2 mb-2">Aesthetic Overlay</h3>
                                    
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Card Topology (Title)</label>
                                        <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-sm text-white focus:border-primary font-black uppercase tracking-tighter" />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Marketing Pitch (Description)</label>
                                        <textarea rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-sm text-white focus:border-primary resize-none" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Status Badge Text</label>
                                            <input type="text" value={formData.badge_text} onChange={e => setFormData({...formData, badge_text: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-sm text-white focus:border-primary uppercase font-bold tracking-widest text-[10px]" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Atmosphere Art (Image URL)</label>
                                            <input type="text" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full bg-black border border-white/10 rounded p-3 text-sm text-white focus:border-primary" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Thermodynamic Array (Gradient)</label>
                                        <div className="flex flex-wrap gap-2">
                                            {PRESET_GRADIENTS.map((grad, i) => (
                                                <button 
                                                    key={i} type="button" 
                                                    onClick={() => setFormData({...formData, bg_color: grad.value})}
                                                    className={`w-10 h-10 rounded-full border-2 ${formData.bg_color === grad.value ? 'border-white scale-110 shadow-lg' : 'border-transparent'} ${grad.value} transition-all`}
                                                    title={grad.label}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Live Preview (Right) */}
                        <div className="w-full lg:w-1/2 p-6 lg:p-12 bg-black flex flex-col justify-center items-center relative min-h-[400px]">
                            <h3 className="absolute top-8 left-8 text-[12px] font-black uppercase tracking-[0.3em] text-zinc-700 animate-pulse hidden md:block">Live DOM Vector Target</h3>
                            
                            <div className="w-full max-w-sm pointer-events-none transition-opacity duration-300" style={{ opacity: formData.is_active ? 1 : 0.3 }}>
                                {!formData.is_active && <div className="absolute inset-0 z-50 flex items-center justify-center font-black text-white text-3xl uppercase tracking-widest italic -rotate-12 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] border-[6px] border-white w-max mx-auto px-4 py-2 mt-20">INACTIVE</div>}
                                <div className={`p-8 rounded-3xl relative overflow-hidden shadow-2xl shadow-black/50 ${formData.bg_color}`}>
                                    <div className="relative z-10 flex flex-col h-full justify-between min-h-[220px]">
                                        <div className="flex justify-between items-start mb-6">
                                            {formData.badge_text ? (
                                                <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded text-[9px] font-black uppercase tracking-[0.2em] shadow-lg border border-white/10">
                                                    {formData.badge_text}
                                                </span>
                                            ) : <div/>}
                                            {formData.code && (
                                                <div className="bg-black/40 backdrop-blur text-white px-3 py-1.5 rounded text-[10px] uppercase font-black tracking-widest ml-auto border border-white/10 flex items-center gap-2 max-w-[120px]">
                                                    <TagIcon className="h-3 w-3 shrink-0" /> <span className="truncate">{formData.code}</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="mt-auto">
                                            <h3 className="text-4xl font-heading font-black italic tracking-tighter text-white drop-shadow-md mb-2 leading-none uppercase truncate">
                                                {formData.title || "TITLE HERE"}
                                            </h3>
                                            <p className="text-white/80 text-sm font-medium leading-relaxed max-w-[85%] line-clamp-2">
                                                {formData.description || "Description preview goes here..."}
                                            </p>
                                            
                                            <div className="mt-6 flex items-center gap-2">
                                                <span className="text-5xl font-black text-white tracking-tighter italic">
                                                    {formData.discount_type === 'percentage' ? `${formData.discount_value || 0}%` : `₹${formData.discount_value || 0}`}
                                                </span>
                                                <span className="text-white/60 text-xs font-bold uppercase tracking-widest mt-3 block">
                                                    OFF
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
                                    {formData.image_url && (
                                        <div className="absolute bottom-0 right-0 w-40 h-40 opacity-20 transform translate-x-1/4 translate-y-1/4 grayscale contrast-200">
                                            <img src={formData.image_url} alt="" className="w-full h-full object-contain mix-blend-overlay" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="w-full max-w-sm mt-8 space-y-4 relative z-50">
                                <Button form="couponForm" type="submit" className="w-full h-14 text-sm font-black italic tracking-[0.2em] uppercase rounded-none bg-white text-black hover:bg-primary hover:text-white transition-all shadow-xl shadow-white/10 border-none shrink-0" onClick={() => {}}>
                                    Lock Configuration Object
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
