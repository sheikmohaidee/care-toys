import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { authApi } from "@/lib/api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const res = await authApi.adminLogin({ username, password });
            if (res.data.success) {
                // PHP backend uses session cookies for admin auth — no token to store
                // We just flag locally so AdminRoute can redirect correctly
                localStorage.setItem("admin_logged_in", "true");
                window.location.href = "/admin/dashboard";
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid Admin Credentials.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-zinc-950 border border-zinc-900 shadow-2xl rounded-xl p-8 shadow-black/50">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Lock className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-heading font-black italic uppercase tracking-tighter text-white">System Admin</h1>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mt-2">Restricted Access Protocol</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-xs font-bold uppercase tracking-widest text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            required
                            type="text"
                            placeholder="Admin Identifier"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-4 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-zinc-700"
                        />
                    </div>
                    <div>
                        <input
                            required
                            type="password"
                            placeholder="Passcode Protocol"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded p-4 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-zinc-700"
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-primary hover:bg-white hover:text-black transition-all text-white font-black italic uppercase tracking-[0.2em] rounded"
                    >
                        {loading ? "Authenticating..." : "Initialize Uplink"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
