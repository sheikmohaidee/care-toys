import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="bg-card border-t border-black/5 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="mb-6 block">
                            <img loading="lazy"
                                src="/images/logo.png"
                                alt="Care Toys Logo"
                                className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                            Premium racing toys and collectibles for the modern enthusiast. Engineered for perfection, crafted for the podium.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-black text-foreground mb-4 uppercase tracking-[0.2em] text-[10px]">Shop Archive</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground font-medium">
                            <li><Link to="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
                            <li><Link to="/drops" className="hover:text-primary transition-colors">New Drops</Link></li>
                            <li><Link to="/category/racers" className="hover:text-primary transition-colors">Premium Racers</Link></li>
                            <li><Link to="/category/collectibles" className="hover:text-primary transition-colors">Archive Models</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-black text-foreground mb-4 uppercase tracking-[0.2em] text-[10px]">Logistics</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground font-medium">
                            <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping Intel</Link></li>
                            <li><Link to="/returns" className="hover:text-primary transition-colors">Sector Returns</Link></li>
                            <li><Link to="/faq" className="hover:text-primary transition-colors">Technical FAQ</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Paddock Contact</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-black text-foreground mb-4 uppercase tracking-[0.2em] text-[10px]">Telemetry Stream</h3>
                        <p className="text-muted-foreground text-sm mb-4 font-medium">
                            Subscribe for exclusive archival drops and technical updates.
                        </p>
                        <form className="flex gap-0 group">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="bg-secondary border border-black/5 px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary rounded-none font-bold uppercase tracking-widest text-[10px]"
                            />
                            <Button type="submit" size="sm" className="rounded-none bg-foreground text-background hover:bg-primary hover:text-white px-6 font-black uppercase italic tracking-widest text-[10px] h-auto">
                                JOIN
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                    <p>&copy; {new Date().getFullYear()} Care Toys. Sector Zero Authenticated.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Protocal</Link>
                        <Link to="/terms" className="hover:text-primary transition-colors">Terms of Engagement</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
