import { Link } from "wouter";
import { motion } from "framer-motion";

const Footer = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const socialLinks = [
    { icon: "fab fa-instagram", url: "https://instagram.com", label: "Instagram" },
    { icon: "fab fa-facebook", url: "https://facebook.com", label: "Facebook" },
    { icon: "fab fa-pinterest", url: "https://pinterest.com", label: "Pinterest" },
    { icon: "fab fa-youtube", url: "https://youtube.com", label: "YouTube" }
  ];

  const contactInfo = [
    { text: "Jl. Sudirman No. 123, Jakarta 10220", icon: "fas fa-map-marker-alt" },
    { text: "info@diegma.com", icon: "fas fa-envelope" },
    { text: "+62 21 1234 5678", icon: "fas fa-phone-alt" }
  ];

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          <motion.div 
            className="md:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <Link href="/">
              <h2 className="font-bold text-3xl tracking-tight mb-4 text-foreground transition-colors hover:text-primary">
                DIEGMA
              </h2>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Kami memberikan solusi desain interior berkualitas tinggi yang mengubah ruangan Anda menjadi karya seni yang fungsional dan sesuai dengan gaya hidup Anda.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={link.label}
                  href={link.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label={link.label}
                  whileHover={{ y: -5, scale: 1.1 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <i className={`${link.icon} text-lg`}></i>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="md:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h3 className="text-lg font-semibold mb-5 text-foreground">Layanan Kami</h3>
            <div className="space-y-3">
              <div className="group">
                <Link href="/layanan" className="text-muted-foreground group-hover:text-primary transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></i>
                  <span>Desain Interior</span>
                </Link>
              </div>
              <div className="group">
                <Link href="/layanan" className="text-muted-foreground group-hover:text-primary transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></i>
                  <span>Desain Eksterior</span>
                </Link>
              </div>
              <div className="group">
                <Link href="/layanan" className="text-muted-foreground group-hover:text-primary transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></i>
                  <span>Produksi Furniture</span>
                </Link>
              </div>
              <div className="group">
                <Link href="/layanan" className="text-muted-foreground group-hover:text-primary transition-colors duration-300 flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></i>
                  <span>Konsultasi Desain</span>
                </Link>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h3 className="text-lg font-semibold mb-5 text-foreground">Hubungi Kami</h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <div className="w-8 h-8 rounded-full bg-secondary/60 flex items-center justify-center mt-0.5">
                    <i className={`${info.icon} text-primary text-sm`}></i>
                  </div>
                  <p className="text-muted-foreground flex-1">{info.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-border/50 pt-6 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} DIEGMA. <span className="hidden sm:inline">Semua hak dilindungi.</span>
          </p>
          
          <div className="flex items-center space-x-5">
            <Link href="/studio-kami" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
              Tentang Kami
            </Link>
            <Link href="/proyek" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
              Proyek
            </Link>
            <Link href="/kontak" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
              Kontak
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
