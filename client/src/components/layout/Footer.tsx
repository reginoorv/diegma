import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <Link href="/" className="font-bold text-xl tracking-tight mb-4 md:mb-0">
            DIEGMA
          </Link>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <p className="text-sm text-gray-500">Jl. Sudirman No. 123, Jakarta 10220</p>
            <span className="hidden md:inline text-gray-300">|</span>
            <p className="text-sm text-gray-500">info@diegma.com</p>
            <span className="hidden md:inline text-gray-300">|</span>
            <p className="text-sm text-gray-500">+62 21 1234 5678</p>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a 
              href="https://pinterest.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-primary transition-colors"
              aria-label="Pinterest"
            >
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} DIEGMA. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
