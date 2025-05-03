import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Menciptakan desain,<br />
              yang mencerminkan<br />
              Anda<br />
              <span className="text-gray-500 font-medium">dan untuk Anda</span>
            </h1>
          </div>
          <div>
            <p className="text-gray-500 text-lg mb-6">
              Kami menjamin bahwa dengan bekerja bersama kami, Anda akan mendapatkan desain interior yang unik dan fungsional yang akan sesuai dengan kebutuhan Anda. Hubungi kami sekarang untuk memulai proyek desain interior baru Anda.
            </p>
            <Link href="/kontak" className="inline-block bg-primary text-white font-medium py-3 px-6 rounded-md hover:bg-opacity-90 transition-all flex items-center">
              Pesan Proyek
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="container mx-auto mt-12">
        <div className="rounded-lg overflow-hidden h-[400px] md:h-[500px] relative">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80" 
            alt="Modern architecture"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
