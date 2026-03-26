import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-background flex items-center pt-20">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />

                {/* Subtle Text Mask Pattern */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] select-none pointer-events-none">
                    <span className="text-[25vw] font-heading font-black italic tracking-tighter uppercase whitespace-nowrap text-foreground">
                        EST. 1968 SPEED
                    </span>
                </div>

                {/* Animated Speed Lines */}
                <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{
                                x: "200%",
                                opacity: [0, 0.15, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 3 + i,
                                ease: "linear"
                            }}
                            className="absolute h-[1px] bg-primary w-full"
                            style={{ top: `${15 + i * 10}%` }}
                        />
                    ))}
                </div>
            </div>

            <div className="container relative z-20 px-4 py-20 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left Column */}
                    <div className="flex flex-col items-start order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 mb-8"
                        >
                            <div className="h-[2px] w-8 bg-primary" />
                            <span className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.5em]">
                                The Definitive Archive
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-foreground uppercase italic tracking-tighter leading-[0.9] mb-8">
                                WORLD'S <br />
                                <span className="text-primary italic">LARGEST</span> <br />
                                SPEED HUB
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-muted-foreground text-sm md:text-base max-w-md mb-12 uppercase tracking-widest leading-loose"
                        >
                            Access the global nexus for high-performance <span className="text-foreground font-black">Hot Wheels</span> machinery and archival display engineering.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
                        >
                            <Link to="/shop" className="w-full sm:w-auto">
                                <Button size="lg" className="h-16 w-full sm:px-12 bg-foreground text-background hover:bg-primary transition-all duration-300 font-black uppercase italic tracking-[0.2em] rounded-none border-none">
                                    ACCESS COLLECTIVE <ArrowRight className="ml-3 h-5 w-5" />
                                </Button>
                            </Link>

                            <Link to="/drops" className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" className="h-16 w-full sm:px-12 border-black/20 text-foreground hover:bg-black/5 font-black uppercase italic tracking-[0.2em] rounded-none">
                                    LATEST DROPS
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="relative order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative aspect-square flex items-center justify-center p-12"
                        >
                            {/* Abstract Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 blur-[120px] rounded-full z-0" />

                            {/* Product Frame */}
                            <div className="absolute inset-0 border border-black/5 rotate-3 scale-95" />
                            <div className="absolute inset-0 border border-black/5 -rotate-3 scale-90" />

                            <motion.img
                                src="/assets/categories/hot-wheels-banner.jpg"
                                alt="Hot Wheels Official Branding"
                                className="relative z-20 w-full h-full object-contain drop-shadow-[0_0_80px_rgba(255,107,0,0.15)] rounded-2xl border-4 border-white shadow-2xl"
                                animate={{
                                    y: [0, -15, 0],
                                    rotate: [0, 1, 0]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 6,
                                    ease: "easeInOut"
                                }}
                            />

                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                className="absolute bottom-4 right-4 w-24 h-24 border border-primary/20 rounded-full flex items-center justify-center pointer-events-none"
                            >
                                <Zap className="h-6 w-6 text-primary animate-pulse" />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom Scroller Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
                <p className="text-[8px] font-black uppercase tracking-[0.6em] text-muted-foreground mb-4">DRIVE TO EXPLORE</p>
                <div className="h-12 w-[1px] bg-gradient-to-b from-primary to-transparent mx-auto" />
            </div>
        </section>
    );
}
