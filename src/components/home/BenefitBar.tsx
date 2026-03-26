import { motion } from "framer-motion";
import { ShieldCheck, Truck, RotateCcw, Users } from "lucide-react";

const benefits = [
    {
        icon: <Users className="h-6 w-6" />,
        title: "50k+ Collectors",
        description: "Trusted worldwide for archival car assets."
    },
    {
        icon: <ShieldCheck className="h-6 w-6" />,
        title: "Archival Quality",
        description: "Every unit is inspected for showroom perfection."
    },
    {
        icon: <Truck className="h-6 w-6" />,
        title: "Sector Shipping",
        description: "Express global delivery with real-time telemetry."
    },
    {
        icon: <RotateCcw className="h-6 w-6" />,
        title: "Easy Returns",
        description: "7-day return protocol for peace of mind."
    }
];

export function BenefitBar() {
    return (
        <section className="py-12 bg-secondary/50 border-t border-black/5">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-2 text-foreground italic">
                                {benefit.title}
                            </h3>
                            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest leading-relaxed">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
