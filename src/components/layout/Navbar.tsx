import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Search, Menu, X, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Cars", href: "/shop?category=hot-wheels" },
    { name: "Stands", href: "/shop?category=stands" },
    { name: "Tracks", href: "/shop?category=track-sets" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { cartCount } = useCart();
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={cn(
            "fixed top-0 z-[100] w-full transition-all duration-500 bg-background/95 backdrop-blur-xl border-b border-black/5",
            scrolled ? "py-2 shadow-sm" : "py-4"
        )}>
            {/* Top Ticker - Trust Bar */}
            <div className="bg-secondary border-b border-black/5 py-1 box-content overflow-hidden">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    className="flex whitespace-nowrap text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-foreground/40"
                >
                    <span className="px-8">FREE WORLDWIDE SHIPPING ON ALL ORDERS OVER ₹2000</span>
                    <span className="px-8 text-primary">NEW DROPS EVERY FRIDAY AT MIDNIGHT</span>
                    <span className="px-8">50,000+ SATISFIED COLLECTORS WORLDWIDE</span>
                    <span className="px-8 text-primary italic">#1 SPEED BRAND IN THE WORLD</span>
                    <span className="px-8">FREE WORLDWIDE SHIPPING ON ALL ORDERS OVER ₹2000</span>
                    <span className="px-8 text-primary">NEW DROPS EVERY FRIDAY AT MIDNIGHT</span>
                </motion.div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 mt-4">
                <div className="flex items-center justify-between">
                    {/* Brand */}
                    <div className="flex items-center gap-12">
                        <Link to="/" className="group flex items-center">
                            <img loading="lazy"
                                src="/images/logo.png"
                                alt="Care Toys Logo"
                                className="h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
                            />
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-[10px] font-black text-muted-foreground hover:text-foreground transition-all uppercase tracking-[0.3em] relative group/link whitespace-nowrap"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-primary transition-all group-hover/link:w-full" />
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 md:gap-6">
                        <Link to="/shop">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-colors w-8 h-8 rounded-none">
                                <Search className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link to="/account">
                            <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-primary transition-colors w-8 h-8 rounded-none">
                                <User className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link to="/wishlist">
                            <Button variant="ghost" size="icon" className="hidden md:flex text-muted-foreground hover:text-primary transition-colors w-8 h-8 rounded-none">
                                <Heart className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link to="/cart">
                            <Button variant="ghost" size="icon" className="relative group/cart text-muted-foreground hover:text-primary transition-colors w-8 h-8 rounded-none">
                                <ShoppingCart className="h-4 w-4" />
                                {mounted && (
                                    <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-primary text-[8px] font-black text-white flex items-center justify-center opacity-100 group-hover/cart:scale-110 transition-transform">
                                        {cartCount}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            className="lg:hidden text-foreground hover:text-primary transition-colors p-2"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 lg:hidden bg-background z-50 flex flex-col pt-32 px-8 overflow-y-auto"
                    >
                        <button
                            className="absolute top-8 right-8 text-foreground p-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-8 w-8" />
                        </button>

                        <div className="flex flex-col gap-10">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 * idx }}
                                >
                                    <Link
                                        to={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-4xl md:text-6xl font-heading font-black text-foreground hover:text-primary transition-colors uppercase tracking-tighter flex items-center group italic"
                                    >
                                        {link.name} <ArrowRight className="ml-4 h-8 w-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-auto pb-12 pt-20 border-t border-black/10 grid grid-cols-2 gap-4">
                            <Button className="rounded-none bg-foreground text-background font-black uppercase text-[10px] tracking-widest h-12">
                                LOGIN
                            </Button>
                            <Button className="rounded-none bg-primary text-white font-black uppercase text-[10px] tracking-widest h-12">
                                SEARCH
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
