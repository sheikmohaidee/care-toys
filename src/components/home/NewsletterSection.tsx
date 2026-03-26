import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
    return (
        <section className="py-32 bg-primary text-black relative overflow-hidden">
            {/* Speed Stripes Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-black translate-y-10" />
                <div className="absolute top-0 left-0 w-full h-[4px] bg-black translate-y-14" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-black translate-y-20" />
            </div>

            <div className="container px-4 mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="h-0.5 w-12 bg-black" />
                        <span className="text-[10px] text-black font-black uppercase tracking-[0.5em]">Exclusive Clearance</span>
                        <span className="h-0.5 w-12 bg-black" />
                    </div>

                    <h2 className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter mb-6 italic leading-none">
                        JOIN THE <span className="text-white [text-shadow:_4px_4px_0_rgba(0,0,0,0.15)]">PIT CREW</span>
                    </h2>

                    <p className="text-lg md:text-xl text-black/80 max-w-2xl mx-auto mb-12 font-bold uppercase tracking-widest italic">
                        Get exclusive access to limited drops, members-only racer events, and archival pricing.
                    </p>

                    <form className="max-w-2xl mx-auto flex flex-col md:flex-row gap-0 group shadow-2xl shadow-black/10">
                        <input
                            type="email"
                            placeholder="OPERATOR EMAIL @ ACCESS.COM"
                            className="flex-grow px-8 py-6 bg-black text-white placeholder:text-gray-500 focus:outline-none font-black uppercase tracking-widest text-sm skew-x-[-12deg] border-none"
                        />
                        <Button size="lg" className="bg-white hover:bg-black hover:text-white text-black font-black uppercase italic tracking-[0.1em] rounded-none skew-x-[-12deg] px-12 h-auto text-xl transition-all border-none -ml-4 shadow-xl">
                            REGISTER ASSET
                        </Button>
                    </form>

                    <p className="text-[10px] text-black/60 mt-10 font-black uppercase tracking-[0.3em]">
                        NO SPAM. JUST PURE VELOCITY. OPT-OUT AT ANY TIME.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
