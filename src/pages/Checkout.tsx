import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { ordersApi, settingsApi } from "@/lib/api";

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [mounted, setMounted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [adminWhatsApp, setAdminWhatsApp] = useState("918015293181"); // Fallback

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        phone: "",
        notes: ""
    });

    // Auto-fill from localStorage on mount & Fetch explicit admin settings
    useEffect(() => {
        setMounted(true);
        const savedData = localStorage.getItem("care-toys-customer");
        if (savedData) {
            try { setFormData({ ...formData, ...JSON.parse(savedData) }); } catch (e) {}
        }

        const fetchSettings = async () => {
            try {
                const res = await settingsApi.get();
                if (res.data?.success && res.data.data?.whatsapp_number) {
                    setAdminWhatsApp(res.data.data.whatsapp_number);
                }
            } catch (err) {}
        };
        fetchSettings();
    }, []);

    const shipping = 0; // Free
    const total = cartTotal + shipping;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrorMsg(""); // Clear errors on typing
    };

    const validateForm = () => {
        if (!formData.firstName.trim()) return "First name is required.";
        if (!formData.address.trim()) return "Shipping address is required.";
        
        // Indian phone number validation
        const cleanPhone = formData.phone.replace(/\D/g, '').slice(-10); // get last 10 digits
        const phoneRegex = /^[6-9]\d{9}$/;
        
        if (!phoneRegex.test(cleanPhone)) {
            return "Please enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9.";
        }

        if (cart.length === 0) return "Your cart is empty. Please add items before checking out.";

        return null; // No errors
    };

    const handleWhatsAppOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        const err = validateForm();
        if (err) {
            setErrorMsg(err);
            return;
        }

        setSubmitting(true);
        setErrorMsg("");

        try {
            // Save details for next time
            const cleanPhone = formData.phone.replace(/\D/g, '').slice(-10);
            localStorage.setItem("care-toys-customer", JSON.stringify({
                ...formData,
                phone: cleanPhone // Save sanitized back to standard struct
            }));

            // Sync with Backend
            const items = cart.map(item => ({
                product_id: parseInt(`${item.product_id || item.id}`),
                quantity: item.quantity,
                price: item.price
            }));
            
            // Optional trap to allow Whatsapp fallback if backend fails (failsafe for production)
            let orderId = "MANUAL";
            try {
                const res = await ordersApi.create({ 
                    items, 
                    total_amount: total,
                    customer_name: `${formData.firstName} ${formData.lastName}`.trim(),
                    customer_phone: cleanPhone,
                    customer_address: formData.address,
                    customer_city: formData.city
                });
                if (res.data?.data?.order_id) {
                    orderId = res.data.data.order_id;
                }
            } catch (backendErr) {
                console.warn("Backend sync skipped/failed. Proceeding directly to WhatsApp.", backendErr);
            }
            
            const phoneNumber = adminWhatsApp.replace(/\D/g, '');

            let message = `*NEW ORDER ${orderId !== 'MANUAL' ? `#${orderId} ` : ''}FROM CARE TOYS*\n\n`;
            message += `*Customer Details:*\n`;
            message += `Name: ${formData.firstName.trim()} ${formData.lastName.trim()}\n`;
            if (formData.email.trim()) message += `Email: ${formData.email.trim()}\n`;
            message += `Phone: +91 ${cleanPhone}\n`;
            message += `Address: ${formData.address.trim()}`;
            if (formData.city.trim()) message += `, ${formData.city.trim()}`;
            if (formData.postalCode.trim()) message += ` - ${formData.postalCode.trim()}`;
            message += `\n`;
            if (formData.notes.trim()) message += `Notes: ${formData.notes.trim()}\n`;
            message += `\n`;

            message += `*Order Items:*\n`;
            let calculatedTotal = 0;
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                message += `${index + 1}. ${item.name || 'Item'} (x${item.quantity}) - ₹${itemTotal}\n`;
                calculatedTotal += itemTotal;
            });
            message += `\n*Total Amount: ₹${calculatedTotal}*\n\n`;
            message += `Please confirm my order and send payment details.`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // Clear cart & open WhatsApp
            clearCart();
            window.open(whatsappUrl, "_blank");
            
            // Redirect to home
            navigate("/");

        } catch (err: any) {
             console.error(err);
             setErrorMsg("Failed to initialize checkout protocol. Please try again.");
        } finally {
             setSubmitting(false);
        }
    };

    if (!mounted || submitting) return <div className="min-h-screen bg-background py-12 text-center pt-32 font-bold uppercase tracking-widest text-primary">Processing Order Protocol...</div>;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-background py-12 text-center pt-40 lg:pt-48">
                 <div className="max-w-md mx-auto p-8 border border-dashed border-black/10 bg-secondary/30">
                     <p className="text-xl mb-6 font-bold uppercase tracking-widest text-destructive">Your cart is empty</p>
                     <Link to="/shop">
                         <Button className="w-full font-black uppercase tracking-widest rounded-none py-6 border-none shadow-xl hover:bg-white hover:text-black">Return to Archive</Button>
                     </Link>
                 </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-12 pt-40 lg:pt-48">
            <div className="container px-4 mx-auto max-w-4xl">
                <Link to="/cart" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors text-[10px] uppercase font-black tracking-widest">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
                </Link>

                <h1 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-12 text-center italic">
                    Finalize <span className="text-primary">Uplink</span>
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Form */}
                    <form onSubmit={handleWhatsAppOrder} className="space-y-8">
                        {errorMsg && (
                            <div className="p-4 border border-destructive/20 bg-destructive/10 text-destructive text-sm font-bold uppercase tracking-wider">
                                {errorMsg}
                            </div>
                        )}

                        <div>
                            <h3 className="font-bold text-xl mb-4 flex items-center gap-2 uppercase tracking-tighter italic">
                                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs not-italic">1</span>
                                Shipping Profile
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name *"
                                    required
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="col-span-1 bg-input border border-border rounded-none p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="col-span-1 bg-input border border-border rounded-none p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="col-span-2 bg-input border border-border rounded-none p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="WhatsApp Number (10 Digits) *"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="col-span-2 bg-input border border-border rounded-none p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Full Street Address *"
                                    required
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="col-span-2 bg-input border border-border rounded-none p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="col-span-1 bg-input border border-border rounded-none p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <input
                                    type="text"
                                    name="postalCode"
                                    placeholder="Postal Code"
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                    className="col-span-1 bg-input border border-border rounded-none p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <textarea
                                    name="notes"
                                    placeholder="Order Notes (Optional)"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    className="col-span-2 bg-input border border-border rounded-none p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none h-24"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-xl mb-4 flex items-center gap-2 uppercase tracking-tighter italic">
                                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs not-italic">2</span>
                                Routing Protocol
                            </h3>
                            <div className="p-4 border border-primary bg-primary/5 rounded-none flex items-center justify-between cursor-pointer ring-1 ring-primary">
                                <div className="flex items-center gap-3">
                                    <MessageCircle className="text-primary h-5 w-5" />
                                    <span className="font-black uppercase tracking-widest text-[10px]">Direct WhatsApp Invoice</span>
                                </div>
                                <div className="w-4 h-4 rounded-full border-4 border-primary bg-background" />
                            </div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-3 px-1 leading-relaxed">
                                Your manifest will be securely routed via WhatsApp. Our logic systems will confirm availability and issue payment credentials upon reception.
                            </p>
                        </div>

                        <Button type="submit" disabled={submitting} size="lg" className="w-full text-lg font-black italic tracking-widest py-8 bg-green-600 hover:bg-green-700 text-white rounded-none border-none shadow-xl transition-all">
                            <MessageCircle className="mr-3 h-5 w-5" /> {submitting ? 'TRANSMITTING...' : 'AUTHORIZE WHATSAPP ROUTING'}
                        </Button>
                    </form>

                    {/* Order Summary */}
                    <div>
                        <div className="bg-card border border-black/5 rounded-none p-8 mb-6 shadow-xl shadow-black-[0.02]">
                            <h3 className="font-heading font-black text-2xl mb-6 uppercase italic tracking-tighter border-b border-black/5 pb-4">Manifest</h3>
                            <div className="space-y-4 mb-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest">
                                        <span className="text-muted-foreground">
                                            <span className="text-foreground">{item.quantity}x</span> {item.name}
                                        </span>
                                        <span className="text-primary italic text-sm">₹{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between font-black uppercase text-xl italic tracking-tighter border-t border-black/10 pt-6 mt-6">
                                <span>Total Valuation</span>
                                <span className="text-primary">₹{total}</span>
                            </div>
                        </div>

                        <div className="bg-secondary/50 border border-black/5 rounded-none p-8">
                            <h3 className="font-black text-[10px] mb-4 uppercase tracking-[0.2em]">Operational Checklist</h3>
                            <ul className="space-y-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground leading-relaxed">
                                <li className="flex gap-3 items-start">
                                    <span className="text-primary mt-0.5">01</span>
                                    Supply your destination coordinates
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-primary mt-0.5">02</span>
                                    Trigger the WhatsApp routing protocol
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-primary mt-0.5">03</span>
                                    Await payment vector instructions (UPI/Bank)
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
