import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
    return (
        <div className="min-h-screen bg-background pb-12 pt-40 lg:pt-48">
            <div className="container px-4 mx-auto max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter mb-4 text-foreground">
                        Get in <span className="text-primary">Touch</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        We would love to hear from you! Whether you have questions about a product, bulk orders, rare model requests, or shipping details — we’re here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-card border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Contact Info */}
                    <div className="bg-secondary p-10 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
                                <p className="text-muted-foreground mb-8">Fill up the form and our Team will get back to you within 24 hours.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/20 p-3 rounded-lg text-primary">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground">Email</h4>
                                        <p className="text-muted-foreground">support@caretoys.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/20 p-3 rounded-lg text-primary">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground">Phone</h4>
                                        <p className="text-muted-foreground">+91 8015293181</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/20 p-3 rounded-lg text-primary">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground">Location</h4>
                                        <p className="text-muted-foreground">Coimbatore, Tamil Nadu, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-12">
                            <p className="text-sm text-muted-foreground">
                                Operating Hours: <br />
                                Mon - Sat: 9:00 AM - 8:00 PM <br />
                                Sun: Closed
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="p-10">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Name</label>
                                    <input type="text" className="w-full bg-input border border-border rounded p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Your Name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Phone (Optional)</label>
                                    <input type="tel" className="w-full bg-input border border-border rounded p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="+91..." />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Email</label>
                                <input type="email" className="w-full bg-input border border-border rounded p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="you@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Subject</label>
                                <select className="w-full bg-input border border-border rounded p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                                    <option>Product Inquiry</option>
                                    <option>Order Status</option>
                                    <option>Bulk Order Request</option>
                                    <option>Rare Model Request</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Message</label>
                                <textarea rows={5} className="w-full bg-input border border-border rounded p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="How can we help you?" />
                            </div>

                            <Button className="w-full py-6 text-lg font-bold shadow-lg" size="lg">
                                <Send className="mr-2 h-5 w-5" /> Send Message
                            </Button>

                            <p className="text-xs text-center text-muted-foreground mt-4">
                                We usually respond within 24 hours.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
