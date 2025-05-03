import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useMobile } from "@/hooks/use-mobile";

const NavBar = () => {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { path: "/studio-kami", label: "Studio Kami" },
    { path: "/proyek", label: "Proyek" },
    { path: "/layanan", label: "Layanan" },
    { path: "/kontak", label: "Kontak" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white z-50 ${isScrolled ? 'shadow-sm' : ''}`}>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl tracking-tight">
          DIEGMA
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`font-medium transition-colors ${
                location === link.path ? "text-primary" : "text-dark hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-dark focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
      </nav>
      
      {/* Mobile Navigation Menu */}
      {isMobile && (
        <div className={`md:hidden bg-white w-full py-4 px-4 shadow-md ${isMobileMenuOpen ? '' : 'hidden'}`}>
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={closeMobileMenu}
                className={`font-medium transition-colors ${
                  location === link.path ? "text-primary" : "text-dark hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
