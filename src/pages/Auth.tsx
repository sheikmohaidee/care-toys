import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { authApi } from "@/lib/api";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            let res;
            if (isLogin) {
                res = await authApi.login({ email, password });
            } else {
                const name = `${firstName} ${lastName}`.trim();
                res = await authApi.register({ name, email, password });
            }
            
            if (res.data && res.data.token) {
                localStorage.setItem('token', res.data.token);
                navigate('/shop');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 relative">
            <div className="absolute inset-0 z-0">
                <img loading="lazy" src="/assets/backgrounds/wp12111987-hot-wheels-car-wallpapers.jpg.jpeg" alt="Background" className="w-full h-full object-cover opacity-20" />
            </div>
            <div className="w-full max-w-md bg-card border border-white/10 rounded-lg overflow-hidden shadow-2xl relative z-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-orange-500" />

                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-heading font-bold uppercase tracking-wide">
                            {isLogin ? "Welcome Back" : "Join the Team"}
                        </h1>
                        <p className="text-muted-foreground text-sm mt-2">
                            {isLogin ? "Access your order history and wishlist." : "Create an account for exclusive access."}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded">
                            {error}
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        <motion.form key={isLogin ? "login" : "register"}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4"
                            onSubmit={handleSubmit}
                        >
                            {!isLogin && (
                                <div className="grid grid-cols-2 gap-4">
                                    <input 
                                        type="text" 
                                        placeholder="First Name" 
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        required
                                        className="bg-input border border-border rounded p-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary" 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Last Name" 
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        required
                                        className="bg-input border border-border rounded p-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary" 
                                    />
                                </div>
                            )}
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="bg-input border border-border rounded p-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary" 
                            />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                className="bg-input border border-border rounded p-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary" 
                            />

                            <Button type="submit" disabled={loading} className="w-full font-bold">
                                {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
                            </Button>
                        </motion.form>
                    </AnimatePresence>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                        </span>
                        <button
                            type="button"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError("");
                            }}
                            className="ml-2 text-primary font-bold hover:underline"
                        >
                            {isLogin ? "Register" : "Sign In"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
