import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function BrandStory() {
    return (
        <section className="py-32 bg-secondary text-secondary-foreground relative overflow-hidden border-y border-black/5">
            {/* Background Tech Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,107,0,0.03)_0%,transparent_70%)]" />
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/[0.03] skew-x-[-12deg] translate-x-1/2 pointer-events-none border-l border-primary/5" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <span className="h-0.5 w-12 bg-primary" />
                            <span className="text-[10px] text-primary font-black uppercase tracking-[0.5em]">The DNA of Speed</span>
                        </div>

                        <h2 className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter leading-[0.85] mb-8 italic text-foreground">
                            ENGINEERED <br /> <span className="text-primary italic">FOR THE PODIUM</span>
                        </h2>

                        <div className="space-y-6 max-w-xl">
                            <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                                Care Toys isn't just a gallery. It's a tribute to the <span className="text-foreground font-black">art of velocity</span>. We curate the finest die-cast machinery for those who understand that every millimeter of engineering determines the winner.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                                From 1:64 scale masterpieces to professional modular display systems, our inventory is built for collectors who demand archival perfection.
                            </p>
                        </div>

                        <div className="mt-12 flex flex-wrap gap-8">
                            <div className="flex flex-col">
                                <span className="text-4xl font-heading font-black text-foreground italic">50K+</span>
                                <span className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">Collectors</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-4xl font-heading font-black text-foreground italic">1200+</span>
                                <span className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">Limited Ed.</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-4xl font-heading font-black text-foreground italic">24/7</span>
                                <span className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">Global Ship</span>
                            </div>
                        </div>

                        <div className="mt-12">
                            <Link to="/about">
                                <Button size="lg" className="bg-foreground hover:bg-primary text-background font-black uppercase italic tracking-widest rounded-none skew-x-[-12deg] px-10 h-14 transition-all border-none">
                                    OUR MISSION DEBRIEF
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative aspect-square max-w-lg mx-auto">
                            {/* Decorative Circular HUD */}
                            <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_20s_linear_infinite]" />
                            <div className="absolute inset-4 rounded-full border border-dashed border-black/5" />
                            <div className="absolute inset-12 rounded-full border-2 border-primary/5 shadow-[0_0_50px_rgba(255,107,0,0.05)]" />

                            {/* Central Image */}
                            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                                <img loading="lazy"
                                    src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=800&auto=format&fit=crop"
                                    alt="Chassis Engineering"
                                    className="w-[120%] h-[120%] object-contain scale-110 drop-shadow-[0_0_80px_rgba(255,107,0,0.15)]"
                                />
                            </div>

                            {/* HUD Labels */}
                            <div className="absolute top-0 left-0 bg-primary px-3 py-1 text-[8px] font-black text-background uppercase tracking-widest skew-x-[-12deg]">
                                System Scan: Optimal
                            </div>
                            <div className="absolute bottom-10 right-0 bg-secondary/80 backdrop-blur-md border border-black/5 px-4 py-2 text-[10px] font-bold text-foreground uppercase tracking-widest skew-x-[-12deg]">
                                Chassis Tech // v4.2
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
