import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  icon: string;
  image_url: string;
  created_at: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string;
}

// Contoh data produk untuk kategori furnitur
const furnitureProducts: Product[] = [
  {
    id: 1,
    name: "Sofa Modern Minimalis",
    description: "Sofa tiga dudukan dengan bahan premium dan desain minimalis yang elegan. Dilengkapi bantal dekoratif dan kaki kayu solid.",
    price: "Rp 8.500.000",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
    category: "Sofa"
  },
  {
    id: 2,
    name: "Meja Makan Kayu Jati",
    description: "Meja makan keluarga dengan material kayu jati solid dan finishing premium. Mampu menampung hingga 6 orang.",
    price: "Rp 12.750.000",
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
    category: "Meja"
  },
  {
    id: 3,
    name: "Kursi Kerja Ergonomis",
    description: "Kursi kerja dengan desain ergonomis untuk kenyamanan maksimal. Dilengkapi penyangga punggung dan pengaturan ketinggian.",
    price: "Rp 4.250.000",
    imageUrl: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
    category: "Kursi"
  },
  {
    id: 4,
    name: "Lemari Pakaian Custom",
    description: "Lemari pakaian custom dengan desain sesuai kebutuhan. Material HPL berkualitas tinggi dengan engsel premium.",
    price: "Rp 15.900.000",
    imageUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
    category: "Lemari"
  },
  {
    id: 5,
    name: "Rak Buku Modular",
    description: "Rak buku modular yang dapat disesuaikan dengan ruangan. Material kayu solid dengan finishing premium.",
    price: "Rp 6.800.000",
    imageUrl: "https://images.unsplash.com/photo-1594620302200-9a762244a156?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
    category: "Rak"
  },
  {
    id: 6,
    name: "Tempat Tidur Premium",
    description: "Tempat tidur premium dengan headboard mewah dan rangka kokoh. Tersedia dalam berbagai ukuran.",
    price: "Rp 14.500.000",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
    category: "Tempat Tidur"
  },
];

