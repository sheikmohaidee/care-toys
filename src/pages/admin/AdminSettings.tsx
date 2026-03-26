import { useState, useEffect } from "react";
import { Settings as SettingsIcon, Save, Phone, Store, Banknote } from "lucide-react";
import { settingsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function AdminSettings() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        whatsapp_number: "",
        business_name: "",
        currency: "INR"
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await settingsApi.get();
                if (res.data.success && res.data.data) {
                    setFormData(prev => ({ ...prev, ...res.data.data }));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await settingsApi.update(formData);
            alert("Global settings configured successfully.");
        } catch (err) {
            console.error(err);
            alert("Failed to commit global settings.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-12 font-black uppercase tracking-widest text-primary animate-pulse">Establishing Connection...</div>;

    return (
        <div className="p-8 lg:p-12 max-w-4xl">
            <header className="mb-12">
                <h1 className="text-4xl font-heading font-black uppercase italic tracking-tighter text-foreground flex items-center gap-4">
                    <SettingsIcon className="text-primary w-10 h-10" /> Global <span className="text-primary">Configuration</span>
                </h1>
                <p className="text-muted-foreground mt-2 text-[10px] font-bold uppercase tracking-widest">Master Protocol Adjustments</p>
            </header>

            <div className="bg-card border border-black/5 shadow-xl">
                <form onSubmit={handleSave} className="p-8 space-y-8">
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-6 pb-6 border-b border-black/5">
                            <div className="bg-primary/10 p-4 rounded text-primary flex-shrink-0">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div className="flex-grow">
                                <label className="block text-sm font-black uppercase tracking-widest text-foreground mb-2">Primary Comms Link (WhatsApp)</label>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4">Routes all Checkout operations natively towards this explicit client parameter.</p>
                                <input required type="text" value={formData.whatsapp_number} onChange={e => setFormData({...formData, whatsapp_number: e.target.value})} className="w-full bg-input border border-border rounded-none p-4 text-sm font-bold focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-muted-foreground/30" placeholder="e.g. 918015293181" />
                            </div>
                        </div>

                        <div className="flex items-start gap-6 pb-6 border-b border-black/5">
                            <div className="bg-primary/10 p-4 rounded text-primary flex-shrink-0">
                                <Store className="h-6 w-6" />
                            </div>
                            <div className="flex-grow">
                                <label className="block text-sm font-black uppercase tracking-widest text-foreground mb-2">Facility Designation</label>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4">Official title deployed globally resolving invoice headers dynamically.</p>
                                <input required type="text" value={formData.business_name} onChange={e => setFormData({...formData, business_name: e.target.value})} className="w-full bg-input border border-border rounded-none p-4 text-sm font-bold focus:ring-1 focus:ring-primary focus:outline-none" />
                            </div>
                        </div>

                        <div className="flex items-start gap-6 pb-6">
                            <div className="bg-primary/10 p-4 rounded text-primary flex-shrink-0">
                                <Banknote className="h-6 w-6" />
                            </div>
                            <div className="flex-grow">
                                <label className="block text-sm font-black uppercase tracking-widest text-foreground mb-2">Base Denomination</label>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-4">Dictates economic string mappings globally locally referencing numeric values.</p>
                                <select value={formData.currency} onChange={e => setFormData({...formData, currency: e.target.value})} className="w-full bg-input border border-border rounded-none p-4 text-sm font-bold focus:ring-1 focus:ring-primary focus:outline-none uppercase tracking-widest">
                                    <option value="INR">Indian Rupee (INR)</option>
                                    <option value="USD">US Dollar (USD)</option>
                                    <option value="EUR">Euro (EUR)</option>
                                    <option value="GBP">British Pound (GBP)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-black/5 flex justify-end">
                        <Button type="submit" disabled={saving} className="font-black italic tracking-widest uppercase rounded-none bg-primary text-white hover:bg-foreground transition-all shadow-xl shadow-primary/20 text-xs py-6 px-12">
                            {saving ? "Deploying Protocol..." : "Commit Adjustments"} <Save className="ml-3 h-4 w-4" />
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}
