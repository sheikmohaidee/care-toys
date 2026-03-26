import { Button } from "@/components/ui/button";
import { Package, User, Heart, MapPin, LogOut } from "lucide-react";

export default function Account() {
    return (
        <div className="min-h-screen bg-background pb-12 pt-40 lg:pt-48">
            <div className="container px-4 mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <aside className="md:col-span-1">
                    <div className="bg-card border border-white/5 rounded-lg p-6 space-y-2">
                        <div className="flex items-center gap-3 p-3 bg-primary/10 text-primary rounded mb-4">
                            <User className="h-5 w-5" />
                            <span className="font-bold">My Profile</span>
                        </div>
                        <button className="flex items-center gap-3 p-3 w-full text-left hover:bg-white/5 rounded transition-colors text-muted-foreground hover:text-foreground">
                            <Package className="h-5 w-5" /> Orders
                        </button>
                        <button className="flex items-center gap-3 p-3 w-full text-left hover:bg-white/5 rounded transition-colors text-muted-foreground hover:text-foreground">
                            <Heart className="h-5 w-5" /> Wishlist
                        </button>
                        <button className="flex items-center gap-3 p-3 w-full text-left hover:bg-white/5 rounded transition-colors text-muted-foreground hover:text-foreground">
                            <MapPin className="h-5 w-5" /> Addresses
                        </button>
                        <div className="pt-4 border-t border-white/10 mt-4">
                            <button className="flex items-center gap-3 p-3 w-full text-left hover:bg-red-900/20 text-red-500 rounded transition-colors">
                                <LogOut className="h-5 w-5" /> Sign Out
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Content */}
                <main className="md:col-span-3">
                    <div className="bg-card border border-white/5 rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-heading font-bold mb-6">Recent Orders</h2>

                        <div className="space-y-4">
                            {/* Mock Order */}
                            <div className="border border-white/10 rounded overflow-hidden">
                                <div className="bg-white/5 p-4 flex justify-between items-center text-sm">
                                    <div className="text-muted-foreground">Order #R7492-22</div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500" />
                                        <span>Delivered</span>
                                    </div>
                                </div>
                                <div className="p-4 flex gap-4">
                                    <div className="w-16 h-16 bg-white/10 rounded flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold">Velocity X-1</h4>
                                        <p className="text-sm text-muted-foreground">Qty: 1</p>
                                    </div>
                                    <div className="ml-auto font-bold text-primary">₹12999</div>
                                </div>
                                <div className="p-4 border-t border-white/10 flex justify-end">
                                    <Button variant="outline" size="sm">Track Order</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card border border-white/5 rounded-lg p-6">
                        <h2 className="text-2xl font-heading font-bold mb-6">Account Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase tracking-wide text-muted-foreground mb-2">First Name</label>
                                <input type="text" defaultValue="Max" className="w-full bg-input border border-border rounded p-3 text-sm" readOnly />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wide text-muted-foreground mb-2">Last Name</label>
                                <input type="text" defaultValue="Speed" className="w-full bg-input border border-border rounded p-3 text-sm" readOnly />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs uppercase tracking-wide text-muted-foreground mb-2">Email</label>
                                <input type="email" defaultValue="max.speed@example.com" className="w-full bg-input border border-border rounded p-3 text-sm" readOnly />
                            </div>
                            <div className="md:col-span-2">
                                <Button>Save Changes</Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
