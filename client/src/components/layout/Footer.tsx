import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-10 px-4 transition-colors duration-300">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <Link href="/" className="font-bold text-xl tracking-tight mb-4 md:mb-0 transition-colors hover:text-primary">
            DIEGMA
          </Link>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm text-muted-foreground">Jl. Sudirman No. 123, Jakarta 10220</p>
            <span className="hidden md:inline text-muted-foreground">|</span>
            <p className="text-sm text-muted-foreground">info@diegma.com</p>
            <span className="hidden md:inline text-muted-foreground">|</span>
            <p className="text-sm text-muted-foreground">+62 21 1234 5678</p>
          </div>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-lg"></i>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook text-lg"></i>
            </a>
            <a 
              href="https://pinterest.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Pinterest"
            >
              <i className="fab fa-pinterest text-lg"></i>
            </a>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} DIEGMA. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