const ServiceDetail = () => {
  const params = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const { data: service, isLoading, error } = useQuery<Service>({
    queryKey: [`/api/services/${params.slug}`],
    enabled: !!params.slug,
    refetchOnWindowFocus: false,
  });

  const isFurnitureService = service?.slug === "furniture";

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | DIEGMA`;
    } else if (error) {
      toast({
        title: "Error",
        description: "Layanan tidak ditemukan",
        variant: "destructive",
      });
      navigate("/layanan");
    }
  }, [service, error, navigate, toast]);

  const handleLightboxToggle = (product: Product | null = null) => {
    setSelectedProduct(product);
    setLightboxOpen(!lightboxOpen);
  };

  const handleWhatsAppContact = (product: Product) => {
    const message = `Halo DIEGMA, saya tertarik dengan produk furnitur "${product.name}" dengan harga ${product.price}. Mohon informasi lebih lanjut.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6281234567890?text=${encodedMessage}`, '_blank');
  };

  const filteredProducts = activeFilter === "Semua" 
    ? furnitureProducts 
    : furnitureProducts.filter(product => product.category === activeFilter);

  if (isLoading) {
    return (
      <div className="container mx-auto pt-24 pb-16 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-card/60 rounded w-2/3 mb-4"></div>
          <div className="h-4 bg-card/60 rounded w-1/2 mb-8"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="h-96 bg-card/60 rounded-xl"></div>
            <div className="space-y-4">
              <div className="h-6 bg-card/60 rounded w-1/3"></div>
              <div className="h-4 bg-card/60 rounded w-full"></div>
              <div className="h-4 bg-card/60 rounded w-full"></div>
              <div className="h-4 bg-card/60 rounded w-3/4"></div>
              <div className="h-6 bg-card/60 rounded w-1/4 mt-6"></div>
              <div className="h-4 bg-card/60 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex items-center mb-4 text-sm font-medium text-muted-foreground">
            <Link href="/layanan" className="hover:text-primary transition-colors">
              Layanan
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{service.title}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              className="relative rounded-xl overflow-hidden h-80 md:h-96"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={service.image_url} 
                alt={service.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <div className="bg-primary/90 text-primary-foreground h-14 w-14 flex items-center justify-center rounded-full mb-4 shadow-xl">
                  <i className={`${service.icon} text-2xl`}></i>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                  {service.title}
                </h1>
              </div>
            </motion.div>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold mb-4">Deskripsi Layanan</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                
                {service.slug === "desain-interior-eksterior" && (
                  <>
                    <h3 className="text-lg font-medium mt-6 mb-2">Layanan Desain Interior & Eksterior Kami Meliputi:</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-primary mt-1"></i>
                        <span>Konsultasi desain komprehensif untuk kebutuhan ruang Anda</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-primary mt-1"></i>
                        <span>Perencanaan tata ruang dan sirkulasi yang optimal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-primary mt-1"></i>
                        <span>Desain fasad dan lanskap eksterior yang estetik</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-primary mt-1"></i>
                        <span>Pemilihan material, furnitur, dan aksesori yang sesuai gaya</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-primary mt-1"></i>
                        <span>Visualisasi 3D untuk melihat hasil akhir sebelum implementasi</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-primary mt-1"></i>
                        <span>Pengawasan pelaksanaan desain hingga hasil sesuai harapan</span>
                      </li>
                    </ul>
                    
                    <div className="bg-card/50 rounded-lg p-4 border border-border/50 mt-6">
                      <h4 className="font-medium mb-2 flex items-center">
                        <i className="fas fa-lightbulb text-primary mr-2"></i>
                        Mengapa Memilih Layanan Desain Interior & Eksterior Kami?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Tim desainer kami memiliki pengalaman lebih dari 15 tahun dengan ratusan proyek sukses. Kami memadukan estetika, fungsionalitas, dan kebutuhan spesifik Anda untuk menciptakan ruang yang tidak hanya indah dipandang tetapi juga nyaman ditinggali.
                      </p>
                    </div>
                  </>
                )}
                
                {service.slug === "konstruksi" && (
                  <>
                    <h3 className="text-lg font-medium mt-6 mb-2">Layanan Konstruksi Kami Mencakup:</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-primary mt-1"></i>
                        <span>Pembangunan rumah dan bangunan komersial dari awal hingga selesai</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-primary mt-1"></i>
                        <span>Renovasi dan perbaikan struktur yang sudah ada</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-primary mt-1"></i>
                        <span>Manajemen proyek konstruksi yang efisien dan tepat waktu</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-primary mt-1"></i>
                        <span>Penggunaan material berkualitas dengan garansi kualitas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-primary mt-1"></i>
                        <span>Pengawasan ketat oleh tim berpengalaman di setiap tahap</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-primary mt-1"></i>
                        <span>Konsultasi teknis dan solusi konstruksi yang inovatif</span>
                      </li>
                    </ul>
                    
                    <div className="bg-card/50 rounded-lg p-4 border border-border/50 mt-6">
                      <h4 className="font-medium mb-2 flex items-center">
                        <i className="fas fa-tools text-primary mr-2"></i>
                        Keunggulan Layanan Konstruksi DIEGMA
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Dengan tim insinyur berpengalaman dan pekerja terampil, kami berkomitmen menyelesaikan proyek tepat waktu dan sesuai anggaran. Kami menggunakan teknologi konstruksi modern untuk efisiensi dan ketahanan maksimal, serta menawarkan pemantauan transparansi kemajuan proyek secara berkala.
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
              
              <Separator />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-secondary/30 border border-border/40 rounded-xl p-6"
              >
                {service.slug === "desain-interior-eksterior" ? (
                  <>
                    <h3 className="font-semibold mb-2">Wujudkan Ruang Impian Anda Bersama Kami!</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Jadwalkan konsultasi desain gratis dengan tim profesional kami dan dapatkan penawaran khusus untuk proyek Anda
                    </p>
                  </>
                ) : service.slug === "konstruksi" ? (
                  <>
                    <h3 className="font-semibold mb-2">Bangun Dengan Percaya Diri Bersama DIEGMA</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Dapatkan estimasi biaya dan jadwal proyek secara GRATIS untuk kebutuhan konstruksi Anda
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold mb-3">Tertarik dengan layanan ini?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Konsultasikan kebutuhan Anda dengan tim profesional kami
                    </p>
                  </>
                )}
                {service.slug === "desain-interior-eksterior" ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link 
                      href="/kontak" 
                      className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 px-5 rounded-full transition-colors"
                    >
                      <i className="fas fa-calendar-check mr-1"></i>
                      <span>Jadwalkan Konsultasi Gratis</span>
                    </Link>
                    <Link 
                      href="/proyek" 
                      className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium py-2.5 px-5 rounded-full transition-colors border border-border/50"
                    >
                      <span>Lihat Portfolio Kami</span>
                      <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                ) : service.slug === "konstruksi" ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link 
                      href="/kontak" 
                      className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 px-5 rounded-full transition-colors"
                    >
                      <i className="fas fa-calculator mr-1"></i>
                      <span>Dapatkan Estimasi Gratis</span>
                    </Link>
                    <a 
                      href="tel:+6281234567890" 
                      className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium py-2.5 px-5 rounded-full transition-colors border border-border/50"
                    >
                      <i className="fas fa-phone-alt mr-1"></i>
                      <span>Konsultasi Langsung</span>
                    </a>
                  </div>
                ) : (
                  <Link 
                    href="/kontak" 
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 px-5 rounded-full transition-colors"
                  >
                    <span>Hubungi Kami</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Testimonial Section */}
        {(service.slug === "desain-interior-eksterior" || service.slug === "konstruksi") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 bg-card/50 rounded-xl border border-border/50 p-8 shadow-sm"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">Apa Kata Klien Kami</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.slug === "desain-interior-eksterior" ? (
                <>
                  <motion.div 
                    className="bg-card p-6 rounded-lg shadow-md border border-border/40"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i key={star} className="fas fa-star text-yellow-400 mr-1"></i>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "Saya sangat puas dengan layanan desain dari DIEGMA. Mereka berhasil mengubah rumah saya menjadi lebih nyaman dan estetik sesuai keinginan kami. Tim desain sangat responsif dan profesional."
                    </p>
                    <div className="flex items-center mt-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <i className="fas fa-user text-primary"></i>
                      </div>
                      <div>
                        <p className="font-medium">Budi Santoso</p>
                        <p className="text-xs text-muted-foreground">Klien Rumah Privat</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-card p-6 rounded-lg shadow-md border border-border/40"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i key={star} className="fas fa-star text-yellow-400 mr-1"></i>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "Desain yang dihasilkan DIEGMA untuk kafe kami benar-benar memukau. Pengalaman bekerja dengan mereka sangat menyenangkan dari awal konsultasi hingga implementasi. Hasilnya melebihi ekspektasi!"
                    </p>
                    <div className="flex items-center mt-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <i className="fas fa-user text-primary"></i>
                      </div>
                      <div>
                        <p className="font-medium">Anita Wijaya</p>
                        <p className="text-xs text-muted-foreground">Pemilik Kafe Kekinian</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-card p-6 rounded-lg shadow-md border border-border/40"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i key={star} className={`fas fa-star ${star <= 4 ? "text-yellow-400" : "text-muted-foreground"} mr-1`}></i>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "Tim DIEGMA sangat kreatif dalam menggabungkan keinginan saya dengan tren desain terkini. Mereka selalu mengutamakan kepuasan klien dan memberikan saran yang bermanfaat untuk optimalisasi ruang."
                    </p>
                    <div className="flex items-center mt-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <i className="fas fa-user text-primary"></i>
                      </div>
                      <div>
                        <p className="font-medium">Rini Pratiwi</p>
                        <p className="text-xs text-muted-foreground">Pemilik Butik Fashion</p>
                      </div>
                    </div>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div 
                    className="bg-card p-6 rounded-lg shadow-md border border-border/40"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i key={star} className="fas fa-star text-yellow-400 mr-1"></i>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "Proyek konstruksi rumah saya selesai tepat waktu dan dengan hasil yang sangat memuaskan. Tim DIEGMA sangat teliti dan selalu menjaga standar kualitas dari awal hingga akhir proses."
                    </p>
                    <div className="flex items-center mt-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <i className="fas fa-user text-primary"></i>
                      </div>
                      <div>
                        <p className="font-medium">Hendra Wijaya</p>
                        <p className="text-xs text-muted-foreground">Klien Perumahan Elite</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-card p-6 rounded-lg shadow-md border border-border/40"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i key={star} className="fas fa-star text-yellow-400 mr-1"></i>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "Renovasi kantor kami berjalan sangat lancar berkat DIEGMA. Mereka sangat profesional dalam mengelola proyek, transparan dengan biaya, dan selalu mengkomunikasikan setiap perkembangan."
                    </p>
                    <div className="flex items-center mt-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <i className="fas fa-user text-primary"></i>
                      </div>
                      <div>
                        <p className="font-medium">Diana Putri</p>
                        <p className="text-xs text-muted-foreground">Manajer Operasional PT Maju Jaya</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-card p-6 rounded-lg shadow-md border border-border/40"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i key={star} className={`fas fa-star ${star <= 4 ? "text-yellow-400" : "text-muted-foreground"} mr-1`}></i>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "Saya mengapresiasi pendekatan DIEGMA dalam menggunakan material berkualitas dan memperhatikan detail konstruksi. Pembangunan ruko saya selesai dengan hasil yang kokoh dan sesuai spesifikasi."
                    </p>
                    <div className="flex items-center mt-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <i className="fas fa-user text-primary"></i>
                      </div>
                      <div>
                        <p className="font-medium">Eko Prabowo</p>
                        <p className="text-xs text-muted-foreground">Pengusaha Properti</p>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Furniture Products Section */}
        {isFurnitureService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-semibold mb-8">Produk Furniture Kami</h2>
            
            {/* Filter Categories */}
            <div className="mb-10 relative">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-border/60"></div>
              
              <div className="flex justify-center overflow-x-auto pb-2 no-scrollbar">
                <div className="flex space-x-1 bg-card/80 backdrop-blur-sm p-1.5 rounded-full shadow-lg border border-border/30 relative z-10">
                  <motion.button 
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeFilter === "Semua" 
                        ? "bg-primary text-primary-foreground shadow-md" 
                        : "bg-background hover:bg-secondary/70 text-foreground"
                    }`}
                    onClick={() => setActiveFilter("Semua")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Semua
                  </motion.button>
                  
                  {Array.from(new Set(furnitureProducts.map(p => p.category))).map((category) => (
                    <motion.button 
                      key={category}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                        activeFilter === category 
                          ? "bg-primary text-primary-foreground shadow-md" 
                          : "bg-background hover:bg-secondary/70 text-foreground"
                      }`}
                      onClick={() => setActiveFilter(category)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-card rounded-xl overflow-hidden border border-border/50 shadow-md group"
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div 
                    className="h-64 overflow-hidden relative cursor-pointer"
                    onClick={() => handleLightboxToggle(product)}
                  >
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-background/80 backdrop-blur-sm text-foreground p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 3h6v6"></path>
                          <path d="M10 14 21 3"></path>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {product.price}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-5 line-clamp-2">{product.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => handleWhatsAppContact(product)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full text-sm font-medium transition-colors"
                      >
                        <i className="fab fa-whatsapp text-lg"></i>
                        <span>Tanya Produk</span>
                      </button>
                      
                      <button
                        onClick={() => handleLightboxToggle(product)} 
                        className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"></path>
                          <path d="M3 16.2V21m0-4.8H7.8"></path>
                          <path d="M3 7.8V3m0 4.8H7.8"></path>
                          <path d="M16.2 3H21m-4.8 0V7.8"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Product Lightbox */}
      <AnimatePresence>
        {lightboxOpen && selectedProduct && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => handleLightboxToggle()}
          >
            <button 
              className="absolute top-6 right-6 text-white bg-black/20 p-2 rounded-full"
              onClick={() => handleLightboxToggle()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
            
            <div className="bg-card rounded-xl overflow-hidden max-w-4xl w-full p-4 sm:p-6 flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="md:w-1/2">
                <motion.img 
                  src={selectedProduct.imageUrl} 
                  alt={selectedProduct.name} 
                  className="w-full h-60 sm:h-80 object-cover rounded-lg"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80";
                  }}
                />
              </div>
              
              <div className="md:w-1/2 flex flex-col">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                <div className="mb-2 text-lg sm:text-xl font-semibold text-primary">{selectedProduct.price}</div>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">{selectedProduct.description}</p>
                
                <div className="mt-auto">
                  <button 
                    onClick={() => handleWhatsAppContact(selectedProduct)}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    <i className="fab fa-whatsapp text-lg"></i>
                    <span>Hubungi via WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceDetail;