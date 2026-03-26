import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-6">
                <h1 className="text-9xl font-heading font-black text-primary">404</h1>
                <h2 className="text-2xl md:text-4xl font-heading font-bold uppercase text-foreground">
                    Page Not Found
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link to="/">
                    <Button size="lg" className="mt-8">
                        Return to Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    );
}
