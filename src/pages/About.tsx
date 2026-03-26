import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function About() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Hero Image */}
                <div className="absolute inset-0">
                    <img loading="lazy"
                        src="/assets/banners/design-8.png"
                        alt="About Hero"
                        className="w-full h-full object-cover opacity-50"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
                <div className="absolute inset-0 bg-black/50" />

                <div className="relative z-10 container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter mb-6 text-white text-shadow-lg">
                            Collector's <span className="text-primary">Passion</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
                            Bringing the excitement of speed, creativity, and imagination to toy lovers of all ages.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 container px-4 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Mission Text */}
                    <div className="space-y-8">
                        <div>
                            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Our Story</span>
                            <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase mb-4 text-foreground">
                                Welcome to <span className="text-primary">Care Toys</span>
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                We are passionate about bringing the excitement of speed, creativity, and imagination to toy
                                lovers of all ages. Our store specializes in Hot Wheels collections, rare editions, limited
                                releases, and exclusive models that every collector dreams of.
                            </p>
                            <p className="text-muted-foreground text-lg leading-relaxed mt-4">
                                What started as a small passion for miniature cars has grown into a dedicated online store
                                serving collectors, kids, and hobby enthusiasts across the country.
                            </p>
                        </div>

                        <div className="bg-card border border-white/5 p-8 rounded-lg">
                            <h3 className="text-xl font-heading font-bold uppercase mb-4 text-primary">🔥 Our Speciality – Hot Wheels</h3>
                            <p className="text-muted-foreground mb-4">
                                At Care Toys, Hot Wheels is not just a product — it’s our passion. We carefully source:
                            </p>
                            <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2">
                                {["Mainline collections", "Premium editions", "Treasure Hunts", "Super Treasure Hunts", "Limited and rare models"].map((item) => (
                                    <li key={item} className="flex items-center text-sm font-medium">
                                        <span className="w-2 h-2 rounded-full bg-primary mr-2" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Visual / Mission Values */}
                    <div className="space-y-8">
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-black group-hover:from-primary/10 transition-colors duration-500" />
                            {/* Placeholder for Floating Product Display Image */}
                            <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                                <div>
                                    <h3 className="text-2xl font-heading font-black uppercase text-white mb-2">The Pursuit of Perfection</h3>
                                    <p className="text-white/70 text-sm">Every car is inspected and packed safely to ensure collectors receive products in perfect condition.</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-card p-6 rounded-lg border border-white/5">
                                <h4 className="font-bold text-lg mb-2 text-foreground">🎯 Our Mission</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Deliver authentic products</li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Provide secure packaging</li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Offer fair pricing</li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Create a joyful experience</li>
                                </ul>
                            </div>
                            <div className="bg-card p-6 rounded-lg border border-white/5">
                                <h4 className="font-bold text-lg mb-2 text-foreground">💡 Why Choose Us?</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> 100% Original Products</li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Collector-Safe Packaging</li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Fast Shipping</li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Dedicated Support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA Section */}
            <section className="bg-primary/90 py-16 text-white text-center">
                <div className="container px-4 mx-auto">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase mb-6">Have a Question?</h2>
                    <p className="text-xl max-w-2xl mx-auto mb-8 text-white/90">
                        Whether you have questions about a product, bulk orders, rare model requests, or shipping details — we’re here to help.
                    </p>
                    <Link to="/contact">
                        <Button size="lg" variant="secondary" className="font-bold text-primary">
                            Contact Us Now
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
