import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { path: "/studio-kami", label: "Studio Kami" },
    { path: "/proyek", label: "Proyek" },
    { path: "/layanan", label: "Layanan" },
    { path: "/kontak", label: "Kontak" },
  ];

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg py-3' : 'py-5'
      } dark:border-b dark:border-border/40`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          <Link href="/">
            <motion.div 
              className="font-bold text-2xl md:text-3xl tracking-tight text-foreground hover:text-primary transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              DIEGMA
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
              >
                <motion.div
                  className={`relative font-medium text-sm tracking-wide transition-colors ${
                    location === link.path 
                      ? "text-primary" 
                      : "text-foreground hover:text-primary"
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                  {location === link.path && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                      layoutId="navbar-indicator"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
            <ThemeToggle />
          </div>
          
          {/* Mobile Navigation Toggles */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <motion.button 
              className="text-foreground focus:outline-none rounded-full w-10 h-10 flex items-center justify-center bg-secondary/50"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              whileTap={{ scale: 0.9 }}
            >
              <motion.i 
                className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`} 
                initial={false}
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && isMobile && (
          <motion.div 
            className="md:hidden bg-background/95 backdrop-blur-sm w-full border-t border-border overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.div 
              className="flex flex-col py-5 px-8 space-y-4"
              variants={{
                open: { transition: { staggerChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              initial="closed"
              animate="open"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 }
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Link
                    href={link.path}
                    className={`block py-2 font-medium transition-colors text-lg ${
                      location === link.path
                        ? "text-primary" 
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <div className="h-px bg-border/30 w-full my-1" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavBar;
