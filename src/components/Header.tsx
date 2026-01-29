import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Home } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const homeNavItems = [
    { label: "Sobre o SICAF", href: "#sicaf" },
    { label: "Serviços", href: "#servicos" },
    { label: "Processo", href: "#como-funciona" },
    { label: "Diferenciais", href: "#diferenciais" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-primary/20 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white flex items-center justify-center">
              <span className="text-primary font-bold text-lg">C</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white leading-none">CADBRASIL</span>
              <span className="text-[10px] text-white/80 uppercase tracking-wider">Cadastro SICAF</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {!isHomePage && (
              <Link
                to="/"
                className="flex items-center gap-1.5 text-white hover:text-white/80 transition-colors text-sm font-medium"
              >
                <Home className="w-4 h-4" />
                Página Inicial
              </Link>
            )}
            {isHomePage && homeNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+551121220202" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm">(011) 2122-0202</span>
            </a>
            <Button variant="outline" size="sm" className="bg-white text-primary hover:bg-white/90 border-white" asChild>
              <a href="https://fornecedor.cadbr.com.br" target="_blank" rel="noopener noreferrer">
                Área do Fornecedor
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col gap-1">
              {!isHomePage && (
                <Link
                  to="/"
                  className="flex items-center gap-1.5 text-white hover:bg-white/10 transition-colors font-medium py-2 px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="w-4 h-4" />
                  Página Inicial
                </Link>
              )}
              {isHomePage && homeNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white/80 hover:text-white hover:bg-white/10 transition-colors font-medium py-2 px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button variant="outline" size="default" className="mt-4 bg-white text-primary hover:bg-white/90 border-white" asChild>
                <a href="https://fornecedor.cadbr.com.br" target="_blank" rel="noopener noreferrer">
                  Área do Fornecedor
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
