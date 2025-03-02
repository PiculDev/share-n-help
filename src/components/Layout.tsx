
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Heart, Plus, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeComponent";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase"


const navLinks = [
  { path: "/", label: "Início", icon: Home },
  { path: "/browse", label: "Explorar", icon: Search },
  { path: "/donate", label: "Doar", icon: Plus },
  { path: "/requests/new", label: "Solicitações", icon: Heart },
];

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log("Usuário logado:", result.user);
  };

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
        isScrolled ? "glass-effect shadow-sm" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary animate-fade-in" fill="currentColor" />
            <span className={cn(
              "font-semibold text-lg transition-all",
              isScrolled ? "text-foreground" : "text-foreground"
            )}>
              Share<span className="text-primary">&</span>Help
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-md flex items-center gap-2 transition-all",
                  location.pathname === link.path
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            ))}

            <Button variant="outline" size="sm" className="h-9" onClick={() => signInWithGoogle()}>
              Entrar
            </Button>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 pt-20 px-6 md:hidden animate-fade-in">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-3 rounded-md flex items-center gap-3 transition-all",
                  location.pathname === link.path
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <link.icon className="h-5 w-5" />
                <span className="text-base">{link.label}</span>
              </Link>
            ))}
            <ThemeToggle />
            <Link to="/login" className="mt-2">
              <Button className="w-full" onClick={() => signInWithGoogle()}>Entrar</Button>
            </Link>
          </nav>
        </div>
      )}

      <main className="flex-1 pt-20 overflow-x-hidden">
        {children}
      </main>

      <footer className="border-t border-border/30 py-8 px-6 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" fill="currentColor" />
              <span className="font-medium">Share<span className="text-primary">&</span>Help</span>
            </div>

            <div className="text-sm text-muted-foreground">
              Conectando doadores e pessoas necessitadas
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
